import HomeIcon from "../../../../../public/images/icons/house.svg";
import { Container, MainContent } from "../../../../styles/HomeStyles";
import React, { ReactElement } from "react";
import Layout3DPrinter from "../../../../Layout/Layout3DPrinter";

export default function ServicesModelisation() {
  return (
    <Container>
      <MainContent>page MODELISATION 3D section print</MainContent>
    </Container>
  );
}

ServicesModelisation.getLayout = function getLayout(page: ReactElement) {
  return <Layout3DPrinter>{page}</Layout3DPrinter>;
};
