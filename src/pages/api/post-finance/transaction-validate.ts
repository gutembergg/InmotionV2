"use strict";

import type { NextApiRequest, NextApiResponse } from "next";
import { PostFinanceCheckout } from "postfinancecheckout";
import { TransactionPending } from "postfinancecheckout/src/models/TransactionPending";

let spaceId: number = 23340;
let userId: number = 48078;
let apiSecret: string = "q8qtyI5maaCTfZ1aUWXY6Y3G/A/CjABNynZZkxLPjhw=";

let config = {
  space_id: spaceId,
  user_id: userId,
  api_secret: apiSecret,
};

export default async function handlerValidate(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  if (method === "POST") {
    const transaction = req.body;

    // TransactionPaymentPage Service
    let transactionPaymentPageService: PostFinanceCheckout.api.TransactionPaymentPageService =
      new PostFinanceCheckout.api.TransactionPaymentPageService(config);

    transactionPaymentPageService
      .paymentPageUrl(spaceId, <number>transaction.id)
      .then(function (response) {
        let pageUrl: string = response.body;

        res.status(200).json(pageUrl);
      });
  }
}
