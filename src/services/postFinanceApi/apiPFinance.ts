import axios from "axios";

const apiPFinance = axios.create({
  baseURL: "https://inmotion-v2.vercel.app/api/post-finance",
  // baseURL: "http://localhost:3000/api/post-finance",
});



export default apiPFinance;
