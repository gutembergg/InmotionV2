import type { NextApiRequest, NextApiResponse } from "next";
import { PostFinanceCheckout } from "postfinancecheckout";
import initMiddleware from "../../../utils/init-middleware";
import Cors from "cors";
import { updateOrder } from "../../../services/woocommerceApi/Orders";

let spaceId: number = 23340;
let userId: number = 48407;
let apiSecret: string = "8AHR3Enly7vmpBwrtXplvccVK4Tvrq9WoDWwn/nmiRQ=";

let config = {
  space_id: spaceId,
  user_id: userId,
  api_secret: apiSecret,
};

const cors = initMiddleware(
  Cors({
    methods: ["GET", "POST", "OPTIONS", "PUT"],
  })
);

export default async function handlerCompleted(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await cors(req, res);

  const { method } = req;

  if (method === "POST") {
    const dataWebhook = req.body;
    // console.log("dataWebhook::::", dataWebhook);

    let transactionService: PostFinanceCheckout.api.TransactionService =
      new PostFinanceCheckout.api.TransactionService(config);

    transactionService.read(spaceId, dataWebhook.entityId).then((response) => {
      const orderID = response.body.metaData?.orderId;
      console.log("state: ", response.body.state);
      if (response.body.state === "AUTHORIZED") {
        console.log(`response.AUTHORIZED:${orderID}`, response.body.state);
        updateOrder(parseInt(orderID as string, 10), "on-hold").then((resp) => {
          return res.status(200).json({ Message: "Order Authorized!" });
        });
      } else if (response.body.state === "FULFILL") {
        console.log(`response.FULFILL:${orderID}`, response.body.state);
        updateOrder(parseInt(orderID as string, 10), "completed").then(
          (resp) => {
            return res.status(200).json({ Message: "Order Fulfill!" });
          }
        );
      } else if (response.body.state === "FAILED") {
        console.log(`response.FAILED:${orderID}`, response.body.state);

        updateOrder(parseInt(orderID as string, 10), "failed").then(
          (response) => {
            return res.status(200).json({ Message: "Order Failed!" });
          }
        );
      } else if (response.body.state === "DECLINE") {
        console.log(`response.DECLINE:${orderID}`, response.body.state);

        updateOrder(parseInt(orderID as string, 10), "cancelled").then(
          (response) => {
            return res.status(200).json({ Message: "Order Cancelled!" });
          }
        );
      } else {
        return res.status(200).json(response.body);
      }
    });
  }
}
