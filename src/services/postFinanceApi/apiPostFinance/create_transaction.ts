import axios from "axios";

export const createTransactions = async () => {
  const { data } = await axios.get(
    "https://checkout.postfinance.ch/api/payment-method/all",
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      },
    }
  );

  console.log("data===>", data);
  return data;
};
