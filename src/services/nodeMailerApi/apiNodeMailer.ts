import axios from "axios";

const apiNodeMailer = axios.create({
  baseURL: "http://localhost:3000/api/node-mail/contactMail",
});

//"https://inmotion-v2.vercel.app/api/post-finance"

export default apiNodeMailer;
