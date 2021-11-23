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
import Link from "next/link";
import printer from "../../../../public/images/icons/printer.svg";
import { LinkPrint } from "../HeaderAdmin/styles";
import useTranslation from "next-translate/useTranslation";

interface Props {
  icon: string;
}

const HeaderComponent = ({ icon }: Props) => {
  const currentPageIconColor: string = "Blue";

  const { t } = useTranslation();
  const menuLeftTopText = t("headerMobility:leftTopText");
  const inmotionPrint = t("headerMobility:inmotion-print");

  return (
    <StyledHeader>
      <div className="topBlock">
        {/* <Link href="/inmotion-print">
          <a>
            <LinkPrint>
              <div className="iconLink">
                <Image width={30} height={30} src={printer.src} alt="photo" />
              </div>
              <p>{inmotionPrint} Inmotion-print</p>
            </LinkPrint>
          </a>
        </Link> */}
        <Login />
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
      <div className="bottomBlock">
        <p>{menuLeftTopText}</p>
        <FilAriane />
        <CurrentPageIcon icon={icon} bgcolor={currentPageIconColor} />
      </div>
    </StyledHeader>
  );
};
export default HeaderComponent;
