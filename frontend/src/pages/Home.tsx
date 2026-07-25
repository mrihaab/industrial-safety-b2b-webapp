import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const HERO_IMG = "https://lh3.googleusercontent.com/aida-public/AB6AXuD8GK08yQJcOjxafEsZTZrH9RUknWBXayS4Hb4lJv06QTs5HAR_BfsWNs1pxSmUyUXouN3hv3UXoyTcSJ1FCfaKqr6YOgLa9iaEWeiP8m77pQ_ea3-QFAQ6z66GnhmViZVE6K7Wfk8yFOGBqj5YSh7yRRB1Wgyj1dQbcDllZi2PMeLJ4tHSiXl7YXabCKwvsU8qN2WXFXYUGqc6QgvBkPyTnooiOCCEryPxJ9yd3Nw1D6zy9apNtAf9XMrWolUS0IzwaGaSkK-cRD4";
const TITAN_X_IMG = "https://lh3.googleusercontent.com/aida-public/AB6AXuCGKdrJ_ZE3KYkKmWECvfIkfSOiSPR4_H6Lqxq6dSyfy2YmYY7dZBgxZ4lYDcxh8UzAlRBQ9HSxBQsVGpzt-x4Z4E24tYQD7tiQGjxEpyP-CFj2bH2iOj1Cl4J_0VGdZdcPDw3sN0_uX0Lwzdc3ms6cH7dGHtd9XtqeG9-_LW-v5ndOwte6VLmwyoUpjYqZKuu1OyUHlSR7OaQWDgiq1vwAkY0srLg13XV1i41Wk_yhxhRJbGMf-YMzgIDBmX7duLbCy6mOxJSlCvc";
const PRO_VIS_IMG = "https://lh3.googleusercontent.com/aida-public/AB6AXuC4e9kR8UrCA1IjdY4-JhwJNKNnI2Wws-m3DLuMZDKyJRF87rg_E_OO06wMivwKr7bo4ewIU0WtJUKD1cus-zHE5kfgyLb2di1lBo3MDmkjknC5Kj8uQzVjLNoGEkmKx3B4ct4nlZ0M_TO_hTOhM2pAZxVTulMtq0brRVrIi6HkuX4H30HIEqmYDfbOos7RsNjMTHydXHsvq7DF_2N49eh0SOU3X8dhHUn2LnT-qG2ly_yp9b8QNY7xompaeRUjWvfaDvtjawH2-VU";
const BOOTS_IMG = "https://lh3.googleusercontent.com/aida-public/AB6AXuCvEuPdv-53b90VVbhBehdhqMSIu3fxFfLwKUA6olsk7Cd4Foa6-iW9qxg3SNQbkXf2s8eZdOVaP_UXygXwsqF7IYNSop7sfRN7_VWkzm4WjVo_yCECaXpuHs3ZCqCh53JoLJ6uCOwJtJVzFgsttlxQFVx3ETUVNiOtBVlBjC_pghP3rZ0l9oGDNo9iihw86z3bCu4gJgQcziPiIadhVJ1S83hytNl-a--h-LhO3oIqRXWCT_FnH77sLPmSgRGjUxEPiliRgLd6SR4";
const MAP_IMG = "https://lh3.googleusercontent.com/aida-public/AB6AXuChT9-yQ6kh7fkUmoeib05VnFZmKupzkbl-uHGuV2H0ab2D0AZwZYvt4XXgzT6Bt2aS0K0NYYnTVmgD5NSKVB66EBtYZJGQD1TQFl8cNf5DXyw3Yq-MoGL_AoIFA-wFPTU1TwNQvdeC5TcS_tDuYjNPYSFCcPqdFgR69zj0-4h05poO1zqce-hyGR0clWoxsmYTFOKlW5_1ycmfzVuiXeqJwJBJdOykEEs07bWgZgdqsE-nPbS4_49hJ_tFqooM0z8lHL19jZKhYF4";

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const [emailInput, setEmailInput] = useState('');

  const handleContactSales = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/rfq');
  };

  return (
    <div className="w-full space-y-0">
      {/* 1. Hero Section matching HTML Mockup */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden industrial-grid border-b border-outline-variant -mt-stack-lg -mx-gutter px-gutter">
        <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/80 to-transparent z-10" />
        <img
          src={HERO_IMG}
          alt="A high-contrast cinematic photograph of professional heavy-duty safety gloves resting on a brushed steel industrial workbench."
          className="absolute right-0 top-0 h-full w-full lg:w-2/3 object-cover object-center grayscale hover:grayscale-0 transition-all duration-700 opacity-60 lg:opacity-100"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1920&q=80';
          }}
        />

        <div className="relative z-20 max-w-container-max mx-auto w-full py-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-surface-container-high border border-outline-variant px-3 py-1 mb-6">
              <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse" />
              <span className="font-label-caps text-primary tracking-widest uppercase">
                GLOBAL COMPLIANCE ACTIVE
              </span>
            </div>

            <h1 className="font-display-lg text-display-lg text-on-surface mb-6 leading-tight">
              Industrial Safety, <br />
              <span className="text-primary-container">Engineered</span> for the <br />
              Global Standard.
            </h1>

            <p className="font-body-lg text-body-lg text-on-surface-variant mb-10 max-w-lg">
              Providing Tier-1 protective equipment and safety logistics for manufacturing giants across six continents. ISO-certified reliability in every fiber.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/products"
                className="bg-primary-container text-on-primary-container px-8 py-4 font-title-md rounded-sm orange-glow-hover flex items-center gap-2 font-bold transition-all"
              >
                Explore Catalog
                <span className="material-symbols-outlined">arrow_forward</span>
              </Link>

              <Link
                to="/about"
                className="border border-outline px-8 py-4 font-title-md text-on-surface hover:bg-surface-variant transition-colors font-bold"
              >
                View Certifications
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Stats / Export Expertise Bar matching HTML Mockup */}
      <section className="py-20 bg-surface-container-low border-b border-outline-variant -mx-gutter px-gutter">
        <div className="max-w-container-max mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">
            <div className="border-l-2 border-primary-container pl-6">
              <div className="font-display-lg text-[40px] text-on-surface font-bold mb-1">45+</div>
              <div className="font-label-caps text-on-surface-variant uppercase tracking-tighter">
                Countries Reached
              </div>
            </div>

            <div className="border-l-2 border-primary-container pl-6">
              <div className="font-display-lg text-[40px] text-on-surface font-bold mb-1">12M</div>
              <div className="font-label-caps text-on-surface-variant uppercase tracking-tighter">
                Units Shipped
              </div>
            </div>

            <div className="border-l-2 border-primary-container pl-6">
              <div className="font-display-lg text-[40px] text-on-surface font-bold mb-1">100%</div>
              <div className="font-label-caps text-on-surface-variant uppercase tracking-tighter">
                CE Compliance
              </div>
            </div>

            <div className="border-l-2 border-primary-container pl-6">
              <div className="font-display-lg text-[40px] text-on-surface font-bold mb-1">24/7</div>
              <div className="font-label-caps text-on-surface-variant uppercase tracking-tighter">
                Safety Monitoring
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Featured PPE Gear (Bento Grid) matching HTML Mockup */}
      <section className="py-24 bg-surface">
        <div className="max-w-container-max mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <span className="font-label-caps text-primary mb-4 block">PREMIUM SELECTION</span>
              <h2 className="font-headline-lg text-headline-lg text-on-surface">Featured PPE Gear</h2>
            </div>
            <Link
              to="/products"
              className="text-on-surface-variant hover:text-primary-container flex items-center gap-2 transition-colors font-label-caps"
            >
              View Full Inventory <span className="material-symbols-outlined">north_east</span>
            </Link>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 md:grid-rows-2 gap-6 min-h-[700px]">
            {/* Main Feature (6-col hero card) */}
            <div className="md:col-span-6 md:row-span-2 group relative overflow-hidden bg-surface-container border border-outline-variant min-h-[400px]">
              <img
                src={TITAN_X_IMG}
                alt="A matte black industrial safety helmet with an integrated carbon-fiber visor."
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-surface-container-lowest/60 to-transparent" />
              <div className="absolute bottom-0 left-0 p-8">
                <div className="bg-primary-container text-on-primary-container inline-block px-3 py-1 font-label-caps mb-4 rounded-xs">
                  NEW RELEASE
                </div>
                <h3 className="font-headline-lg text-on-surface mb-2 font-bold">Titan-X Safety System</h3>
                <p className="text-on-surface-variant max-w-sm mb-6 font-body-sm">
                  Impact-resistant carbon composite shells for extreme environments.
                </p>
                <Link
                  to="/products/gsh-elite-industrial-gloves"
                  className="bg-white text-surface px-6 py-2 font-title-md inline-flex items-center gap-2 font-bold hover:bg-primary transition-colors rounded-xs"
                >
                  View Specs <span className="material-symbols-outlined">open_in_new</span>
                </Link>
              </div>
            </div>

            {/* Secondary Feature 1 (6-col card) */}
            <div className="md:col-span-6 md:row-span-1 group relative overflow-hidden bg-surface-container border border-outline-variant min-h-[240px]">
              <img
                src={PRO_VIS_IMG}
                alt="Detailed macro shot of high-visibility safety apparel showing the intricate weave of the neon fabric."
                className="absolute inset-0 w-full h-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=1200&q=80';
                }}
              />
              <div className="absolute inset-0 bg-surface/40 group-hover:bg-transparent transition-colors" />
              <div className="absolute top-8 left-8">
                <h3 className="font-title-md text-on-surface font-bold text-xl">Pro-Vis Series</h3>
                <p className="text-on-surface-variant font-body-sm">EN ISO 20471 Certified High-Vis</p>
              </div>
            </div>

            {/* Secondary Feature 2 (3-col card) */}
            <div className="md:col-span-3 md:row-span-1 group relative overflow-hidden bg-surface-container border border-outline-variant min-h-[220px]">
              <img
                src={BOOTS_IMG}
                alt="Industrial steel-toed boots in a premium dark leather finish."
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80';
                }}
              />
              <div className="absolute inset-x-0 bottom-0 p-6 bg-surface-container/90 backdrop-blur-sm transform translate-y-full group-hover:translate-y-0 transition-transform">
                <span className="font-label-caps text-primary text-xs uppercase block mb-1">FOOTWEAR</span>
                <div className="text-on-surface font-title-md font-bold">IronStride Boots</div>
              </div>
            </div>

            {/* Secondary Feature 3 (3-col custom fitting solution card) */}
            <div className="md:col-span-3 md:row-span-1 group relative overflow-hidden bg-surface-container-high border border-primary-container/30 flex flex-col justify-center items-center text-center p-8">
              <span className="material-symbols-outlined text-primary text-5xl mb-4">settings_input_component</span>
              <h3 className="font-title-md text-on-surface mb-2 font-bold">Custom Fitting</h3>
              <p className="font-body-sm text-on-surface-variant text-xs">
                Tailored safety solutions for your entire workforce.
              </p>
              <Link to="/rfq" className="mt-4 text-primary font-label-caps hover:underline text-xs">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Export Expertise Section matching HTML Mockup */}
      <section className="py-24 bg-surface-container-lowest overflow-hidden -mx-gutter px-gutter">
        <div className="max-w-container-max mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary-container/10 rounded-full blur-3xl" />
            <img
              src={MAP_IMG}
              alt="A stylized 3D digital map of the world rendered in a dark, tech-inspired aesthetic."
              className="relative z-10 w-full aspect-square object-cover border border-outline-variant rounded-sm shadow-2xl"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1000&q=80';
              }}
            />
          </div>
          <div>
            <span className="font-label-caps text-primary mb-4 block">GLOBAL LOGISTICS</span>
            <h2 className="font-headline-lg text-headline-lg text-on-surface mb-6 font-extrabold">
              Our Export Expertise
            </h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-8">
              Ghulam Safety Hub manages the end-to-end supply chain for high-consequence industries. From regional factory floors to international refineries, we ensure your safety gear arrives compliant, tested, and ready for action.
            </p>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <span className="material-symbols-outlined text-primary-container mt-1">verified</span>
                <div>
                  <span className="block font-title-md text-on-surface font-bold">Standardized Export Controls</span>
                  <p className="font-body-sm text-on-surface-variant text-xs">
                    Rigorous documentation and compliance checks for every jurisdiction.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="material-symbols-outlined text-primary-container mt-1">speed</span>
                <div>
                  <span className="block font-title-md text-on-surface font-bold">Rapid Transit Protocols</span>
                  <p className="font-body-sm text-on-surface-variant text-xs">
                    Strategic hub positioning reduces lead times by 35% globally.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="material-symbols-outlined text-primary-container mt-1">support_agent</span>
                <div>
                  <span className="block font-title-md text-on-surface font-bold">Regional Compliance Advisors</span>
                  <p className="font-body-sm text-on-surface-variant text-xs">
                    Dedicated experts for ANSI, CE, and OSHA standards in your region.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 5. Global Compliance Section matching HTML Mockup */}
      <section className="py-24 border-t border-outline-variant">
        <div className="max-w-container-max mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-headline-lg text-headline-lg text-on-surface mb-4 font-bold">
              Certified for Excellence
            </h2>
            <p className="text-on-surface-variant max-w-2xl mx-auto font-body-sm">
              We don't just meet standards; we define them. Our products undergo rigorous testing in independent laboratories to ensure maximum human protection.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 opacity-70">
            <div className="flex flex-col items-center gap-4 grayscale hover:grayscale-0 transition-all cursor-default">
              <span className="material-symbols-outlined text-5xl text-primary">award_star</span>
              <span className="font-label-caps text-xs">ISO 9001</span>
            </div>
            <div className="flex flex-col items-center gap-4 grayscale hover:grayscale-0 transition-all cursor-default">
              <span className="material-symbols-outlined text-5xl text-primary">shield_with_heart</span>
              <span className="font-label-caps text-xs">CE MARKED</span>
            </div>
            <div className="flex flex-col items-center gap-4 grayscale hover:grayscale-0 transition-all cursor-default">
              <span className="material-symbols-outlined text-5xl text-primary">security</span>
              <span className="font-label-caps text-xs">ANSI / ISEA</span>
            </div>
            <div className="flex flex-col items-center gap-4 grayscale hover:grayscale-0 transition-all cursor-default">
              <span className="material-symbols-outlined text-5xl text-primary">factory</span>
              <span className="font-label-caps text-xs">OSHA READY</span>
            </div>
            <div className="flex flex-col items-center gap-4 grayscale hover:grayscale-0 transition-all cursor-default">
              <span className="material-symbols-outlined text-5xl text-primary">eco</span>
              <span className="font-label-caps text-xs">REACH COMPLIANT</span>
            </div>
            <div className="flex flex-col items-center gap-4 grayscale hover:grayscale-0 transition-all cursor-default">
              <span className="material-symbols-outlined text-5xl text-primary">workspace_premium</span>
              <span className="font-label-caps text-xs">UKCA</span>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Newsletter / Contact Sales CTA matching HTML Mockup */}
      <section className="py-20 bg-primary-container -mx-gutter px-gutter rounded-sm shadow-2xl">
        <div className="max-w-container-max mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="text-on-primary-container text-center lg:text-left">
            <h2 className="font-headline-lg text-headline-lg font-extrabold mb-2">
              Ready to Secure Your Workforce?
            </h2>
            <p className="font-body-lg text-on-primary-container/90">
              Get a custom quote for industrial-scale safety equipment.
            </p>
          </div>
          <form onSubmit={handleContactSales} className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            <input
              type="email"
              value={emailInput}
              onChange={e => setEmailInput(e.target.value)}
              className="bg-surface/10 border border-on-primary-container/30 text-on-primary-container placeholder:text-on-primary-container/60 px-6 py-4 rounded-sm w-full lg:w-80 focus:ring-on-primary-container focus:border-on-primary-container font-mono text-sm"
              placeholder="Corporate Email Address"
            />
            <button
              type="submit"
              className="bg-on-primary-container text-primary-container px-8 py-4 font-bold rounded-sm uppercase tracking-wider hover:bg-on-primary transition-colors whitespace-nowrap font-mono text-xs cursor-pointer"
            >
              Contact Sales
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home;
