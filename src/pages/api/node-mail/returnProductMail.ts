import type { NextApiRequest, NextApiResponse } from "next";
import { transporter } from "../../../config/nodeMailConfig";

export default function async(req: NextApiRequest, res: NextApiResponse) {
  console.log("Req", req);
  console.log("Res", res);
  const {
    address,
    city,
    country,
    date_achat,
    email,
    first_name,
    last_name,
    message,
    nom_produit,
    phone,
    postcode,
    revendeur,
    serial,
  } = req.body;

  try {
    let options = {
      from: `${email}`,
      to: "fatih@fat-e.ch",
      subject: `demande de retour marchandise`,
      html: `
<h2>Demande de retour marchandise pour:</h2>
<b>modèle</b>: ${nom_produit}
<br />
<b>sérial:</b> ${serial} 
<br />
<b>acheté le :</b> ${date_achat}
<br />
<b>chez le revendeur:</b> ${revendeur} <br />
<br />
<br />      
<h2>message du client:</h2>
${message}
<br />
<br />           
<h2>coordonnées du client:</h2>
<br />
<br />
<b>${first_name} ${last_name}</b>
<br />
${address}
<br />
${postcode} ${city}
<br />
${country}
<br />
<br />
${phone}
<br />
${email}
`,
    };
    transporter.sendMail(options);
    return res.status(200).json(true);
  } catch (error) {
    return res.status(400);
  }
}
