import Image from "next/image";
import { SVGProps, useState } from "react";
import logo from "../../../../public/images/logo-admin.png";
import SearchBar from "../../SearchBar";
import { LinkMobility, LinkPrint, StyledHeader} from "./styles";
import LanguageSelector from "../../LanguageSelector";
import MenuMainAdmin from "../../menus/MenuMainAdmin";
import LoginForm from "../../Login";
import Link from "next/link";
import escooter from "../../../../public/images/icons/electric-scooter.svg"
import printer from "../../../../public/images/icons/printer.svg"
interface ILanguages {}

interface ISvgProps {
  icon: SVGProps<SVGElement>;
}

const HeaderAdmin = () => {
  const [loged, setLoged] = useState("");


  return (
    <StyledHeader>
      <div className="topBlock">
        <Link href="/inmotion-mobility">
          <a>
          <LinkMobility>
          <div className="iconLink">
            <Image width={30} height={30} layout="intrinsic" src={escooter.src}></Image>
          </div>
            <p>Inmotion-Mobility</p>
          </LinkMobility>
          </a>
        </Link>
        <Link href="/inmotion-print">
          <a>
          <LinkPrint>
          <div className="iconLink">
            <Image width={30} height={30} src={printer.src}></Image>
          </div>
            <p>Inmotion-print</p>
          </LinkPrint>
          </a>
        </Link>
        <LoginForm />
        <LanguageSelector/>
      </div>

      <div className="mainBlock">
        <div className="logoBox">
          <Image src={logo} alt="logo Inmotion" />
        </div>
        <MenuMainAdmin />
        <div className="rightContent">
        <SearchBar />
        </div>
      </div>

    </StyledHeader>
  );
};
export default HeaderAdmin;
