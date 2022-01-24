import { Container } from "../../../components/HomeMainComponent/styles";
import { MainContent } from "../../../styles/HomeStyles";
import thankIcon from "../../../../public/images/icons/thank-you.svg";
import React, { ReactElement } from "react";
import LayoutMobility from "../../../Layout/LayoutMobility";

export default function Attributions() {
  return (
    <Container>
      <MainContent>
        <p>Attribution</p>
      </MainContent>
    </Container>
  );
}

Attributions.getLayout = function getLayout(page: ReactElement) {
  return <LayoutMobility>{page}</LayoutMobility>;
};
