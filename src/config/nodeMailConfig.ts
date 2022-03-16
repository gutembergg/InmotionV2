import nodemailer from "nodemailer";


export const transporter = nodemailer.createTransport({
  host:process.env.NEXT_PUBLIC_EMAIL_HOST,
  port: Number(process.env.NEXT_PUBLIC_EMAIL_HOST),
  auth: {
    user: process.env.NEXT_PUBLIC_EMAIL_SENDER ,
    pass: process.env.NEXT_PUBLIC_MDP_EMAIL_SENDER,
  },
  secure: true,
});
