import { useRouter } from "next/router";
import Image from "next/image";
import { MouseEvent, useRef, useState } from "react";
import deflag from "../../../public/images/icons/deflag.svg";
import frflag from "../../../public/images/icons/frflag.svg";
import enflag from "../../../public/images/icons/enflag.svg";
import useCart from "../../hooks/useCart";

import { StyledLangSelector2 } from "./styles";

const LanguageSelector = () => {
  const router = useRouter();
  const { pathname, asPath, query } = router;
  const [openObject, setopenObject] = useState(false);
  const { cart } = useCart();

  const getSelectedLanguage = (e: React.MouseEvent<HTMLDivElement>) => {
    router.push({ pathname, query }, asPath, { locale: e.currentTarget.id });
    setopenObject(!openObject);
  };

  const openLanguage = (event: MouseEvent<HTMLDivElement>) => {
    console.log("Object.keys(car", Object.keys(cart).length);
    if (Object.keys(cart).length > 0) return;
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
                    height={22}
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
