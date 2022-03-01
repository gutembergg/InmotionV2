import { useRouter } from "next/router";
import Link from "next/link";
import { MainMenu } from "./styles";
import useTranslation from "next-translate/useTranslation";

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

  const getHref = (slug: string) => {
    let url = `/inmotion-mobility/categories/${slug}`;

    if (slug === "pieces-detachees-mobility") {
      url = `/inmotion-mobility/categories/pieces-detachees`;
    }

    if (slug === "equipements") {
      url = `/inmotion-mobility/categories/equipements`;
    }

    return url;
  };

  
  return (
    <nav>
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
          <Link href="/inmotion-mobility/boutique">
            <a className={router.pathname === "/boutique" ? "active" : ""}>
              {menuShop}
            </a>
          </Link>
          <ul>
            {menu.map((category) => {
              return (
                <li key={category.slug}>
                  <Link href={getHref(category.slug)}>
                    <a className={ router.pathname === "/boutique" ? "active" : "" }>
                      {category.name}
                    </a>
                  </Link>
                </li>
              );
            })}
          </ul>
        </li>
        <li>
          <Link href="/inmotion-mobility/categories/occasions">
            <a className={router.pathname === "/inmotion-mobility/categories/occasions" ? "active" : ""}>
              {occasions}
            </a>
          </Link>
        </li>
        <li>
          <Link href="/inmotion-mobility/services">
            <a className={ router.pathname === "/inmotion-mobility/services" ? "active" : "" }>
              {menuServices}
            </a>
          </Link>
          <ul>
            <li>
              <Link href="/inmotion-mobility/services/cours-gyroroue">
                <a>{cours}</a>
              </Link>
            </li>
            <li>
              <Link href="/inmotion-mobility/services/location">
                <a>{rent}</a>
              </Link>
            </li>
            <li>
              <Link href="/inmotion-mobility/services/guides-utilisateur">
                <a>{userManuals}</a>
              </Link>
            </li>
            <li>
              <Link href="/inmotion-mobility/services/autorisation-retour">
                <a>{returnForm}</a>
              </Link>
            </li>
          </ul>
        </li>
        <li>
          <Link href="/inmotion-mobility/contact">
            <a className={router.pathname === "/inmotion-mobility/contact" ? "active" : ""}>
              {menuContact}
            </a>
          </Link>
        </li>
      </MainMenu>
    </nav>
  );
};
export default MenuMain;
