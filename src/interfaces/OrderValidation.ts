export interface BillingValues {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address_1: string;
  address_2: string;
  postcode: string;
  city: string;
  state: string;
  country: string;
}

export interface ShippingValues {
  first_name: string;
  last_name: string;
  phone: string;
  address_1: string;
  address_2: string;
  postcode: string;
  city: string;
  state: string;
  country: string;
}

export interface OrderValidation {
  billing: BillingValues;
  shipping: ShippingValues;
}

export interface LineItemsDTO {
  name?: string;
  product_id: number;
  variation_id?: number;
  quantity: number;
  tax_class?: string;
  subtotal?: string;
  total?: string;
  total_tax?: string;
}
