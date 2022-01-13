import Image from "next/image";
import logo from "../../../../public/images/logo-inmotion-black.png";
import SearchBar from "../../SearchBar";
import Cart from "../../Cart";
import { StyledHeader } from "./styles";
import MenuMain from "../../menus/MenuMain";
import FilAriane from "../../FilAriane/FilAriane";
import CurrentPageIcon from "../../CurrentPageIcon";
import LanguageSelector from "../../LanguageSelector";
import Login from "../../Login";
import useTranslation from "next-translate/useTranslation";
import CurrencySelector from "../../CurrencySelector";

interface Props {
  icon: string;
}

const HeaderComponent = ({ icon }: Props) => {
  const currentPageIconColor: string = "Blue";

  const { t } = useTranslation();
  const menuLeftTopText = t("headerMobility:leftTopText");

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
        {/* <CurrentPageIcon icon={icon} bgcolor={currentPageIconColor} /> */}
        </div>
      </div>
      {/* <div className="bottomBlock">
        <p>{menuLeftTopText}</p>
        <FilAriane />
      </div> */}
    </StyledHeader>
  );
};
export default HeaderComponent;
