import Head from "next/head";
import type { ReactNode } from "react";
import Footer from "../../components/Footers/MobilityFooter";
import HeaderComponent from "../../components/headers/HeaderMobility";
import HeaderMobile from "../../components/headers/HeaderMobile";
import { GlobalContainer } from "./styles";
import parse from "html-react-parser";
import HeaderAdmin from "../../components/headers/HeaderAdmin";

interface LayoutProps {
  children: ReactNode;
  yoast_head?: string;
}

export default function LayoutAdmin({ children, yoast_head }: LayoutProps) {
  const fullHead = yoast_head && parse(yoast_head);

  return (
    <GlobalContainer>
      <Head>{fullHead}</Head>
      <HeaderAdmin />
      <HeaderMobile />
      <main>{children}</main>
      <Footer />
    </GlobalContainer>
  );
}
