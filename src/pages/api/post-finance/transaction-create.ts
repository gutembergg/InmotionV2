import type { NextApiRequest, NextApiResponse } from "next";
import { PostFinanceCheckout } from "postfinancecheckout";
import { LineItemType } from "postfinancecheckout/src/models/LineItemType";
import Cors from "cors";
import initMiddleware from "../../../utils/init-middleware";

interface ProductsLineItems {
  id: number;
  name: string;
  price: number;
  qty: number;
  sku: string;
}

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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  await cors(req, res);

  const { method } = req;

  console.log("method: ", method);

  if (method === "POST") {
    const productsLineItems: ProductsLineItems[] = req.body.productsCheckout;
    const orderId: number = req.body.orderId;
    const currencyResp = req.body.currency;

    console.log("currencyResp: ", currencyResp);

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
    transaction.currency = currencyResp;
    transaction.metaData = { orderId: orderId.toString() };

    transactionService.create(spaceId, transaction).then((response) => {
      let transactionCreate: PostFinanceCheckout.model.Transaction =
        response.body;

      console.log("transactionCurrenty: ", response.body);

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
