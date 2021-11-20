import React, { ReactElement } from "react";
import thankIcon from "../../../../public/images/icons/thank-you.svg";
import { Container } from "../../../components/HomeMainComponent/styles";
import Layout3DPrinter from "../../../Layout/Layout3DPrinter";
import { MainContent } from "../../../styles/HomeStyles";

export default function Contact() {
  return (
    <Container>
      <MainContent>
        <p>contact Print</p>
      </MainContent>
    </Container>
  );
}

Contact.getLayout = function getLayout(page: ReactElement) {
  return <Layout3DPrinter>{page}</Layout3DPrinter>;
};
