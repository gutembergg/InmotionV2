
import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
    port: 465,
    host: process.env.EMAIL_SENDER,
    auth: {
      user: process.env.EMAIL_SENDER,
      pass: process.env.MDP_EMAIL_SENDER,
    },
    secure: true,
    
  })