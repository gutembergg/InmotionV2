import type { NextApiRequest, NextApiResponse } from "next";
import { PostFinanceCheckout } from "postfinancecheckout";
import initMiddleware from "../../../utils/init-middleware";
import Cors from "cors";
import { completOrder } from "../../../services/woocommerceApi/Orders";

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
      const stateTrasaction = response.body.state;

      console.log("transaction: ", stateTrasaction, response);
      if (stateTrasaction === "FULFILL") {
        completOrder(8533);
      }
      // completOrder(8534);

      return res.status(200).json(response.body);
    });
  }
  if (method === "PUT") {
    const dataWebhook = req.body;
    console.log("PUT:::PUT:", dataWebhook);

    let transactionService: PostFinanceCheckout.api.TransactionService =
      new PostFinanceCheckout.api.TransactionService(config);

    transactionService.read(spaceId, dataWebhook.entityId).then((response) => {
      console.log("transaction", response.body);

      return res.status(200).json(response.body);
    });
  }
}

/* eventId: 84124104,
  entityId: 35752581,
  listenerEntityId: 1472041829003,
  listenerEntityTechnicalName: 'Transaction',
  spaceId: 23340,
  webhookListenerId: 258340,
  timestamp: '2021-12-03T22:15:20+0000' */
