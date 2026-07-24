import { RfqService } from '@/services/rfqService';
import { RfqModel } from '@/models/rfqModel';
import { dbPool } from './db';

export async function testRfqApi() {
  console.log('[RFQ API Test]: Testing RFQ Module Service & Model Logic...');

  const testPayload = {
    company_name: 'Apex Industrial Ltd',
    business_email: 'procurement@apexindustrial.com',
    industry_segment: 'Oil & Gas',
    monthly_volume: '$10k - $50k',
    detailed_requirements: 'Requires 500 pairs of Level 5 Cut Resistant Gloves for offshore drilling rigs.',
    items: [
      {
        product_id: 1,
        quantity: 500,
        size_range: 'Assorted S/M/L/XL',
      },
    ],
  };

  const response = await RfqService.createRfq(testPayload);
  console.log('[RFQ API Test]: Submission Response:', response);

  if (!response.rfq_id) {
    throw new Error('RFQ submission failed to return a valid rfq_id');
  }

  // Verify database insertion in rfq_inquiries
  const inquiryRow = await RfqModel.findRfqById(response.rfq_id);
  if (!inquiryRow) {
    throw new Error(`RFQ inquiry row with ID ${response.rfq_id} not found in database`);
  }
  console.log('[RFQ API Test]: Verified Inquiry DB Row:', inquiryRow.company_name, inquiryRow.status);

  // Verify database insertion in rfq_items
  const items = await RfqModel.findRfqItems(response.rfq_id);
  if (items.length === 0) {
    throw new Error(`RFQ item rows for RFQ ID ${response.rfq_id} not found in database`);
  }
  console.log('[RFQ API Test]: Verified Items DB Rows count:', items.length, 'Quantity:', items[0].quantity, 'Size Range:', items[0].size_range);

  console.log('[RFQ API Test]: ALL RFQ MODULE CHECKS PASSED SUCCESSFULLY.');
}

if (require.main === module) {
  testRfqApi()
    .then(async () => {
      await dbPool.end();
      process.exit(0);
    })
    .catch(async err => {
      console.error('[RFQ API Test Error]:', err);
      await dbPool.end();
      process.exit(1);
    });
}
