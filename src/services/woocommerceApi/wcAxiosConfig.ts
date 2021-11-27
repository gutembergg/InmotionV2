import axios from "axios";

const wcApi = axios.create({
  baseURL: "https://dx7l6anesh.preview.infomaniak.website/wp-json/wc/v3",
  params: {
    consumer_key: process.env.NEXT_PUBLIC_CONSUMER_KEY as string,
    consumer_secret: process.env.NEXT_PUBLIC_CONSUMER_SECRET as string,
  },
});

export default wcApi;
