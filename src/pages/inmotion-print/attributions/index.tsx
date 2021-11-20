import thankIcon from "../../../../public/images/icons/thank-you.svg";
import { Container } from "../../../components/HomeMainComponent/styles";
import { MainContent } from "../../../styles/HomeStyles";
import React, { ReactElement } from "react";
import Layout3DPrinter from "../../../Layout/Layout3DPrinter";

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
  return <Layout3DPrinter>{page}</Layout3DPrinter>;
};
