import React, { ReactElement } from "react";
import conditionIcon from "../../../../public/images/icons/conditionsgen.svg";
import { Container } from "../../../components/HomeMainComponent/styles";
import Layout3DPrinter from "../../../Layout/Layout3DPrinter";
import { MainContent } from "../../../styles/HomeStyles";

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
  return <Layout3DPrinter>{page}</Layout3DPrinter>;
};
