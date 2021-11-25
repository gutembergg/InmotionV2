import axios from "axios";

const apiTest = axios.create({
  baseURL: "http://localhost:3000/api",
});

export default apiTest;
