export interface UserShipping {
  first_name: string;
  last_name: string;
  company: string;
  address_1: string;
  address_2: string;
  postcode: string;
  state: string;
  city: string;
  country: string;
  phone: string;
}

export interface UserBilling {
  first_name: string;
  last_name: string;
  email: string;
  country: string;
  address_1: string;
  address_2: string;
  postcode: string;
  state: string;
  city: string;
  phone: string;
  vat: string;
}

interface MetaData {
  id: string;
  key: string;
  value: string;
}

export interface User {
  avatar_url: string;
  billing: UserBilling;
  date_created: string;
  date_created_gmt: string;
  date_modified: string;
  date_modified_gmt: string;
  email: string;
  first_name: string;
  id: number;
  is_paying_customer: true;
  last_name: string;
  meta_data: MetaData;
  role: string;
  shipping: UserShipping;
  username: string;
  wcb2b_group: { discount: string; id: number; name: string };
  wcb2b_status: number;
}
