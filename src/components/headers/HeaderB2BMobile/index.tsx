import Image from "next/image";
import { useEffect, useState } from "react";
import logo from "../../../../public/images/b2bLogo.png";
import Cart from "../../Cart";
import { MobileMobilityHeader, StyledMobileHeader } from "./styles";
import LanguageSelector from "../../LanguageSelector";
import Login from "../../Login";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import CurrencySelector from "../../CurrencySelector";
import BgHeader from "../../../../public/images/homeMobility/HeadHomeBg.webp";
import Link from "next/link";
import { FiSearch } from "react-icons/fi";
import { Container } from "../../SearchBar/styles";
const HeaderB2BMobile = () => {
  const [menuOpen, setmenuOpen] = useState<boolean>(false);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [menuOpen]);

  //menu button click//
  const menuToggle = () => {
    menuOpen === false ? setmenuOpen(true) : setmenuOpen(false);
  };
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
  const condGenerales = t("headerMobility:condGenerales");
  const confidentiality = t("headerMobility:confidentiality");
  const rent = t("headerMobility:rent");
  const userManuals = t("headerMobility:userManuals");
  const returnForm = t("headerMobility:returnForm");
  const cours = t("headerMobility:cours");

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

  const closeMobileMenu = () => {
    setmenuOpen(false);
  };

  return (
    <StyledMobileHeader>
      <div className="topHeader">
        <div className="logoBox">
          <Link href="/inmotion-mobility/b2b">
            <a>
              <Image src={logo} alt="logo Inmotion" />
            </a>
          </Link>
        </div>
        <div className="rightContent">
          <Login />
          <Cart />
        </div>
      </div>
      <div className="mobileButton" onClick={menuToggle}>
        <div id="nav-icon2" className={menuOpen === true ? "open" : ""}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div className={menuOpen === true ? "mainBlock open" : "mainBlock"}>
        <div className="backgroundMobile">
          <Image
            src={BgHeader.src}
            alt="corporate"
            layout="fill"
            objectFit="cover"
            priority
          />
        </div>
        <div className="contentBg">
          <div className="content">
            <div className="logoBox">
              <Image
                src={logo}
                alt="logo Inmotion"
                layout="fill"
                objectFit="contain"
              />
            </div>
            <div className="slogan">
              <hr />
            </div>
            <div className="settings">
              <LanguageSelector closeMobileMenu={closeMobileMenu} />
              <CurrencySelector closeMobileMenu={closeMobileMenu} />
              <Container>
                <Link href="/inmotion-mobility/search">
                  <a onClick={() => setmenuOpen(false)}>
                    <div className="searchICon">
                      <FiSearch />
                    </div>
                  </a>
                </Link>
              </Container>
            </div>
            <hr />
            <MobileMobilityHeader>
              <ul>
                <li>
                  <Link href="/inmotion-mobility/b2b">
                    <a
                      onClick={() => menuToggle()}
                      className={
                        router.pathname === "/inmotion-mobility/b2b"
                          ? "active"
                          : ""
                      }
                    >
                      {menuHome}
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/inmotion-mobility/boutique">
                    <a
                      onClick={() => menuToggle()}
                      className={
                        router.pathname === "/boutique" ? "active" : ""
                      }
                    >
                      {menuShop}
                    </a>
                  </Link>
                  <ul>
                    {menu.map((category) => {
                      return (
                        <li key={category.slug}>
                          <Link href={getHref(category.slug)}>
                            <a
                              onClick={() => menuToggle()}
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
                  <Link href="/inmotion-mobility/services">
                    <a
                      onClick={() => menuToggle()}
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
                      <Link href="/inmotion-mobility/services/guides-utilisateur">
                        <a onClick={() => menuToggle()}>{userManuals}</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/inmotion-mobility/services/autorisation-retour">
                        <a onClick={() => menuToggle()}>{returnForm}</a>
                      </Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link href="/inmotion-mobility/contact">
                    <a
                      onClick={() => menuToggle()}
                      className={
                        router.pathname === "/inmotion-mobility/contact"
                          ? "active"
                          : ""
                      }
                    >
                      {menuContact}
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/inmotion-mobility/conditions-generales">
                    <a
                      onClick={() => menuToggle()}
                      className={
                        router.pathname ===
                        "/inmotion-mobility/conditions-generales"
                          ? "active"
                          : ""
                      }
                    >
                      {condGenerales}
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/inmotion-mobility/politique-confidentialite">
                    <a
                      onClick={() => menuToggle()}
                      className={
                        router.pathname ===
                        "/inmotion-mobility/politique-confidentialite"
                          ? "active"
                          : ""
                      }
                    >
                      {confidentiality}
                    </a>
                  </Link>
                </li>
              </ul>
            </MobileMobilityHeader>
          </div>
        </div>
      </div>
    </StyledMobileHeader>
  );
};
export default HeaderB2BMobile;
