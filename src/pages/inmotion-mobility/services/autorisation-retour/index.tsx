import React, { ReactElement } from "react";
import confidentialiteIcon from "../../../../../public/images/icons/confidentialite.svg";
import { Container } from "../../../../components/HomeMainComponent/styles";
import LayoutMobility from "../../../../Layout/LayoutMobility";
import { MainContent } from "../../../../styles/HomeStyles";

export default function AutorisationRetour() {
  return (
    <Container>
      <MainContent>
        <p>retour marchandise</p>
      </MainContent>
    </Container>
  );
}

AutorisationRetour.getLayout = function getLayout(page: ReactElement) {
  return <LayoutMobility icon={confidentialiteIcon}>{page}</LayoutMobility>;
};
