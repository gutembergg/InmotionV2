import { BillingValues, LineItemsDTO, ShippingValues } from "./OrderValidation";

export interface OrderDTO {
  payment_method: string;
  payment_method_title: string;
  set_paid: boolean;
  billing: BillingValues;
  shipping: ShippingValues;
  line_items: LineItemsDTO;
  shipping_lines: [
    {
      method_id: string;
      method_title: string;
      total: string;
    }
  ];
}
