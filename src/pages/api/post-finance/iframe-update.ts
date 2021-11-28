"use strict";

import type { NextApiRequest, NextApiResponse } from "next";
import { PostFinanceCheckout } from "postfinancecheckout";
import { LineItemType } from "postfinancecheckout/src/models/LineItemType";
import { TransactionPending } from "postfinancecheckout/src/models/TransactionPending";

interface ProductsLineItems {
  id: number;
  name: string;
  price: number;
  qty: number;
  sku: string;
}

let spaceId: number = 23340;
let userId: number = 48078;
let apiSecret: string = "q8qtyI5maaCTfZ1aUWXY6Y3G/A/CjABNynZZkxLPjhw=";

let config = {
  space_id: spaceId,
  user_id: userId,
  api_secret: apiSecret,
};

export default async function handlerUpdate(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  const { method } = req;

  if (method === "GET") {
    res.status(200).json({ Message: "get request" });
  }

  if (method === "POST") {
    const transaction = req.body;

    let transactionService: PostFinanceCheckout.api.TransactionService =
      new PostFinanceCheckout.api.TransactionService(config);

    transactionService.read(spaceId, transaction.id).then((response) => {
      const updatedTransaction: TransactionPending = {
        allowedPaymentMethodConfigurations: [transaction.methodId],
        id: response.body.id as number,
        version: response.body.version as number,
      };

      transactionService
        .update(spaceId, updatedTransaction)
        .then((response) => {
          console.log("update==>", response.body);
        });
    });

    // res.status(200).json({ Message: "get request" });
  }
}
