// import { ICategories } from "../../interfaces/ICategories";
import { wooCommerce } from "./woocommerceConfig";

// Get coupons////////////////////////////////////////////
export const searchCoupons:any = async (code:string) => {

  const response = await wooCommerce.get("coupons",{code:code});
  return response;
};

