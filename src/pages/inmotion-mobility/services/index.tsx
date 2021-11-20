import type { NextPage } from "next";
import servicesIcon from "../../../../public/images/icons/services.svg";
import { Container } from "../../../components/HomeMainComponent/styles";
import { MainContent } from "../../../styles/Boutique";
import React, { ReactElement } from "react";
import LayoutMobility from "../../../Layout/LayoutMobility";

export default function Services() {
  return (
    <Container>
      <MainContent>
        <p>services</p>
      </MainContent>
    </Container>
  );
}

Services.getLayout = function getLayout(page: ReactElement) {
  return <LayoutMobility icon={servicesIcon}>{page}</LayoutMobility>;
};
