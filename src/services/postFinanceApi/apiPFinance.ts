import axios from "axios";

const apiPFinance = axios.create({
  baseURL: "http://localhost:3000/api/post-finance",
  //baseURL: https://inmotion-suisse-ten.vercel.app/api/post-finance
});

export default apiPFinance;
