import axios from "axios";

export const getRatesChange = async () => {
  const { data } = await axios.get(
    "https://dx7l6anesh.preview.infomaniak.website/wp-json/wp/v2/change_rate"
  );

  const rate = await data[0].acf.taux_change_euros;

  return rate;
};
