import type { NextApiRequest, NextApiResponse } from "next";
import { PostFinanceCheckout } from "postfinancecheckout";
import initMiddleware from "../../../utils/init-middleware";
import Cors from "cors";
import {
  authorizedOrder,
  completOrder,
} from "../../../services/woocommerceApi/Orders";
import { TransactionState } from "postfinancecheckout/src/models/TransactionState";

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
    const dataWebhook = req.body;
    // console.log("dataWebhook::::", dataWebhook);

    let transactionService: PostFinanceCheckout.api.TransactionService =
      new PostFinanceCheckout.api.TransactionService(config);

    transactionService.read(spaceId, dataWebhook.entityId).then((response) => {
      const orderID = response.body.metaData?.orderId;
      console.log("state: ", response.body.state);
      if (response.body.state === "AUTHORIZED") {
        console.log(`response.AUTHORIZED:${orderID}`, response.body.state);
        authorizedOrder(parseInt(orderID as string, 10)).then((resp) => {
          console.log("resp: ", resp);

          return res.status(200).json({ Message: "Order Authorized!" });
        });

        //return res.status(200).json(response.body);
      } else if (response.body.state === "FULFILL") {
        console.log(`response.FULFILL:${orderID}`, response.body.state);
        completOrder(parseInt(orderID as string, 10)).then((resp) => {
          return res.status(200).json({ Message: "Order Fulfill!" });
        });
      } else {
        return res.status(200).json(response.body);
      }
    });
  }
}
