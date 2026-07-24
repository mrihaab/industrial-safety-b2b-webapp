import { MailService } from '@/services/mailService';

export async function testMailService() {
  console.log('[Mail Service Test]: Testing Nodemailer Email Notification Service...');

  const samplePayload = {
    rfqId: 999,
    rfqData: {
      company_name: 'Test Procurement Corp',
      business_email: 'test@procurementcorp.com',
      industry_segment: 'Manufacturing',
      monthly_volume: '$50k+',
      detailed_requirements: 'Automated test request for 1000 units of safety gear.',
      items: [
        { product_id: 1, quantity: 1000, size_range: 'Assorted S/M/L/XL' },
      ],
    },
  };

  const success = await MailService.sendRfqNotification(samplePayload);
  console.log('[Mail Service Test]: Mail Service Execution Result:', success);

  if (!success) {
    throw new Error('Mail Service failed to process email dispatch');
  }

  console.log('[Mail Service Test]: ALL MAIL SERVICE CHECKS PASSED SUCCESSFULLY.');
}

if (require.main === module) {
  testMailService()
    .then(() => process.exit(0))
    .catch(err => {
      console.error('[Mail Service Test Error]:', err);
      process.exit(1);
    });
}
