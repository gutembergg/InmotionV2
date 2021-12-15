// import { ICategories } from "../../interfaces/ICategories";
import { wooCommerce } from "./woocommerceConfig";

// Get all shipping method////////////////////////////////////////////
export const getShippingZones = async () => {
  const { data } = await wooCommerce.get("shipping/zones");
  return data;
};

// Get shipping zone method by id /////////////////////////////////////////
export const getShippingMethods = async () => {
  const { data } = await wooCommerce.get("shipping/zones/1/methods");

  return data;
};

// Get zone methods ///////////////////////////////////////////////

export const getShippingZoneMethods = async (zoneId: number) => {
  const { data } = await wooCommerce.get(`shipping/zones/${zoneId}/methods`);

  console.log("Res=====", data);
  return data;
};
