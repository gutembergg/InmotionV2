import type { NextApiRequest, NextApiResponse } from "next";
import { PostFinanceCheckout } from "postfinancecheckout";
import initMiddleware from "../../../utils/init-middleware";
import Cors from "cors";
import { updateOrder } from "../../../services/woocommerceApi/Orders";

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

    console.log("dataWebhook", config);

    let transactionService: PostFinanceCheckout.api.TransactionService =
      new PostFinanceCheckout.api.TransactionService(config);

    console.log("dataWh::", dataWebhook.spaceId, dataWebhook.entityId);

    console.log("spaceId-env", spaceId, config.space_id);

    transactionService
      .read(dataWebhook.spaceId, dataWebhook.entityId)
      .then((response) => {
        const orderID = response.body.metaData?.orderId;
        console.log("state: ", response.body.state);
        console.log("response:", response.body);
        console.log("orderId: ", orderID);
        console.log("dataWebhook.entityId", dataWebhook.entityId);

        if (response.body.state === "AUTHORIZED") {
          console.log(`response.AUTHORIZED:${orderID}`, response.body.state);
          updateOrder(Number(orderID), "on-hold")
            .then((resp) => {
              console.log("Resp====>", resp);

              return res.status(200).json({ Message: "Order Authorized!" });
            })
            .catch((error) => {
              return res.status(200).json({ Error: "Internal error" });
            });
        } else if (response.body.state === "FULFILL") {
          console.log(`response.FULFILL:${orderID}`, response.body.state);
          updateOrder(Number(orderID), "completed")
            .then((resp) => {
              console.log("Resp====>", resp);
              return res.status(200).json({ Message: "Order Completed!" });
            })
            .catch((error) => {
              return res.status(200).json({ Error: "Internal error" });
            });
        } else if (response.body.state === "FAILED") {
          console.log(`response.FAILED:${orderID}`, response.body.state);

          updateOrder(Number(orderID), "failed")
            .then((response) => {
              return res.status(200).json({ Message: "Order Failed!" });
            })
            .catch((error) => {
              return res.status(200).json({ Error: "Internal error" });
            });
        } else if (response.body.state === "DECLINE") {
          console.log(`response.DECLINE:${orderID}`, response.body.state);

          updateOrder(Number(orderID), "cancelled")
            .then((response) => {
              return res.status(200).json({ Message: "Order Cancelled!" });
            })
            .catch((error) => {
              return res.status(200).json({ Error: "Internal error" });
            });
        } else {
          return res.status(200).json(response.body);
        }
        return res.status(200).json(response.body);
      })
      .catch((error) => res.status(500).json({ error: error }));
  }
}
