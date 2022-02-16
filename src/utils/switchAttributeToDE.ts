export const switchAttributesToDE = (attribute: string) => {
  let state = "";

  switch (attribute) {
    case "Autonomie	":
      state = "Autonomie";
      break;

    case "autorisation circulation":
      state = "Verkehrsgenehmigung";
      break;

    case "Batterie":
      state = "Batterie";
      break;

    case "Charge maximale":
      state = "Maximale Belastung";
      break;

    case "Inclinaison maximale":
      state = "Maximale Neigung";
      break;

    case "Moteur":
      state = "Motor";
      break;

    case "Taille pneu":
      state = "Reifengröße";
      break;

    case "Temps de recharge":
      state = "Zeit zum Aufladen";
      break;

    case "Type de pneu":
      state = "Reifentyp";
      break;

      case "Type de batterie":
      state = "Batterietyp";
      break;

    case "Vitesse":
      state = "Geschwindigkeit";
      break;

    case "Couleur":
      state = "Farbe";
      break;

    case "Taille(accessoires)":
      state = "Größe(Zubehör)";
      break;

    case "Taille(vêtements)":
      state = "Größe(Kleidung)";
      break;

    default:
      state = `${attribute}`;
      break;
  }

  return state;
};
