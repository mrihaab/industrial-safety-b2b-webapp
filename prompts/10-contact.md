# 10 — Contact Us & Logistics RFQ Page Implementation Prompt

## Objective
Build the Contact Us (`/contact`) and Global Logistics RFQ Page (`/rfq`) matching the `LogisticsRFQ.tsx` mockup reference.

## Instructions for AI Agent
1. Hero & Metrics: Implement hero section with subtitle (`INTERNATIONAL LOGISTICS`), headline ("Global Procurement, Precision Engineered."), summary, metric counters (`24h`, `140+`), and dark warehouse photo.
2. `BentoBenefits.tsx`: Implement 4-card asymmetric benefits grid (Eliminate Middlemen 2-col 2-row card, ISO 9001:2015 2-col card, Rapid Transit 1-col card, Reserve Stock 1-col card).
3. `RFQForm.tsx`: Build 2-column enterprise inquiry form (`Company Name`, `Business Email`, `Industry Segment` select, `Estimated Monthly Volume` select, `Detailed Requirements` textarea). Bind to `POST /api/v1/rfq`. Trigger email dispatch & return WhatsApp link on submit.
4. `HubMap.tsx`: Implement distribution hubs live status card featuring global map graphic and status list for Dubai Logistics City HQ (`Status: Operational`) and Singapore Maritime Hub (`Status: High Volume`).
5. `DirectSupportCard.tsx`: Render sales hotline (`+971 4 555 0192`) and enterprise email desk (`bulk@ghulamsafety.com`).
6. Contact Page Embed: Render office address, phone, email, and embedded interactive Google Maps iframe.
