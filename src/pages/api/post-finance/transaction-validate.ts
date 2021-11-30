"use strict";

import type { NextApiRequest, NextApiResponse } from "next";
import { PostFinanceCheckout } from "postfinancecheckout";
import { CreationEntityState } from "postfinancecheckout/src/models/CreationEntityState";
import { TransactionPending } from "postfinancecheckout/src/models/TransactionPending";
import { WebhookListenerCreate } from "postfinancecheckout/src/models/WebhookListenerCreate";
import { WebhookUrl } from "postfinancecheckout/src/models/WebhookUrl";
import { WebhookUrlCreate } from "postfinancecheckout/src/models/WebhookUrlCreate";
import { WebhookUrlUpdate } from "postfinancecheckout/src/models/WebhookUrlUpdate";

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

        return res.status(200).json(pageUrl);
      });
  }
}
