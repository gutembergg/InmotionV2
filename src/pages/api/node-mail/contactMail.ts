import type { NextApiRequest, NextApiResponse } from "next";
import { transporter } from "../../../config/nodeMailConfig";

export default function async(req: NextApiRequest, res: NextApiResponse) {
  const {
    email,
    firstName,
    lastName,
    message,
    telephone,
  } = req.body;

  try {
    let options = {
      from: `${process.env.NEXT_PUBLIC_EMAIL_SENDER}`,
      to: `${process.env.NEXT_PUBLIC_EMAIL_SENDER}`,
      subject: `${firstName} ${lastName} via Formulaire de contact`,
      replyTo:`${email}`,
      html: `

<h2>message du client:</h2>
${message}
<br />
<br />           
<h2>coordonnées du client:</h2>
<br />
<b>${firstName} ${lastName}</b>
<br />
${telephone}
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
