import { Order } from "../../interfaces/Order";
import wcApi from "./wcAxiosConfig";
import { wooCommerce } from "./woocommerceConfig";

// Get coupons////////////////////////////////////////////
export const createOrder = async (order: any) => {
  const response = await wooCommerce.post("orders", order);
  return response;
};

export const wc_createOrder = async (order: any): Promise<Order> => {
  const { data } = await wcApi.post("orders", order);

  return data;
};
