
import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
    port: 465,
    host: "mail.fat-e.ch",
    auth: {
      user: 'testmail@fat-e.ch',
      pass: 'tpSUSMdV5{9z',
    },
    secure: true,
    
  })