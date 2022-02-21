import axios from "axios";

export const getUserGuides = async (lang: string) => {
  const { data } = await axios.get(
    `https://dx7l6anesh.preview.infomaniak.website/wp-json/wp/v2/users_guids?lang=${lang}`
  );

  const guides = await data;

  return guides;
};
