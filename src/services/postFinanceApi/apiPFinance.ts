import axios from "axios";

const apiPFinance = axios.create({
  baseURL: "http://localhost:3000/api/post-finance",
  //baseURL: "http://localhost:3000/api/post-finance", https://inmotion-suisse-ten.vercel.app/fr/inmotion-mobility
});

export default apiPFinance;
