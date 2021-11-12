import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

export const wooCommerce = new WooCommerceRestApi({
  url: "https://dx7l6anesh.preview.infomaniak.website",
  consumerKey: process.env.NEXT_PUBLIC_CONSUMER_KEY as string,
  consumerSecret: process.env.NEXT_PUBLIC_CONSUMER_SECRET as string,
  version: "wc/v3",
  axiosConfig: { headers: {} },
  queryStringAuth: true,
});
