import { RfqModel } from '@/models/rfqModel';
import { CreateRfqInput, RfqResponseDto } from '@/types/rfq';
import { MailService } from '@/services/mailService';

export class RfqService {
  /**
   * Process and create a B2B quotation request
   */
  static async createRfq(input: CreateRfqInput): Promise<RfqResponseDto> {
    // Enforce MOQ validation (Rule BR-2.1: minimum 50 units per item)
    const processedItems = input.items.map(item => {
      const minMoq = 50;
      const validQuantity = Math.max(item.quantity, minMoq);
      return {
        product_id: item.product_id,
        quantity: validQuantity,
        size_range: item.size_range || 'Assorted S/M/L/XL',
      };
    });

    const processedInput: CreateRfqInput = {
      ...input,
      items: processedItems,
    };

    // 1. Store in Database
    const result = await RfqModel.createRfq(processedInput);

    // 2. Dispatch Non-blocking Email Notification (Module B.4 Integration)
    MailService.sendRfqNotification({
      rfqId: result.rfq_id,
      rfqData: processedInput,
    }).catch(err => {
      console.error('[RFQ Service Mail Dispatch Warning]:', err);
    });

    return {
      rfq_id: result.rfq_id,
      status: result.status,
    };
  }
}
