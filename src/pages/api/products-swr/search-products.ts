import type { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors";
import initMiddleware from "../../../utils/init-middleware";
import { getProductByCategory } from "../../../services/woocommerceApi/Products";

const cors = initMiddleware(
  Cors({
    methods: ["GET", "POST", "OPTIONS"],
  })
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await cors(req, res);

  const { method } = req;

  if (method === "GET") {
    getProductByCategory(80, "fr")
      .then((response) => {
        return res.status(200).json(response);
      })
      .catch((error) => {
        return res.status(400).json({ Error: "Error not authorized" });
      });
  }
}
