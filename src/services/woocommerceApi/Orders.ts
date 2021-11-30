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

export const completOrder = async (orderId: number) => {
  try {
    const query = {
      status: "completed",
    };
    const { data } = await wcApi.put(`orders/${orderId}`, query);
    console.log("order=====>", data);

    return data;
  } catch (error) {
    console.log("Error: ", error);
  }
};
