import axios from "axios";

export const getSliderHome = async (lang: string) => {
  const { data: sliders } = await axios.get(
    `https://${process.env.NEXT_PUBLIC_BACKEND_URL}/wp-json/wp/v2/slider_home?lang=${lang}`
  );

  return sliders;
};
