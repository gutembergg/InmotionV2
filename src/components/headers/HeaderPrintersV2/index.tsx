import Image from "next/image";
import { SVGProps, useState } from "react";
import logo from "../../../../public/images/logo-blue.webp";
import SearchBar from "../../SearchBar";
import Cart from "../../Cart";
import { StyledHeader } from "./styles";
import LanguageSelector from "../../LanguageSelector";
import MenuMainPrinter from "../../menus/MenuMainPrinter";
import LoginForm from "../../Login";
import Link from "next/link";
import escooter from "../../../../public/images/icons/electric-scooter.svg";

/* interface ISvgProps {
  icon: SVGProps<SVGElement>;
} */

interface Props {
  icon?: any;
}

const HeaderPrinterV2 = ({ icon }: Props) => {
  const [loged, setLoged] = useState("");

  return (
    <StyledHeader>
      <div className="topBlock">
        <Link href="/inmotion-mobility">
          <a>
          </a>
        </Link>
        <LoginForm />
        <LanguageSelector />
      </div>

      <div className="mainBlock">
        <div className="logoBox">
          <Image src={logo} alt="logo Inmotion" />
        </div>
        <MenuMainPrinter />
        <div className="rightContent">
          <SearchBar />
          <Cart />
        </div>
      </div>
      <div className="bottomBlock">
        <p>Votre spécialiste en impression 3D & Filaments</p>
      </div>
    </StyledHeader>
  );
};
export default HeaderPrinterV2;
