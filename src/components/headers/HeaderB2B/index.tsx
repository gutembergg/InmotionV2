import Image from "next/image";
import logo from "../../../../public/images/b2bLogo.png";
import SearchBar from "../../SearchBar";
import Cart from "../../Cart";
import { StyledHeader } from "./styles";
import LanguageSelector from "../../LanguageSelector";
import Login from "../../Login";
import CurrencySelector from "../../CurrencySelector";
import Link from "next/dist/client/link";
import MenuB2B from "../../menus/MenuB2B";

const HeaderB2B = () => {
  return (
    <StyledHeader>
      <div className="topBlock">
        <Login />
        <CurrencySelector />
        <LanguageSelector />
      </div>
      <div className="mainBlock">
        <div className="logoBox">
          <Link href="/inmotion-mobility/b2b">
            <a>
              <Image src={logo} alt="logo Inmotion" />
            </a>
          </Link>
        </div>
        <MenuB2B />
        <div className="rightContent">
          <SearchBar />
          <Cart />
        </div>
      </div>
    </StyledHeader>
  );
};
export default HeaderB2B;
