import type { NextApiRequest, NextApiResponse } from "next";
import initMiddleware from "../../../utils/init-middleware";
import Cors from "cors";

const cors = initMiddleware(
  Cors({
    methods: ["GET", "POST", "OPTIONS", "PUT"],
  })
);

export default async function contactHandler(
    req: NextApiRequest,
    res: NextApiResponse
  ) { 
    await cors(req, res);
    const { method } = req;

    if (method === "POST") {
      const {name,email,message} = req.body;
      

    }else{
      return res.status(400).json({error:"erreure envoie email"})
    }
  }



//   let data = {
//     name,
//     email,
//     message
//   }

// axios('/api/node-mail/nodemail', {
//  data
//   })
// })