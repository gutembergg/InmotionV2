import confidentialiteIcon from "../../../../public/images/icons/confidentialite.svg";
import { Container } from "../../../components/HomeMainComponent/styles";
import { MainContent } from "../../../styles/HomeStyles";
import React, { ReactElement } from "react";
import LayoutMobility from "../../../Layout/LayoutMobility";

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
  return <LayoutMobility>{page}</LayoutMobility>;
};
