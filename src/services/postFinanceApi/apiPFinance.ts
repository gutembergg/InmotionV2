import axios from "axios";

const apiPFinance = axios.create({
  baseURL: "http://localhost:3000/api/post-finance",
});

//"https://inmotion-v2.vercel.app/api/post-finance"

export default apiPFinance;
