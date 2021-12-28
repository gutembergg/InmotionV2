
import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
    port: 465,
    host: "mail.fat-e.ch",
    auth: {
      user: process.env.EMAIL_SENDER,
      pass: process.env.MDP_EMAIL_SENDER,
    },
    secure: true,
    
  })