import type { NextPage } from "next";
import confidentialiteIcon from "../../../../public/images/icons/confidentialite.svg";
import { Container } from "../../../components/HomeMainComponent/styles";
import { MainContent } from "../../../styles/HomeStyles";
import React, { ReactElement } from "react";
import Layout3DPrinter from "../../../Layout/Layout3DPrinter";

export default function PolitiqueConfidentialite() {
  return (
    <Container>
      <MainContent>
        <p>Politique de confidentialité</p>
      </MainContent>
    </Container>
  );
}

PolitiqueConfidentialite.getLayout = function getLayout(page: ReactElement) {
  return <Layout3DPrinter>{page}</Layout3DPrinter>;
};
