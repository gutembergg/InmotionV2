import axios from "axios";

const apiPFinance = axios.create({
  baseURL: "http://localhost:3000/api/post-finance/",
});

export default apiPFinance;
