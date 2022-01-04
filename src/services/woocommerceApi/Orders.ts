import { ICoupons } from "../../interfaces/ICoupons";
import { Order } from "../../interfaces/Order";
import wcApi from "./wcAxiosConfig";
import { wooCommerce } from "./woocommerceConfig";

export const createOrder = async (order: any) => {
  const { data } = await wooCommerce.post("orders", order);
  return data;
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

export const updateOrder = async (orderId: number, status: string) => {
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

export const updateCouponsOrder = async (id: number, coupons: ICoupons[]) => {
  const query = {
    coupon_lines: coupons,
  };
  const { data } = await wcApi.put(`orders/${id}`, query);

  return data;
};

export const deleteOrder = async (id: number) => {
  try {
    const { data } = await wooCommerce.delete(`orders/${id}`);

    console.log("deleteOrder====>", data);
    return true;
  } catch (error) {
    console.log("Error", error);
  }
};

export const getOrder = async (id: number) => {
  try {
    const { data } = await wooCommerce.get(`orders/${id}`);
    return data;
  } catch (error) {
    console.log("Error", error);
  }
};