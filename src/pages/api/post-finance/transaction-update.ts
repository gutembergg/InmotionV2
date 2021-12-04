"use strict";

import type { NextApiRequest, NextApiResponse } from "next";
import { PostFinanceCheckout } from "postfinancecheckout";
import { TransactionPending } from "postfinancecheckout/src/models/TransactionPending";
import initMiddleware from "../../../utils/init-middleware";
import Cors from "cors";

let spaceId: number = 23340;
let userId: number = 48411;
let apiSecret: string = "YQUOgXtny9XW8L0m7jxx47rTd9ilnKiMqEoFSDOh/9U=";

let config = {
  space_id: spaceId,
  user_id: userId,
  api_secret: apiSecret,
};

const cors = initMiddleware(
  Cors({
    methods: ["GET", "POST", "OPTIONS"],
  })
);

export default async function handlerUpdate(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await cors(req, res);

  const { method } = req;

  if (method === "POST") {
    const transaction = req.body;

    let transactionService: PostFinanceCheckout.api.TransactionService =
      new PostFinanceCheckout.api.TransactionService(config);

    transactionService.read(spaceId, transaction.id).then((response) => {
      const updatedTransaction: TransactionPending = {
        allowedPaymentMethodConfigurations: [transaction.methodId],
        id: response.body.id as number,
        version: response.body.version as number,
        successUrl: `https://inmotion-v2.vercel.app/inmotion-mobility/completed-order?order=${transaction.orderId}&pf_ts=${transaction.id}`,
      };

      transactionService
        .update(spaceId, updatedTransaction)
        .then((response) => {
          console.log("update==>", response.body);
          return res.status(200).json(response.body.id);
        });
    });
  }
}
