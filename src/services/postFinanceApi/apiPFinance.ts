import axios from "axios";

const apiPFinance = axios.create({
  baseURL: "https://inmotion-v2.vercel.app/api/post-finance",
});

export default apiPFinance;
