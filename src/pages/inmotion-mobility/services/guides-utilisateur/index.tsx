import type { NextPage } from "next";
import React, { ReactElement } from "react";
import { Container } from "../../../../components/HomeMainComponent/styles";
import LayoutMobility from "../../../../Layout/LayoutMobility";
import { MainContent } from "../../../../styles/HomeStyles";

export default function GuidesUtilisateur() {
  return (
    <Container>
      <MainContent>
        <p>guide utilisateur</p>
      </MainContent>
    </Container>
  );
}

GuidesUtilisateur.getLayout = function getLayout(page: ReactElement) {
  return <LayoutMobility>{page}</LayoutMobility>;
};
