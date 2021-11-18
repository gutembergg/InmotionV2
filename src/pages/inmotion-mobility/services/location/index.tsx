import type { NextPage } from "next";
import React, { ReactElement } from "react";
import confidentialiteIcon from "../../../../../public/images/icons/confidentialite.svg";
import { Container } from "../../../../components/HomeMainComponent/styles";
import LayoutMobility from "../../../../Layout/LayoutMobility";
import { MainContent } from "../../../../styles/HomeStyles";

export default function ServiceLocation() {
  return (
    <Container>
      <MainContent>
        <p>service location</p>
      </MainContent>
    </Container>
  );
}

ServiceLocation.getLayout = function getLayout(page: ReactElement) {
  return <LayoutMobility icon={confidentialiteIcon}>{page}</LayoutMobility>;
};
