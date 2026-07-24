import { RfqModel } from '@/models/rfqModel';
import { CreateRfqInput, RfqResponseDto } from '@/types/rfq';

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

    const result = await RfqModel.createRfq(processedInput);

    return {
      rfq_id: result.rfq_id,
      status: result.status,
    };
  }
}
