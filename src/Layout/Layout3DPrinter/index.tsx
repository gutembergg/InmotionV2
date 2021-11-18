import Head from "next/head";
import type { ReactNode } from "react";
import HeaderMobile from "../../components/headers/HeaderMobile";
import { GlobalContainer } from "./styles";
import parse from "html-react-parser";
import PrinterFooter from "../../components/Footers/PrinterFooter";
import HeaderPrinter from "../../components/headers/HeaderPrinters";
import React from "react";
import HeaderPrinterV2 from "../../components/headers/HeaderPrintersV2";

interface LayoutProps {
  children: ReactNode;
  icon?: any;
}

export default function Layout3DPrinter({ children, icon }: LayoutProps) {
  return (
    <GlobalContainer>
      <HeaderPrinterV2 />
      <HeaderMobile />
      <main>{children}</main>
      <PrinterFooter />
    </GlobalContainer>
  );
}
