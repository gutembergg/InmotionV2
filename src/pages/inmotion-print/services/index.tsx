import HomeIcon from "../../../../public/images/icons/house.svg";
import { Container, MainContent } from "../../../styles/HomeStyles";
import React, { ReactElement } from "react";
import Layout3DPrinter from "../../../Layout/Layout3DPrinter";

export default function ServicesPrint() {
  return (
    <Container>
      <MainContent>page Services section print</MainContent>
    </Container>
  );
}

ServicesPrint.getLayout = function getLayout(page: ReactElement) {
  return <Layout3DPrinter>{page}</Layout3DPrinter>;
};
