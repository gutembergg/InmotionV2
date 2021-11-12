import { ChangeEvent, DOMAttributes, MouseEventHandler, useState } from "react";
import { StyledLangSelector, StyledLangSelector2 } from "./styles";
// import { ILangState } from "../Context/LanguageContext";
import router, { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

const LanguageSelector = () => {
  const router = useRouter();
  const { pathname, asPath, query } = router;
  //console.log(router)
  // Languages selector //
  const getSelectedLanguage = (e: React.MouseEvent<HTMLDivElement>) => {
    console.log("value",e.currentTarget.id)
    router.push({ pathname, query }, asPath, { locale: e.currentTarget.id });
  };

  return (
    <div>
      {/* <StyledLangSelector
      defaultValue={router.locale}
      onChange={getSelectedLanguage}
    >
      {router.locales?.map((locale) => (
        <option key={locale} value={locale}>
          {locale}
        </option>
      ))}
    </StyledLangSelector> */}
      <StyledLangSelector2>
        <div className="langSelector">
          <div className="langSelectorHeader">
            <b className="langSelectorTitle">
              <div className="langSelectorListNameFlag">
              {/* <Image
                width={250}
                height={250}
                src={product.images[0].src && placeholder.src} 
                alt={product.name}
              /> */}
                <img
                  src="//upload.wikimedia.org/wikipedia/en/thumb/c/c3/Flag_of_France.svg/150px-Flag_of_France.svg.png"
                  alt="Flag of France"
                />
              </div>
              <abbr className="langSelectorListNameLabel" title="Français">
                {router.locale}
              </abbr>
              <i className="fa fa-caret-down" aria-hidden="true"></i>
            </b>
          </div>
          <div className="langSelectorBody">
            <ul className="langSelectorList">
            {router.locales?.map((locale) => (
        <li key={locale} value={locale}>
            <div id={locale} onClick={getSelectedLanguage}>
            {locale}
            </div>
            
        </li>
      ))}
            </ul>
          </div>
        </div>
      </StyledLangSelector2>
    </div>
  );
};
export default LanguageSelector;
