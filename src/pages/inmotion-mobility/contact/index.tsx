import type {  NextPage } from "next";
import thankIcon from"../../../../public/images/icons/thank-you.svg"
import { LightBackground } from "../../../styles/BackgroundStyle";
import { Container } from "../../../components/HomeMainComponent/styles";
import { MainContent } from "../../../styles/HomeStyles";
import LayoutMobility from "../../../Layout/LayoutMobility";

const Contact: NextPage = () => {
 
  return (
    <LightBackground>
      <LayoutMobility icon={thankIcon}>
        <Container>
          <MainContent>
            <p>contact</p>
          </MainContent>
        </Container>
      </LayoutMobility>
    </LightBackground>
  );
};

export default Contact;