import { CreateRfqInput } from '@/types/rfq';

export interface RfqEmailPayload {
  rfqId: number;
  rfqData: CreateRfqInput;
}

export function buildRfqNotificationEmail(payload: RfqEmailPayload): { subject: string; html: string; text: string } {
  const { rfqId, rfqData } = payload;
  const subject = `[NEW RFQ #${rfqId}] Enterprise Quote Request from ${rfqData.company_name}`;

  const itemsHtml = rfqData.items
    .map(
      (item, idx) => `
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #334155; color: #d4e4fa;">#${idx + 1} (ID: ${item.product_id})</td>
        <td style="padding: 10px; border-bottom: 1px solid #334155; color: #ffb693; font-weight: bold;">${item.quantity} Units</td>
        <td style="padding: 10px; border-bottom: 1px solid #334155; color: #d4e4fa;">${item.size_range || 'Assorted'}</td>
      </tr>
    `
    )
    .join('');

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8"/>
        <style>
          body { font-family: 'Inter', Arial, sans-serif; background-color: #051424; color: #d4e4fa; margin: 0; padding: 20px; }
          .container { max-width: 600px; margin: 0 auto; background-color: #122131; border: 1px solid #334155; padding: 24px; border-radius: 4px; }
          .header { border-b: 2px solid #ff6b00; padding-bottom: 12px; margin-bottom: 20px; }
          .title { color: #ffb693; font-size: 20px; margin: 0; font-weight: bold; }
          .info-row { margin-bottom: 10px; font-size: 14px; }
          .label { color: #a98a7d; font-weight: bold; }
          .value { color: #d4e4fa; }
          table { width: 100%; border-collapse: collapse; margin-top: 16px; }
          th { background-color: #273647; color: #ffb693; padding: 10px; text-align: left; }
          .footer { margin-top: 24px; font-size: 12px; color: #a98a7d; border-t: 1px solid #334155; padding-top: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2 class="title">Ghulam Safety Hub — New Enterprise RFQ Notification</h2>
          </div>
          <div class="info-row"><span class="label">RFQ Reference ID:</span> <span class="value">#${rfqId}</span></div>
          <div class="info-row"><span class="label">Company Name:</span> <span class="value">${rfqData.company_name}</span></div>
          <div class="info-row"><span class="label">Business Email:</span> <span class="value">${rfqData.business_email}</span></div>
          <div class="info-row"><span class="label">Industry Segment:</span> <span class="value">${rfqData.industry_segment}</span></div>
          <div class="info-row"><span class="label">Monthly Volume:</span> <span class="value">${rfqData.monthly_volume}</span></div>
          <div class="info-row"><span class="label">Requirements:</span> <p class="value">${rfqData.detailed_requirements}</p></div>

          <h3>Requested Products:</h3>
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Size Range</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
            </tbody>
          </table>

          <div class="footer">
            Automated notification dispatch from Ghulam Safety Hub RFQ System.
          </div>
        </div>
      </body>
    </html>
  `;

  const text = `
    NEW RFQ #${rfqId} Notification
    Company: ${rfqData.company_name}
    Email: ${rfqData.business_email}
    Industry: ${rfqData.industry_segment}
    Monthly Volume: ${rfqData.monthly_volume}
    Requirements: ${rfqData.detailed_requirements}
  `;

  return { subject, html, text };
}
