export const config = {
  matcher: ['/', '/index.html'],
};

export default async function middleware(request: Request) {
  const userAgent = request.headers.get('user-agent') || '';
  const isBot = /LinkedInBot|facebookexternalhit|Twitterbot|WhatsApp|TelegramBot|Slackbot|SkypeUriPreview|discordbot|bingbot|googlebot/i.test(userAgent);

  if (!isBot) {
    return; // Pass through to standard Vercel SPA static serving for normal humans
  }

  const DEFAULT_IMAGE = "https://www.ghulamsafetyhub.com/og-image.jpg";
  const DEFAULT_TITLE = "Ghulam Safety Hub | Industrial PPE & Safety Equipment Wholesale";
  const DEFAULT_DESC = "Tier-1 industrial protective equipment, safety gloves, workwear, and global safety logistics. ISO 9001:2015 and CE certified safety solutions.";

  let image = DEFAULT_IMAGE;
  let title = DEFAULT_TITLE;
  let description = DEFAULT_DESC;

  try {
    const apiRes = await fetch("https://industrial-safety-b2b-webapp.onrender.com/api/v1/products?limit=50", {
      headers: { "Accept": "application/json" }
    });

    if (apiRes.ok) {
      const json = await apiRes.json();
      if (json.success && Array.isArray(json.data) && json.data.length > 0) {
        const featured = json.data.find((p: any) => p.isFeatured || p.is_featured === 1 || p.is_featured === true);
        const target = featured || json.data[0];

        if (target) {
          if (target.primaryImage || target.image_url) {
            let imgUrl = target.primaryImage || target.image_url;
            if (!imgUrl.startsWith("http")) {
              imgUrl = `https://industrial-safety-b2b-webapp.onrender.com${imgUrl.startsWith("/") ? "" : "/"}${imgUrl}`;
            }
            if (imgUrl.includes("cloudinary.com") && !imgUrl.includes("c_fill")) {
              imgUrl = imgUrl.replace("/upload/", "/upload/c_fill,w_1200,h_627,f_jpg,q_auto/");
            }
            image = imgUrl;
          }
          if (target.title) {
            title = `${target.title} | Ghulam Safety Hub`;
          }
          if (target.description) {
            description = target.description.replace(/<[^>]*>?/gm, '').slice(0, 160);
          }
        }
      }
    }
  } catch (err) {
    console.error("[Vercel Edge Middleware OG Error]:", err);
  }

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
  <meta name="title" content="${title}" />
  <meta name="description" content="${description}" />
  <meta name="image" content="${image}" />

  <!-- Open Graph / LinkedIn / Facebook -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://www.ghulamsafetyhub.com/" />
  <meta property="og:title" content="${title}" />
  <meta property="og:description" content="${description}" />
  <meta property="og:image" content="${image}" />
  <meta property="og:image:secure_url" content="${image}" />
  <meta property="og:image:type" content="image/jpeg" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="627" />
  <meta property="og:site_name" content="Ghulam Safety Hub" />

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:url" content="https://www.ghulamsafetyhub.com/" />
  <meta name="twitter:title" content="${title}" />
  <meta name="twitter:description" content="${description}" />
  <meta name="twitter:image" content="${image}" />
</head>
<body>
  <h1>${title}</h1>
  <p>${description}</p>
  <img src="${image}" alt="${title}" />
</body>
</html>`;

  return new Response(html, {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "s-maxage=60, stale-while-revalidate=120",
    },
  });
}
