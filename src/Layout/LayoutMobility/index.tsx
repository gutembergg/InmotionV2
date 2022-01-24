import type { ReactNode } from "react";
import Footer from "../../components/Footers/MobilityFooter";
import HeaderComponent from "../../components/headers/HeaderMobility";
import HeaderMobile from "../../components/headers/HeaderMobile";
import { GlobalContainer } from "./styles";
import FooterBlock from "../../components/FooterBlock";


interface Props {
  children: ReactNode;
}

export default function LayoutMobility({ children}: Props) {
  return (
    <GlobalContainer>
      <HeaderComponent />
      <HeaderMobile />
      <div className="location">
      </div>
      <main>{children}</main>
      <FooterBlock />
      <Footer />
    </GlobalContainer>
  );
}
