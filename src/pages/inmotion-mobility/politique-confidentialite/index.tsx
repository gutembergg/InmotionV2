import type {  NextPage } from "next";
import confidentialiteIcon from"../../../../public/images/icons/confidentialite.svg"
import { Container } from "../../../components/HomeMainComponent/styles";
import { LightBackground } from "../../../styles/BackgroundStyle";
import { MainContent } from "../../../styles/HomeStyles";
import LayoutMobility from "../../../Layout/LayoutMobility";

const PolitiqueConfidentialite: NextPage = () => {
 
  return (
    <LightBackground>
      <LayoutMobility icon={confidentialiteIcon}>
        <Container>
          <MainContent>
            <p>Politique de confidentialité</p>
          </MainContent>
        </Container>
      </LayoutMobility>
    </LightBackground>
  );
};

export default PolitiqueConfidentialite;