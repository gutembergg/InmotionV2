import type {  NextPage } from "next";
import confidentialiteIcon from"../../../../../public/images/icons/confidentialite.svg"
import { Container } from "../../../../components/HomeMainComponent/styles";
import LayoutMobility from "../../../../Layout/LayoutMobility";
import { LightBackground } from "../../../../styles/BackgroundStyle";
import { MainContent } from "../../../../styles/HomeStyles";

const ServiceLocation: NextPage = () => {
 
  return (
    <LightBackground>
      <LayoutMobility icon={confidentialiteIcon}>
        <Container>
          <MainContent>
            <p>service location</p>
          </MainContent>
        </Container>
      </LayoutMobility>
    </LightBackground>
  );
};

export default ServiceLocation;