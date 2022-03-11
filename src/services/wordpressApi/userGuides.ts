import axios from "axios";

export const getUserGuides = async (lang: string) => {
  const { data } = await axios.get(
    `https://${process.env.NEXT_PUBLIC_BACKEND_URL}/wp-json/wp/v2/users_guids?lang=${lang}`
  );

  const guides = await data;

  return guides;
};
