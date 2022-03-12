import axios from "axios";

const apiPFinance = axios.create({
  baseURL: "https://www.inmotion-suisse.ch/api/post-finance",
  //"https://www.inmotion-suisse.ch/api/post-finance"
});

export default apiPFinance;
