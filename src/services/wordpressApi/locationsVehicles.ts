import axios from "axios";

export const getLocationsVehicles = async (lang: string) => {
  const { data: locations } = await axios.get(
    `https://dx7l6anesh.preview.infomaniak.website/wp-json/wp/v2/locations_vehicles?lang=${lang}`
  );

  return locations;
};
