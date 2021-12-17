export interface UserBillingShipping {
  shipping_first_name: string;
  shipping_last_name: string;
  shipping_company: string;
  shipping_address_1: string;
  shipping_address_2: string;
  shipping_postcode: string;
  shipping_state: string;
  shipping_city: string;
  shipping_country: string;
  shipping_phone: string;

  billing_first_name: string;
  billing_last_name: string;
  billing_email: string;
  billing_country: string;
  billing_address_1: string;
  billing_address_2: string;
  billing_postcode: string;
  billing_state: string;
  billing_city: string;
  billing_phone: string;
  billing_vat: string;
}
