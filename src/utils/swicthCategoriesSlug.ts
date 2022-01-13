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
      state = "e-bike";
      break;

    case "scooter-parts":
      state = "e-scooter";
      break;

    case "e-wheel-parts":
      state = "e-wheel";
      break;

    case "e-rad-teile":
      state = "e-rad";
      break;

    case "fahrradteile":
      state = "e-fahrrad";
      break;

    case "rollerteile":
      state = "elektroroller";
      break;

    default:
      state = "";
      break;
  }

  return state;
};
