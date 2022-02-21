import axios from "axios";

export const getSliderHome = async (lang: string) => {
  const { data } = await axios.get(
    `https://dx7l6anesh.preview.infomaniak.website/wp-json/wp/v2/slider_home?lang=${lang}`
  );

  const sliders = await data;
  return sliders;
};
