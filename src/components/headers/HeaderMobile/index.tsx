import Image from "next/image";
import { useEffect, useState } from "react";
import logo from "../../../../public/images/logo-inmotion-black.webp";
// import SearchBar from "../../SearchBar";
import Cart from "../../Cart";
import { MobileMobilityHeader, StyledMobileHeader } from "./styles";
import LanguageSelector from "../../LanguageSelector";
import Login from "../../Login";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import CurrencySelector from "../../CurrencySelector";
import SearchBar from "../../SearchBar";

const HeaderMobile = () => {
  const [loged, setLoged] = useState<boolean>(false);
  const [menuOpen, setmenuOpen] = useState<boolean>(false);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    }else{
      document.body.style.overflow = "auto";
    }
  }, [menuOpen])
  
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
  const coursGyro = t("headerMobility:cours");
  const userManuals = t("headerMobility:userManuals");
  const returnForm = t("headerMobility:returnForm");
  const leftTopText = t("headerMobility:leftTopText");

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
    setmenuOpen(false);
  };
  return (
    <StyledMobileHeader>
      <div className="topHeader">
        <div className="logoBox">
          <Image src={logo} alt="logo Inmotion" />
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
              <LanguageSelector />
              <CurrencySelector />
              <SearchBar />
            </div>
              <hr />
            <MobileMobilityHeader>
              <li>
                <p
                  onClick={() => {
                    goToLink("/inmotion-mobility");
                  }}
                >
                  {menuHome}
                </p>
              </li>
            
              <li>
                <p
                  onClick={() => {
                    goToLink("/inmotion-mobility/boutique");
                  }}
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
                              ? goToLink(
                                  `//inmotion-mobility/categories/equipements`
                                )
                              : goToLink(
                                  `/inmotion-mobility/categories/${category.slug}`
                                );
                          }}
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
                      {coursGyro}
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
                        goToLink(
                          "/inmotion-mobility/services/guides-utilisateur"
                        );
                      }}
                    >
                      {userManuals}
                    </p>
                  </li>
                  <li>
                    <p
                      onClick={() => {
                        goToLink(
                          "/inmotion-mobility/services/autorisation-retour"
                        );
                      }}
                    >
                      {returnForm}
                    </p>
                  </li>
                </ul>
              </li>
              <hr />
              <li>
                <p
                  onClick={() => {
                    goToLink("/inmotion-mobility/contact");
                  }}
                >
                  {menuContact}
                </p>
              </li>
              <li>
                <p
                  onClick={() => {
                    goToLink("/inmotion-mobility/conditions-generales");
                  }}
                >
                  {condGenerales}
                </p>
              </li>
              <li>
                <p
                  onClick={() => {
                    goToLink("/inmotion-mobility/politique-confidentialite");
                  }}
                >
                  {confidentiality}
                </p>
              </li>
            </MobileMobilityHeader>
          </div>
        </div>
      </div>
    </StyledMobileHeader>
  );
};
export default HeaderMobile;
