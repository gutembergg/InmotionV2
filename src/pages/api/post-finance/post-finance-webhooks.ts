import type { NextApiRequest, NextApiResponse } from "next";
import { PostFinanceCheckout } from "postfinancecheckout";
import initMiddleware from "../../../utils/init-middleware";
import Cors from "cors";
import { wc_createOrder } from "../../../services/woocommerceApi/Orders";

let spaceId: number = 23340;
let userId: number = 48407;
let apiSecret: string = "8AHR3Enly7vmpBwrtXplvccVK4Tvrq9WoDWwn/nmiRQ=";

//https://inmotion-v2.vercel.app/api/post-finance/post-finance-webhooks?inm-wc=inm_checkout

let config = {
  space_id: spaceId,
  user_id: userId,
  api_secret: apiSecret,
};

const cors = initMiddleware(
  Cors({
    methods: ["GET", "POST", "OPTIONS", "PUT"],
  })
);

export default async function handlerCompleted(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await cors(req, res);

  const { method } = req;

  if (method === "POST") {
    const webHookResponse = req.query;
    const dataWebhook = req.body;
    console.log("webHookResponse::::", webHookResponse);
    console.log("dataWebhook::::", dataWebhook);

    const order = {
      payment_method: "bacs",
      payment_method_title: "Direct Bank Transfer",
      billing: {
        first_name: "WebHook-test",
        last_name: "WebHook-test",
        address_1: "969 WebHook-test",
        address_2: "",
        city: "WebHook",
        state: "CA",
        postcode: "94103",
        country: "US",
        email: "john.doe@example.com",
        phone: "(555) 555-5555",
      },
      shipping: {
        first_name: "WebHook-test",
        last_name: "WebHook",
        address_1: "969 Market",
        address_2: "",
        city: "San Francisco",
        state: "CA",
        postcode: "94103",
        country: "US",
      },
      line_items: [
        {
          product_id: 93,
          quantity: 2,
        },
        {
          product_id: 22,
          variation_id: 23,
          quantity: 1,
        },
      ],
      shipping_lines: [
        {
          method_id: "flat_rate",
          method_title: "Flat Rate",
          total: "10.00",
        },
      ],
    };

    await wc_createOrder(order);
  }
  if (method === "PUT") {
    const webHookResponse = req.query;
    const dataWebHooks = req.body;
    console.log("webHookResponse::::", webHookResponse);
    console.log("dataWebHooks::::", dataWebHooks);
  }
}
