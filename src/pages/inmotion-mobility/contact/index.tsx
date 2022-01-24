import thankIcon from "../../../../public/images/icons/thank-you.svg";
import { Container } from "../../../components/HomeMainComponent/styles";
import { MainContent } from "../../../styles/HomeStyles";
import React, { ReactElement } from "react";
import LayoutMobility from "../../../Layout/LayoutMobility";

export default function Contact() {
  return (
    <Container>
      <MainContent>
        <p>contact</p>
      </MainContent>
    </Container>
  );
}

Contact.getLayout = function getLayout(page: ReactElement) {
  return <LayoutMobility>{page}</LayoutMobility>;
};
