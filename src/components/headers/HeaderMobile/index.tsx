import Image from "next/image";
import { SVGProps, useState } from "react";
import logo from "../../../../public/images/logo-inmotion-black.png";
import SearchBar from "../../SearchBar";
import Cart from "../../Cart";
import { StyledHeader} from "./styles";
import MenuMain from "../../menus/MenuMain";
import FilAriane from "../../FilAriane/FilAriane";
import LanguageSelector from "../../LanguageSelector";

interface ILanguages {}

interface ISvgProps {
  icon: SVGProps<SVGElement>;
}

const HeaderMobile = () => {
  const [loged, setLoged] = useState<boolean>(false);
  const [menuOpen, setmenuOpen] = useState<boolean>(false);


  //menu button click//
  const menuToggle = () => {
    menuOpen === false ? setmenuOpen(true) : setmenuOpen(false);
  };
  return (
    <StyledHeader>
      <div className="topHeader">
        <div className="logoBox">
          <Image src={logo} alt="logo Inmotion" />
        </div>
        <div className="rightContent">
          <SearchBar />
          <Cart />
        </div>
      </div>
      <FilAriane />
      <div className="mobileButton" onClick={menuToggle}>
        <div id="nav-icon2" className={menuOpen === true ? "open" : ""}>
        </div>
      </div>
      <div className={menuOpen === true ? "mainBlock open" : "mainBlock"}>
        <div className="contentBg">
          <div className="bgLeft"></div>
          <div className="bgRight"></div>
          <div className="content">
            <div className="logoBox">
              <Image src={logo} alt="logo Inmotion" />
            </div>
            <div className="slogan">
              <p>Votre spécialiste de la mobilité électrique</p>
            </div>
            <MenuMain />
            <hr />
            {loged ? <p>connecté</p> : <p>se connecter/sinscrire</p>}
            <hr />
            <LanguageSelector/>
          </div>
        </div>
      </div>
    </StyledHeader>
  );
};
export default HeaderMobile;
