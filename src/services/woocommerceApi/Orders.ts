import { ICoupons } from "../../interfaces/ICoupons";
import { Order } from "../../interfaces/Order";
import wcApi from "./wcAxiosConfig";
import { wooCommerce } from "./woocommerceConfig";

export const createOrder = async (order: any) => {
  const { data } = await wcApi.post("orders", order);
  return data;
};

export const _wc_createOrder = async (order: any) => {
  const { data } = await wcApi.post("orders", order);
  return data;
};

export const wc_createOrder = async (order: any) => {
  const response = await fetch(
    `https://${process.env.NEXT_PUBLIC_BACKEND_URL}/wp-json/wc/v3/orders?consumer_key=${process.env.NEXT_PUBLIC_CONSUMER_KEY}&consumer_secret=${process.env.NEXT_PUBLIC_CONSUMER_SECRET}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    }
  );
  const data = await response.json();

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

/* export const deleteOrder = async (id: number) => {
  try {
    const { data } = await wooCommerce.delete(`orders/${id}`);

    return true;
  } catch (error) {
    throw new Error("")
  }
}; */

export const getOrder = async (id: number): Promise<Order> => {
  const { data } = await wooCommerce.get(`orders/${id}`);
  return data;
};

export const getOrdersByUserId = async (id: number) => {
  const { data } = await wcApi.get(`orders?customer=${id}`);

  return data;
};
