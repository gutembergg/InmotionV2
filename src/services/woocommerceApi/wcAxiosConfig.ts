import axios from "axios";

const wcApi = axios.create({
  baseURL: "https://dx7l6anesh.preview.infomaniak.website/wp-json/wc/v3",
  params: {
    consumer_key: process.env.NEXT_PUBLIC_CONSUMER_KEY as string,
    consumer_secret: process.env.NEXT_PUBLIC_CONSUMER_SECRET as string,
  },
});

export default wcApi;

/* consumer_key: "ck_ecdc6bb08b4feb09d2a4416af650b05110666588",
    consumer_secret: "cs_af4792da6a41005fa575ef4bdae68dae0afd7957", */
