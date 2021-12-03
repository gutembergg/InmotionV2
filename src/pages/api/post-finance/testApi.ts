import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  console.log("method: ", method);

  if (method === "POST") {
    return res.status(200).json({ Message: "Message de test api" });
  }
}
