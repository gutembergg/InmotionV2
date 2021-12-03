"use strict";

import type { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors";
import { PostFinanceCheckout } from "postfinancecheckout";
import initMiddleware from "../../../utils/init-middleware";

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

export default async function handlerValidate(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await cors(req, res);

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