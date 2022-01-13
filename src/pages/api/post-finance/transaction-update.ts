"use strict";

import type { NextApiRequest, NextApiResponse } from "next";
import { PostFinanceCheckout } from "postfinancecheckout";
import { TransactionPending } from "postfinancecheckout/src/models/TransactionPending";
import initMiddleware from "../../../utils/init-middleware";
import Cors from "cors";
import { LineItemType } from "postfinancecheckout/src/models/LineItemType";
import { ProductsLineItems } from "./transaction-create";

let spaceId: number = Number(process.env.NEXT_PUBLIC_POSTFINANCE_SPACE_ID);
let userId: number = Number(process.env.NEXT_PUBLIC_POSTFINANCE_USER_ID);
let apiSecret: string = process.env
  .NEXT_PUBLIC_POSTFINANCE_API_SECRET as string;

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
    const productsLineItems: ProductsLineItems[] = req.body.productsCheckout;
    const shippingTx = req.body.shippingTaxe;
    const taxMethodsPayments = req.body.taxPaymentMethods;

    let transactionService: PostFinanceCheckout.api.TransactionService =
      new PostFinanceCheckout.api.TransactionService(config);

    // LineItem of type PRODUCT
    let lineItem: PostFinanceCheckout.model.LineItemCreate =
      new PostFinanceCheckout.model.LineItemCreate();

    transactionService
      .read(spaceId, transaction.id)
      .then((response) => {
        const lineItemsArray: any = productsLineItems.map((item) => {
          lineItem = {
            name: item.name,
            uniqueId: item.sku,
            sku: item.sku,
            quantity: item.qty,
            amountIncludingTax: item.price,
            type: "PRODUCT" as LineItemType,
          };

          return lineItem;
        });

        const shipping: any = (lineItem = {
          name: "Shipping",
          uniqueId: "shipping_1",
          sku: "shipping",
          quantity: 1,
          amountIncludingTax: shippingTx,
          type: "PRODUCT" as LineItemType,
        });

        const taxPaymentMethods: any = (lineItem = {
          name: "TaxPaymentMethods",
          uniqueId: "taxpaymentmethods",
          sku: "taxpaymentmethods",
          quantity: 1,
          amountIncludingTax: Number(taxMethodsPayments),
          type: "PRODUCT" as LineItemType,
        });

        const itemsWithShipping: any =
          shippingTx > 0
            ? [...lineItemsArray, shipping, taxPaymentMethods]
            : [...lineItemsArray, taxPaymentMethods];

        const updatedTransaction: TransactionPending = {
          allowedPaymentMethodConfigurations: [transaction.methodId],
          id: response.body.id as number,
          lineItems: [...itemsWithShipping],
          version: response.body.version as number,
          successUrl: `https://inmotion-v2.vercel.app/inmotion-mobility/completed-order?order=${transaction.orderId}&pf_ts=${transaction.id}`,
        };

        transactionService
          .update(spaceId, updatedTransaction)
          .then((response) => {
            return res.status(200).json(response.body.id);
          })
          .catch((error) => {
            return res.status(500).json({ Error: "Internal error" });
          });
      })
      .catch((error) => {
        return res.status(500).json({ Error: "Internal error" });
      });
  }
}
