import type { NextApiRequest, NextApiResponse } from "next";
import { PostFinanceCheckout } from "postfinancecheckout";

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

export default async function handlerCompleted(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  if (method === "POST") {
    const webHookResponse = req.query;
    const dataWebhook = req.body;
    console.log("webHookResponse::::", webHookResponse);
    console.log("dataWebhook::::", dataWebhook);

    let transactionService: PostFinanceCheckout.api.TransactionService =
      new PostFinanceCheckout.api.TransactionService(config);

    return res.status(200).json(dataWebhook);

    /*   if (webHookResponse) {
      transactionService
        .read(spaceId, parseInt(webHookResponse.inm_wh as string))
        .then((response) => {
          console.log("TransactionState: ", response.body.state);
          return res.status(200).json({
            transactionState: response.body.state,
            response: webHookResponse,
          });
        });
    } else {
      return res.status(404).json({ Message: "Not found" });
    } */
  }
  if (method === "PUT") {
    const webHookResponse = req.query;
    const dataWebHooks = req.body;
    console.log("webHookResponse::::", webHookResponse);
    console.log("dataWebHooks::::", dataWebHooks);

    let transactionService: PostFinanceCheckout.api.TransactionService =
      new PostFinanceCheckout.api.TransactionService(config);
  }
}
