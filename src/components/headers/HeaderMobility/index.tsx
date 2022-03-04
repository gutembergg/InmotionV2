import Image from "next/image";
import logo from "../../../../public/images/logo-inmotion-black.webp";
import SearchBar from "../../SearchBar";
import Cart from "../../Cart";
import { StyledHeader } from "./styles";
import MenuMain from "../../menus/MenuMain";
import LanguageSelector from "../../LanguageSelector";
import Login from "../../Login";
import CurrencySelector from "../../CurrencySelector";
import Link from "next/dist/client/link";

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
          <Link href="/inmotion-mobility">
            <a>
              <Image src={logo} alt="logo Inmotion" />
            </a>
          </Link>
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
