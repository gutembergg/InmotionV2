import type { ReactNode } from "react";
import Footer from "../../components/Footers/MobilityFooter";
import HeaderComponent from "../../components/headers/HeaderMobility";
import HeaderMobile from "../../components/headers/HeaderMobile";
import { GlobalContainer } from "./styles";
import FooterBlock from "../../components/FooterBlock";
import Image from "next/dist/client/image";
import mainBg from "../../../public/images/backgrounds/lightBackground.jpg";
interface Props {
  children: ReactNode;
}

export default function LayoutMobility({ children }: Props) {
  return (
    <GlobalContainer>
      <div className="bgImage">
        <div>
      <Image
              src={mainBg}
              alt="location de trottinettes,vélos et gyroroues "
              layout="fill"
              objectFit="cover"
              />
              </div>
      </div>
      <div className="content">
        <HeaderComponent />
        <HeaderMobile />
        <div className="location"></div>
        <main>{children}</main>
        <FooterBlock />
        <Footer />
      </div>
    </GlobalContainer>
  );
}
