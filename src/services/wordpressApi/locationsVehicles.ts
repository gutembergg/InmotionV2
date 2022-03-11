import axios from "axios";

export const getLocationsVehicles = async (lang: string) => {
  const { data: locations } = await axios.get(
    `https://${process.env.NEXT_PUBLIC_BACKEND_URL}/wp-json/wp/v2/locations_vehicles?lang=${lang}`
  );

  return locations;
};
