import { ICoupons } from "./ICoupons";
import { BillingValues, LineItemsDTO, ShippingValues } from "./OrderValidation";

export interface CouponLines {
  code: string;
  discount: string;
  discount_tax: string;
  id: number;
}

export interface Order {
  id: number;
  parent_id: number;
  number: number;
  order_key: string;
  created_via: string;
  version: string;
  status: string;
  currency: string;
  date_created: string;
  date_created_gmt: string;
  date_modified: string;
  date_modified_gmt: string;
  discount_total: string;
  discount_tax: string;
  shipping_total: string;
  shipping_tax: string;
  cart_tax: string;
  total: string;
  total_tax: string;
  prices_include_tax: boolean;
  customer_id: number;
  customer_ip_address: string;
  customer_user_agent: string;
  customer_note: string;
  coupon_lines: CouponLines[];
  billing: BillingValues;
  shipping: ShippingValues;
  payment_method: string;
  payment_method_title: string;
  line_items: LineItemsDTO[];
  tax_lines: TaxLine[];
  shipping_lines: [method_id: string, method_title: string, total: string];
}

export interface TaxLine {
  id: number;
  rate_code: string;
  rate_id: number;
  label: string;
  compound: boolean;
  tax_total: string;
  shipping_tax_total: string;
}
