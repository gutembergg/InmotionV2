import wcApi from "./wcAxiosConfig";

export const wc_paymentGateWays = async () => {
  const { data } = await wcApi.get("payment_gateways");

  return data;
};
