import axios from "axios";

const api = axios.create({
  baseURL: "https://dx7l6anesh.preview.infomaniak.website/wp-json/api/inmotion",
});

export default api;
