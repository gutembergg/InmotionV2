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
  const { method } = req;

  if (method === "POST") {
    const transactionId = req.body;

    // Transaction Service
    let transactionService: PostFinanceCheckout.api.TransactionService =
      new PostFinanceCheckout.api.TransactionService(config);

    // TransactionPaymentPage Service
    let transactionPaymentPageService: PostFinanceCheckout.api.TransactionPaymentPageService =
      new PostFinanceCheckout.api.TransactionPaymentPageService(config);

    transactionService.read(spaceId, transactionId.id).then((response) => {
      console.log("TransactionCurrenty: ", response.body);
      // transactionService.update(spaceId, );
    });
  }
}
