import Head from "next/head";
import type { ReactNode } from "react";
import HeaderMobile from "../../components/headers/HeaderMobile";
import { GlobalContainer } from "./styles";
import parse from "html-react-parser";
import PrinterFooter from "../../components/Footers/PrinterFooter";
import HeaderPrinter from "../../components/headers/HeaderPrinters";

interface LayoutProps {
  children: ReactNode;
  icon: string;
  yoast_head?: string;
}

export default function Layout3DPrinter({ children, icon, yoast_head }: LayoutProps) {
  const fullHead = yoast_head && parse(yoast_head);

  return (
    <GlobalContainer>
      <Head>{fullHead}</Head>
      <HeaderPrinter icon={icon} />
      <HeaderMobile />
      <main>{children}</main>
      <PrinterFooter />
    </GlobalContainer>
  );
}
