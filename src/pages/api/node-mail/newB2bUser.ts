import type { NextApiRequest, NextApiResponse } from "next";
import { transporter } from "../../../config/nodeMailConfig";

export default function async(req: NextApiRequest, res: NextApiResponse) {
  const { billing_company, billing_vat, email, phone, lastname, name } =
    req.body;

  try {
    let options = {
      from: `${process.env.NEXT_PUBLIC_EMAIL_SENDER}`,
      to: `${process.env.NEXT_PUBLIC_EMAIL_RECEVER}`,
      subject: `${billing_company} demande de compte B2B`,
      replyTo: `${email}`,
      html: `

<h2>Demande de client B2B:</h2>
l'entreprise ${billing_company} à demander à ouvrir un compte B2B.
<br />
<br />
Numéro de TVA:${billing_vat}
<br />
<br />           
<h2>coordonnées:</h2>
<br />
<b>${name} ${lastname}</b>
<b>${email}</b>
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
