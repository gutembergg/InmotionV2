import type { ReactNode } from "react";
import Footer from "../../components/Footers/MobilityFooter";
import { GlobalContainer } from "./styles";
import FooterBlock from "../../components/FooterBlock";
import Image from "next/dist/client/image";
import mainBg from "../../../public/images/backgrounds/lightBackground.webp";
import HeaderB2B from "../../components/headers/HeaderB2B";
import HeaderB2BMobile from "../../components/headers/HeaderB2BMobile";
interface Props {
  children: ReactNode;
}

export default function LayoutB2B({ children }: Props) {
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
        <HeaderB2B />
        <HeaderB2BMobile />
        <div className="location"></div>
        <main>{children}</main>
        <FooterBlock />
        <Footer />
      </div>
    </GlobalContainer>
  );
}
