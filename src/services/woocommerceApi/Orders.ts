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

export const _updateOrder = async (
  orderId: number,
  methodName: string,
  transactionId: string,
  taxPaymentMethods: string
) => {
  const query = {
    payment_method: methodName,
    payment_method_title: methodName,
    transaction_id: transactionId,
    fee_lines: [
      {
        name: "tax payment methods",
        total: taxPaymentMethods,
        tax_status: "none",
      },
    ],
  };
  const { data } = await wcApi.put(`orders/${orderId}`, query);

  return data;
};

export const updateOrder = async (orderId: number, status: string) => {
  const query = {
    status: status,
  };
  const { data } = await wcApi.put(`orders/${orderId}`, query);

  return data;
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

export const getOrder = async (id: number): Promise<Order> => {
  const { data } = await wooCommerce.get(`orders/${id}`);
  return data;
};

export const getOrdersByUserId = async (id: number) => {
  const { data } = await wcApi.get(`orders?customer=${id}`);

  return data;
};
