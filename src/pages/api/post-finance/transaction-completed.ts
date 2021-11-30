import type { NextApiRequest, NextApiResponse } from "next";
import { PostFinanceCheckout } from "postfinancecheckout";
import { WebhookUrlUpdate } from "postfinancecheckout/src/models/WebhookUrlUpdate";

let spaceId: number = 23340;
let userId: number = 48078;
let apiSecret: string = "q8qtyI5maaCTfZ1aUWXY6Y3G/A/CjABNynZZkxLPjhw=";

let config = {
  space_id: spaceId,
  user_id: userId,
  api_secret: apiSecret,
};

export default async function handlerCompleted(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  if (method === "GET") {
    const webHookResponse = req.query;
    console.log("webHookResponse::::", webHookResponse);

    let transactionService: PostFinanceCheckout.api.TransactionService =
      new PostFinanceCheckout.api.TransactionService(config);

    if (webHookResponse) {
      transactionService
        .read(spaceId, parseInt(webHookResponse.pf_ts as string))
        .then((response) => {
          console.log("TransactionState: ", response.body.state);
          res.status(200).json({
            transactionState: response.body.state,
            response: webHookResponse,
          });
        });
    } else {
      res.status(404).json({ Message: "Not found" });
    }
  }
}
