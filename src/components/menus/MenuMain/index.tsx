import { useRouter } from "next/router";
import Link from "next/link";

import { MainMenu } from "./styles";
import useTranslation from "next-translate/useTranslation";

const MenuMain = () => {
  const router = useRouter();

  // Traductions texts ///////////////////////////////////
  const { t } = useTranslation();
  const menuHome = t("headerMobility:home");
  const menuShop = t("headerMobility:shop");
  const menuServices = t("headerMobility:services");
  const menuContact = t("headerMobility:contact");
  const eBikes = t("headerMobility:e-bike");
  const eWheel = t("headerMobility:e-wheel");
  const eScooter = t("headerMobility:e-scooter");
  const equipments = t("headerMobility:equipments");
  const detachedPieces = t("headerMobility:detached-pieces");
  const occasions = t("headerMobility:occasions");

  const menu = [
    {
      name: eScooter,
      slug: "trottinettes",
    },
    {
      name: eBikes,
      slug: "velos-electriques",
    },
    {
      name: eWheel,
      slug: "gyroroues",
    },
    {
      name: equipments,
      slug: "equipements",
    },
    {
      name: detachedPieces,
      slug: "pieces-detachees-mobility",
    },
  ];

  return (
    <>
      <MainMenu>
        <li>
          <Link href="/inmotion-mobility">
            <a
              className={
                router.pathname === "/inmotion-mobility" ? "active" : ""
              }
            >
              {menuHome}
            </a>
          </Link>
        </li>
        <li>
          <Link href={`/inmotion-mobility/boutique`}>
            <a className={router.pathname === "/boutique" ? "active" : ""}>
              {menuShop}
            </a>
          </Link>
          <ul>
            {menu.map((category) => {
              return (
                <li key={category.slug}>
                  <Link
                    href={
                      category.slug === "pieces-detachees-mobility"
                        ? `/inmotion-mobility/categorie/${category.slug}`
                        : category.slug === "equipements"
                        ? `/inmotion-mobility/categorie_/${category.slug}`
                        : `/inmotion-mobility/categories/${category.slug}`
                    }
                  >
                    <a
                      className={
                        router.pathname === "/boutique" ? "active" : ""
                      }
                    >
                      {category.name}
                    </a>
                  </Link>
                </li>
              );
            })}
          </ul>
        </li>
        <li>
          <Link href="/inmotion-mobility/produits/occasions">
            <a
              className={
                router.pathname === "/inmotion-mobility/contact" ? "active" : ""
              }
            >
              {occasions}
            </a>
          </Link>
        </li>
        <li>
          <Link href="/inmotion-mobility/services">
            <a
              className={
                router.pathname === "/inmotion-mobility/services"
                  ? "active"
                  : ""
              }
            >
              {menuServices}
            </a>
          </Link>
          <ul>
            <li>
              <Link href="/inmotion-mobility/services/location">
                <a>Locations</a>
              </Link>
            </li>
            <li>
              <Link href="/inmotion-mobility/services/guides-utilisateur">
                <a>Guides utilisateurs</a>
              </Link>
            </li>
            <li>
              <Link href="/inmotion-mobility/services/autorisation-retour">
                <a>Autorisation retour marchandise</a>
              </Link>
            </li>
          </ul>
        </li>
        <li>
          <Link href="/inmotion-mobility/contact">
            <a
              className={
                router.pathname === "/inmotion-mobility/contact" ? "active" : ""
              }
            >
              {menuContact}
            </a>
          </Link>
        </li>
      </MainMenu>
    </>
  );
};
export default MenuMain;
