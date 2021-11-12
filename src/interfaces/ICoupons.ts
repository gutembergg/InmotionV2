export interface ICoupons{
amount:string;
code: string;
date_created: string;
date_created_gmt: string;
date_expires: string;
date_expires_gmt: string;
date_modified: string;
date_modified_gmt: string;
description: string;
discount_type: string;
email_restrictions: string[];
exclude_sale_items: boolean;
excluded_product_categories: number[];
excluded_product_ids: number[];
free_shipping: boolean;
id: number;
individual_use: boolean;
limit_usage_to_x_items: number;
maximum_amount: string;
meta_data: CouponMetaData[];
minimum_amount: string;
product_categories: number[];
product_ids: number[];
usage_count: number;
usage_limit: number;
usage_limit_per_user: number;
used_by: string[];

}
interface CouponMetaData{
    id:number;
    key:string;
    value: string | string[]
}