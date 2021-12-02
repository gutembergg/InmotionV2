"use strict";

import type { NextApiRequest, NextApiResponse } from "next";
import { PostFinanceCheckout } from "postfinancecheckout";
import { TransactionPending } from "postfinancecheckout/src/models/TransactionPending";

/* let spaceId: number = 23340;
let userId: number = 48078;
let apiSecret: string = "q8qtyI5maaCTfZ1aUWXY6Y3G/A/CjABNynZZkxLPjhw="; */

let spaceId: number = 23340;
let userId: number = 48407;
let apiSecret: string = "8AHR3Enly7vmpBwrtXplvccVK4Tvrq9WoDWwn/nmiRQ=";

let config = {
  space_id: spaceId,
  user_id: userId,
  api_secret: apiSecret,
};

export default async function handlerUpdate(
  req: NextApiRequest,
  res: NextApiResponse
) {
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
        successUrl: `http://localhost:3000/inmotion-mobility/completed-order?order=${transaction.orderId}&pf_ts=${transaction.id}`,
      };

      transactionService
        .update(spaceId, updatedTransaction)
        .then((response) => {
          res.status(200).json(response.body.id);
          //console.log("update==>", response.body);
        });
    });
  }
}
