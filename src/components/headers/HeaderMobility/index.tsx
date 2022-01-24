import Image from "next/image";
import logo from "../../../../public/images/logo-inmotion-black.png";
import SearchBar from "../../SearchBar";
import Cart from "../../Cart";
import { StyledHeader } from "./styles";
import MenuMain from "../../menus/MenuMain";
import LanguageSelector from "../../LanguageSelector";
import Login from "../../Login";
import CurrencySelector from "../../CurrencySelector";



const HeaderComponent = () => {

  return (
    <StyledHeader>
      <div className="topBlock">
        <Login />
        <CurrencySelector />
        <LanguageSelector />
      </div>

      <div className="mainBlock">
        <div className="logoBox">
          <Image src={logo} alt="logo Inmotion" />
        </div>
        <MenuMain />
        <div className="rightContent">
          <SearchBar />
          <Cart />
        </div>
      </div>
    </StyledHeader>
  );
};
export default HeaderComponent;
