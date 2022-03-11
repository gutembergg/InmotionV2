import axios from "axios";

export const getRatesChange = async () => {
  const { data } = await axios.get(
    `https://${process.env.NEXT_PUBLIC_BACKEND_URL}/wp-json/wp/v2/change_rate`
  );

  const rate = await data[0].acf.taux_change_euros;

  return rate;
};
