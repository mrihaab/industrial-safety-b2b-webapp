export interface RfqInquiryRow {
  id: number;
  company_name: string;
  business_email: string;
  industry_segment: string;
  monthly_volume: string;
  detailed_requirements: string;
  status: string;
  created_at: Date;
}

export interface RfqItemRow {
  id: number;
  rfq_id: number;
  product_id: number;
  quantity: number;
  size_range: string;
}

export interface CreateRfqItemInput {
  product_id: number;
  quantity: number;
  size_range?: string;
}

export interface CreateRfqInput {
  company_name: string;
  business_email: string;
  industry_segment: string;
  monthly_volume: string;
  detailed_requirements: string;
  items: CreateRfqItemInput[];
}

export interface RfqResponseDto {
  rfq_id: number;
  status: string;
}
