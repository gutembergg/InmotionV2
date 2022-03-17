import { useRouter } from "next/router";
import Image from "next/image";
import { MouseEvent, useState } from "react";
import deflag from "../../../public/images/icons/deflag.svg";
import frflag from "../../../public/images/icons/frflag.svg";
import enflag from "../../../public/images/icons/enflag.svg";
import useCart from "../../hooks/useCart";

import { StyledLangSelector2 } from "./styles";
import Notiflix from "notiflix";
import useTranslation from "next-translate/useTranslation";

interface Props {
  closeMobileMenu?: () => void;
}

const LanguageSelector = ({ closeMobileMenu }: Props) => {
  const router = useRouter();
  const { pathname, asPath, query } = router;
  const [openObject, setopenObject] = useState(false);
  const { cart } = useCart();
  const { t } = useTranslation();
  const LangBlocked = t("common:LangBlocked");
  const notavailable = t("common:notavailable");
  const backToCart = t("headerMobility:backToCart");

  const getSelectedLanguage = (e: React.MouseEvent<HTMLDivElement>) => {
    Notiflix.Loading.init({
      svgColor: "var(--Blue)",
      svgSize: "100px",
      messageColor: "var(--Red)",
      messageFontSize: "17px",
      backgroundColor: "rgba(234, 234, 234, 0.856)",
    });

    const handleStart = () => {
      Notiflix.Loading.standard("Loading...");
    };
    const handleStop = () => {
      Notiflix.Loading.remove();
    };
    handleStart();  
    router.push({ pathname, query }, asPath, { locale: e.currentTarget.id }).then((res) => handleStop());;
    setopenObject(!openObject);
    closeMobileMenu && closeMobileMenu();
  };

  const handleShowDetails = (slug: string) => {

  };

  const openLanguage = (event: MouseEvent<HTMLDivElement>) => {
    if (router?.pathname === "/inmotion-mobility/checkout-mobility") {
      Notiflix.Confirm.show(
        `${notavailable}`,
        `${LangBlocked}`,
        "Ok",
        `${backToCart}`,
        () => {
          return;
        },
        () => {
          router.push("/inmotion-mobility/panier");
        },
        { width: "500px",
        titleColor:"#e40b0b", 
        backOverlay:true, 
        backOverlayColor:"rgba(80, 15, 15, 0.411)",
        okButtonBackground:"#0570A6",
        cancelButtonBackground:"#6797B0"}
      );
      return;
    }
    setopenObject(!openObject);
  };

  return (
    <StyledLangSelector2>
      <div className="langSelector">
        <div className="langSelectorListNameFlag" onClick={openLanguage}>
          <div className="flagImgBox">
            <Image
              width={35}
              height={22}
              src={
                (router.locale === "en" && enflag) ||
                (router.locale === "de" && deflag) ||
                (router.locale === "fr" && frflag)
              }
              alt={router.locale + "flag"}
            />
          </div>
        </div>
        <ul
          className={
            openObject ? "langSelectorList opened" : "langSelectorList"
          }
        >
          {router.locales
            ?.filter((local) => {
              return local !== router.locale;
            })
            .map((locale) => (
              <li key={locale} value={locale}>
                <div id={locale} onClick={getSelectedLanguage}>
                  <Image
                    width={35}
                    height={27}
                    src={
                      (locale === "en" && enflag) ||
                      (locale === "de" && deflag) ||
                      (locale === "fr" && frflag)
                    }
                    alt={locale + "flag"}
                  />
                </div>
              </li>
            ))}
        </ul>
      </div>
    </StyledLangSelector2>
  );
};
export default LanguageSelector;
