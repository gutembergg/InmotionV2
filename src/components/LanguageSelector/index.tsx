import {  StyledLangSelector2 } from "./styles";
import { useRouter } from "next/router";
import Image from "next/image";
import deflag from "../../../public/images/icons/deflag.svg";
import frflag from "../../../public/images/icons/frflag.svg";
import enflag from "../../../public/images/icons/enflag.svg";


const LanguageSelector = () => {
  const router = useRouter();
  const { pathname, asPath, query } = router;


  const getSelectedLanguage = (e: React.MouseEvent<HTMLDivElement>) => {
    console.log("value", e.currentTarget.id);
    router.push({ pathname, query }, asPath, { locale: e.currentTarget.id });
  };

  return (
    <StyledLangSelector2>
      <div className="langSelector">
        <div className="langSelectorListNameFlag">
          <div className="flagImgBox">
            <Image
              width={40}
              height={27}
              src={
                (router.locale === "en" && enflag) ||
                (router.locale === "de" && deflag) ||
                (router.locale === "fr" && frflag)
              }
              alt={router.locale + "flag"}
            />
            </div>
          <p>
            <span>
              &#9662;
              </span>
          </p>
        </div>
        <ul className="langSelectorList">
          {router.locales?.filter((local) => { return local !== router.locale }).map((locale) => (
            <li key={locale} value={locale}>
              <div id={locale} onClick={getSelectedLanguage}>
                <Image
                  width={40}
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
