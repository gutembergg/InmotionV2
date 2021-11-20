import conditionIcon from "../../../../public/images/icons/conditionsgen.svg";
import { MainContent } from "../../../styles/HomeStyles";
import React, { ReactElement } from "react";
import LayoutMobility from "../../../Layout/LayoutMobility";

import { Container } from "../../../components/HomeMainComponent/styles";

export default function ConditionsGenerales() {
  return (
    <Container>
      <MainContent>
        <p>conditions générales</p>
      </MainContent>
    </Container>
  );
}

ConditionsGenerales.getLayout = function getLayout(page: ReactElement) {
  return <LayoutMobility icon={conditionIcon}>{page}</LayoutMobility>;
};
