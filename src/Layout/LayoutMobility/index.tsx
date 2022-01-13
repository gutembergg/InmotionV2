import Image from "next/image";
import type { ReactNode } from "react";
import Footer from "../../components/Footers/MobilityFooter";
import HeaderComponent from "../../components/headers/HeaderMobility";
import HeaderMobile from "../../components/headers/HeaderMobile";
import { GlobalContainer } from "./styles";
import { IProduct } from "../../interfaces/IProducts";
import FooterBlock from "../../components/FooterBlock";
import FilAriane from "../../components/FilAriane/FilAriane";
import CurrentPageIcon from "../../components/CurrentPageIcon";
//import mainBg from "../../../public/images/backgrounds/MainBackground.jpg";

interface Props {
  children: ReactNode;
  icon: string;
  products?: IProduct[];
}

export default function LayoutMobility({ children, icon, products }: Props) {
  return (
    <GlobalContainer>
      {/* <div className="bg_image">
        {" "}
        <Image
          alt="Mountains"
          src={mainBg}
          layout="fill"
          objectFit="cover"
          quality={100}
        />
      </div> */}

      <HeaderComponent icon={icon} />
      <HeaderMobile />
      <div className="location">
      <FilAriane />
      <CurrentPageIcon icon={icon} />
      </div>
      <main>{children}</main>
      <FooterBlock />
      <Footer />
    </GlobalContainer>
  );
}
