import { smtpTransporter } from '@/config/smtp';
import { buildRfqNotificationEmail, RfqEmailPayload } from '@/utils/emailTemplates';

export class MailService {
  /**
   * Send notification email to sales desk on RFQ submission
   */
  static async sendRfqNotification(payload: RfqEmailPayload): Promise<boolean> {
    const targetRecipient = process.env.SMTP_USER || 'ghulamsafehub@gmail.com';
    const { subject, html, text } = buildRfqNotificationEmail(payload);

    try {
      // If placeholder SMTP password or test environment, log simulated email dispatch
      const smtpPass = process.env.SMTP_PASS || '';
      if (!smtpPass || smtpPass.includes('password_here') || process.env.NODE_ENV === 'test') {
        console.log(`[Mail Service]: Simulated RFQ notification email dispatched to ${targetRecipient} for RFQ #${payload.rfqId}`);
        return true;
      }

      const info = await smtpTransporter.sendMail({
        from: `"Ghulam Safety Hub System" <${targetRecipient}>`,
        to: targetRecipient,
        subject,
        text,
        html,
      });

      console.log(`[Mail Service]: RFQ notification email dispatched to ${targetRecipient}. MessageId: ${info.messageId}`);
      return true;
    } catch (error: any) {
      console.error('[Mail Service Warning]: SMTP transport error (falling back to log dispatch):', error.message || error);
      console.log(`[Mail Service Fallback]: RFQ #${payload.rfqId} notification logged for ${targetRecipient}.`);
      return true;
    }
  }
}
