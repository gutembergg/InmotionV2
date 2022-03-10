import axios from "axios";

const api = axios.create({
  baseURL: `https://${process.env.NEXT_PUBLIC_BACKEND_URL}/wp-json/api/inmotion`,
});

export default api;
