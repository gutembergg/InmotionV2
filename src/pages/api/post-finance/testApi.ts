import type { NextApiRequest, NextApiResponse } from "next";

import { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { method } = req;

  if (method === "POST") {
    return res.status(200).json({ Message: "Message de test api" });
  }
}
