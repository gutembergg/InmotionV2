import type { NextApiRequest, NextApiResponse } from "next";
import initMiddleware from "../../../utils/init-middleware";
import Cors from "cors";
import { transporter } from "../../../config/nodeMailConfig";

// metre la config -  transporteur

const cors = initMiddleware(
  Cors({
    methods: ["POST"],
  })
);

export default async function returnProducthandlers(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await cors(req, res);
  const { method } = req;
console.log("req--->",req)
  //si methode post : 
  if (method === "POST") {
    const { name, email, message } = req.body;

    // send mail with defined transport object
    let info = {
      from: '"Fred Foo 👻" <foo@example.com>', // sender address
      to: "fatih@fat-e.ch", // list of receivers
      subject: "Demande de retour produit Inmotion", // Subject line
      text: "demande de retour", // plain text body
      html: "<b>Hello world?</b>", // html body
    };
    
    return res.status(200).json(true)
  } else {
    return res.status(400).json({ error: "erreure envoie email" });
  }
  
}




