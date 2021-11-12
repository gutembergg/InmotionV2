import Head from "next/head";
import type { ReactNode } from "react";
import Footer from "../../components/Footers/MobilityFooter";
import HeaderComponent from "../../components/headers/HeaderMobility";
import HeaderMobile from "../../components/headers/HeaderMobile";
import { GlobalContainer } from "./styles";
import parse from "html-react-parser";

interface LayoutProps {
  children: ReactNode;
  icon: string;
  yoast_head?: string;
}

export default function LayoutMobility({
  children,
  icon,
  yoast_head,
}: LayoutProps) {
  const fullHead = yoast_head && parse(yoast_head);

  return (
    <GlobalContainer>
      <Head>{fullHead}</Head>
      <HeaderComponent icon={icon} />
      <HeaderMobile />
      <main>{children}</main>
      <Footer />
    </GlobalContainer>
  );
}
