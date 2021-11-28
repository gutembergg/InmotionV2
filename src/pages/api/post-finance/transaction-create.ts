"use strict";

import type { NextApiRequest, NextApiResponse } from "next";
import { PostFinanceCheckout } from "postfinancecheckout";
import { LineItemType } from "postfinancecheckout/src/models/LineItemType";

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

export default async function handler(
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
    // Transaction Service
    let transactionService: PostFinanceCheckout.api.TransactionService =
      new PostFinanceCheckout.api.TransactionService(config);

    // TransactionPaymentPage Service
    let transactionPaymentPageService: PostFinanceCheckout.api.TransactionPaymentPageService =
      new PostFinanceCheckout.api.TransactionPaymentPageService(config);

    // LineItem of type PRODUCT
    let lineItem: PostFinanceCheckout.model.LineItemCreate =
      new PostFinanceCheckout.model.LineItemCreate();
    lineItem.name = "Red T-Shirt";
    lineItem.uniqueId = "5412";
    lineItem.sku = "red-t-shirt-123";
    lineItem.quantity = 1;
    lineItem.amountIncludingTax = 3.5;
    lineItem.type = PostFinanceCheckout.model.LineItemType.PRODUCT;

    // Transaction
    let transaction: PostFinanceCheckout.model.TransactionCreate =
      new PostFinanceCheckout.model.TransactionCreate();
    transaction.lineItems = [lineItem];
    transaction.autoConfirmationEnabled = true;
    transaction.currency = "EUR";
    /* transactionService.fetchPaymentMethods */

    transactionService.create(spaceId, transaction).then((response) => {
      let transactionCreate: PostFinanceCheckout.model.Transaction =
        response.body;

      console.log("transactionCreate===>", transactionCreate);

      transactionPaymentPageService
        .paymentPageUrl(spaceId, <number>transactionCreate.id)
        .then(function (response) {
          let pageUrl: string = response.body;

          res.status(200).json({ URL: pageUrl });
        });
    });
  }

  if (method === "POST") {
    const productsLineItems: ProductsLineItems[] = req.body;
    // Transaction Service
    let transactionService: PostFinanceCheckout.api.TransactionService =
      new PostFinanceCheckout.api.TransactionService(config);

    // LineItem of type PRODUCT
    let lineItem: PostFinanceCheckout.model.LineItemCreate =
      new PostFinanceCheckout.model.LineItemCreate();

    const lineItemsArray: any = productsLineItems.map((item) => {
      lineItem = {
        name: item.name,
        uniqueId: item.sku,
        sku: item.sku,
        quantity: item.qty,
        amountIncludingTax: item.qty * item.price,
        type: "PRODUCT" as LineItemType,
      };

      return lineItem;
    });

    // Transaction ////////////////////////////////////////
    let transaction: PostFinanceCheckout.model.TransactionCreate =
      new PostFinanceCheckout.model.TransactionCreate();
    transaction.lineItems = [...lineItemsArray];
    transaction.autoConfirmationEnabled = true;
    transaction.currency = "EUR";

    transactionService.create(spaceId, transaction).then((response) => {
      let transactionCreate: PostFinanceCheckout.model.Transaction =
        response.body;

      //// Fecth payment methods
      transactionService
        .fetchPaymentMethods(
          spaceId,
          transactionCreate.id as number,
          "payment_page"
        )
        .then(function (response) {
          const responseQuery = {
            transactionId: transactionCreate.id,
            paymentMethods: response.body,
          };
          res.status(200).json(responseQuery);
        });
    });
  }
}
