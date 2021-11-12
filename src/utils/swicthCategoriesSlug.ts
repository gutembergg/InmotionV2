export const swicthCategoriesSlug = (categorySlug: string) => {
  let state = "";

  switch (categorySlug) {
    case "pieces-gyroroues":
      state = "gyroroues";
      break;

    case "pieces-trottinettes":
      state = "trottinettes";
      break;

    case "pieces-velos":
      state = "velos-electriques";
      break;

    case "e-bike-parts":
      state = "velos-electriques";
      break;

    case "scooter-parts":
      state = "trottinettes";
      break;

    case "e-wheel-parts":
      state = "gyroroues";
      break;

    case "e-rad-teile":
      state = "gyroroues";
      break;

    case "fahrradteile":
      state = "velos-electriques";
      break;

    case "rollerteile":
      state = "trottinettes";
      break;

    default:
      state = "";
      break;
  }

  return state;
};
