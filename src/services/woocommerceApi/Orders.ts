import { Order } from "../../interfaces/Order";
import wcApi from "./wcAxiosConfig";
import { wooCommerce } from "./woocommerceConfig";

// Get coupons////////////////////////////////////////////
export const createOrder = async (order: any) => {
  const { data } = await wooCommerce.post("orders", order);
  return data;
};

export const wc_createOrder = async (order: any): Promise<Order> => {
  const { data } = await wcApi.post("orders", order);
  console.log("oreder=====>", data);

  return data;
};

export const _updateOrder = async (orderId: number, methodName: string) => {
  try {
    const query = {
      payment_method: methodName,
      payment_method_title: methodName,
    };
    const { data } = await wcApi.put(`orders/${orderId}`, query);

    return data;
  } catch (error) {
    console.log("Error: ", error);
  }
};

export const completOrder = async (orderId: number, status: string) => {
  try {
    const query = {
      status: status,
    };
    const { data } = await wcApi.put(`orders/${orderId}`, query);

    return data;
  } catch (error) {
    console.log("Error: ", error);
  }
};
