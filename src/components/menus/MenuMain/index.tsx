import { useRouter } from "next/router";
import Link from "next/link";

import { MainMenu } from "./styles";
import useTranslation from "next-translate/useTranslation";
import { MouseEventHandler } from "react";

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

  const goToLink = (linkUrl: string) => {
    router.push(linkUrl);
  };
  return (
      <MainMenu>
        <li>
            <p
              onClick={() => {
                goToLink("/inmotion-mobility");
              }}
              className={
                router.pathname === "/inmotion-mobility" ? "active" : ""
              }
            >
              {menuHome}
            </p>
        </li>
        <li>
          <p
            onClick={() => {
              goToLink("/inmotion-mobility/boutique");
            }}
            className={router.pathname === "/boutique" ? "active" : ""}
          >
            {menuShop}
          </p>
          <ul>
            {menu.map((category) => {
              return (
                <li key={category.slug}>
                  <p
                    onClick={() => {
                      category.slug === "pieces-detachees-mobility"
                        ? goToLink(
                            `/inmotion-mobility/categorie/${category.slug}`
                          )
                        : category.slug === "equipements"
                        ? goToLink(
                            `/inmotion-mobility/categorie_/${category.slug}`
                          )
                        : goToLink(
                            `/inmotion-mobility/categories/${category.slug}`
                          );
                    }}
                    className={router.pathname === "/boutique" ? "active" : ""}
                  >
                    {category.name}
                  </p>
                </li>
              );
            })}
          </ul>
        </li>
        <li>
          <p
            onClick={() => {
              goToLink("/inmotion-mobility/produits/occasions");
            }}
            className={
              router.pathname === "/inmotion-mobility/produits/occasions" ? "active" : ""
            }
          >
            {occasions}
          </p>
        </li>
        <li>
          <p
            onClick={() => {
              goToLink("/inmotion-mobility/services");
            }}
            className={
              router.pathname === "/inmotion-mobility/services" ? "active" : ""
            }
          >
            {menuServices}
          </p>
          <ul>
            <li>
              <p
                onClick={() => {
                  goToLink("/inmotion-mobility/services/location");
                }}
              >
                Locations
              </p>
            </li>
            <li>
              <p
                onClick={() => {
                  goToLink("/inmotion-mobility/services/guides-utilisateur");
                }}
              >
                Guides utilisateurs
              </p>
            </li>
            <li>
              <p
                onClick={() => {
                  goToLink("/inmotion-mobility/services/autorisation-retour");
                }}
              >
                Autorisation retour marchandise
              </p>
            </li>
          </ul>
        </li>
        <li>
          <p
            onClick={() => {
              goToLink("/inmotion-mobility/contact");
            }}
            className={
              router.pathname === "/inmotion-mobility/contact" ? "active" : ""
            }
          >
            {menuContact}
          </p>
        </li>
      </MainMenu>

  );
};
export default MenuMain;
