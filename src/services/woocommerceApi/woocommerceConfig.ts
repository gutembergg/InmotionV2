import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

export const wooCommerce = new WooCommerceRestApi({
  url: `https://${process.env.NEXT_PUBLIC_BACKEND_URL}`,
  consumerKey: process.env.NEXT_PUBLIC_CONSUMER_KEY as string,
  consumerSecret: process.env.NEXT_PUBLIC_CONSUMER_SECRET as string,
  version: "wc/v3",
  axiosConfig: { headers: {} },
  queryStringAuth: true,
});
