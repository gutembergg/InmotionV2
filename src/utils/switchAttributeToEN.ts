export const switchAttributesToEN = (attribute: string) => {
  let state = "";

  switch (attribute) {
    case "Autonomie":
      state = "Autonomy";
      break;

    case "autorisation circulation":
      state = "circulation authorization";
      break;

    case "Batterie":
      state = "Battery";
      break;

    case "Charge maximale":
      state = "Maximum load";
      break;

    case "Inclinaison maximale":
      state = "Maximum inclination";
      break;

    case "Moteur":
      state = "Engine";
      break;

    case "Taille pneu":
      state = "Tire size";
      break;

    case "Temps de recharge":
      state = "Recharge time";
      break;

    case "Type de pneu":
      state = "Type of tire";
      break;

      case "Type de batterie":
      state = "Type of battery";
      break;

    case "Vitesse":
      state = "Speed";
      break;

    case "Couleur":
      state = "Color";
      break;

    case "Taille(accessoires)":
      state = "Size(accessories)";
      break;

    case "Taille(vêtements)":
      state = "Size(clothing)";
      break;

    default:
      state = `${attribute}`;
      break;
  }

  return state;
};
