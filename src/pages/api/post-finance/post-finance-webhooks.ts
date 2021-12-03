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

    return res.status(200).json(dataWebhook);
  }
  if (method === "PUT") {
    const webHookResponse2222 = req.query;
    const dataWebHooks222 = req.body;
    console.log("webHookResponse::::", webHookResponse2222);
    console.log("dataWebHooks::::", dataWebHooks222);
    return res.status(200).json(dataWebHooks222);
  }
}
