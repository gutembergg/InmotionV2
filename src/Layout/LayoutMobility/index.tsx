import Image from "next/image";
import type { ReactNode } from "react";
import Footer from "../../components/Footers/MobilityFooter";
import HeaderComponent from "../../components/headers/HeaderMobility";
import HeaderMobile from "../../components/headers/HeaderMobile";
import { GlobalContainer } from "./styles";
//import mainBg from "../../../public/images/backgrounds/MainBackground.jpg";

interface Props {
  children: ReactNode;
  icon?: any;
}

export default function LayoutMobility({ children, icon }: Props) {
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

      <main>{children}</main>
      <Footer />
    </GlobalContainer>
  );
}
