import type {  NextPage } from "next";
import servicesIcon from"../../../../public/images/icons/services.svg"
import { LightBackground } from "../../../styles/BackgroundStyle";
import { Container } from "../../../components/HomeMainComponent/styles";
import { MainContent } from "../../../styles/Boutique";
import LayoutMobility from "../../../Layout/LayoutMobility";

const Services: NextPage = () => {
 
  return (
    <LightBackground>
    <LayoutMobility icon={servicesIcon}>
      <Container>
        <MainContent>
          <p>services</p>
        </MainContent>
      </Container>
    </LayoutMobility>
  </LightBackground>
  );
};

export default Services;