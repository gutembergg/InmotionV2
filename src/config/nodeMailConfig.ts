
import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
      user: 'demo@demo.gmail',
      pass: 'password',
    },
    secure: true,
    
  })