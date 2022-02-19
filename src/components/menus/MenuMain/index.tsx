import { useRouter } from "next/router";
import Link from "next/link";

import { MainMenu } from "./styles";
import useTranslation from "next-translate/useTranslation";
import { MouseEventHandler } from "react";

const MenuMain = () => {
  const router = useRouter();

  // Traductions texts ///////////////////////////////////
  const { t } = useTranslation();
  const menuHome = t(
    "headerMobility:home",
    { count: 1 },
    {
      fallback: "Home",
    }
  );
  const menuShop = t(
    "headerMobility:shop",
    { count: 1 },
    {
      fallback: "Shop",
    }
  );
  const menuServices = t(
    "headerMobility:services",
    { count: 1 },
    {
      fallback: "Services",
    }
  );
  const menuContact = t(
    "headerMobility:contact",
    { count: 1 },
    {
      fallback: "Contact",
    }
  );
  const occasions = t(
    "headerMobility:occasions",
    { count: 1 },
    {
      fallback: "Bargain",
    }
  );
  const eBikes = t("headerMobility:e-bike");
  const eWheel = t("headerMobility:e-wheel");
  const eScooter = t("headerMobility:e-scooter");
  const equipments = t("headerMobility:equipments");
  const detachedPieces = t("headerMobility:detached-pieces");
  const rent = t("headerMobility:rent");
  const cours = t("headerMobility:cours");
  const userManuals = t("headerMobility:userManuals");
  const returnForm = t("headerMobility:returnForm");
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
          className={router.pathname === "/inmotion-mobility" ? "active" : ""}
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
                          `/inmotion-mobility/categories/pieces-detachees`
                        )
                      : category.slug === "equipements"
                      ? goToLink(`/inmotion-mobility/categories/equipements`)
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
            router.pathname === "/inmotion-mobility/produits/occasions"
              ? "active"
              : ""
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
                goToLink("/inmotion-mobility/services/cours-gyroroue");
              }}
            >
              {cours}
            </p>
          </li>
          <li>
            <p
              onClick={() => {
                goToLink("/inmotion-mobility/services/location");
              }}
            >
              {rent}
            </p>
          </li>
          <li>
            <p
              onClick={() => {
                goToLink("/inmotion-mobility/services/guides-utilisateur");
              }}
            >
              {userManuals}
            </p>
          </li>
          <li>
            <p
              onClick={() => {
                goToLink("/inmotion-mobility/services/autorisation-retour");
              }}
            >
              {returnForm}
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
