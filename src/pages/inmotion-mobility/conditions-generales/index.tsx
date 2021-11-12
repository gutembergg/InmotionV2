import type {  NextPage } from "next";
import conditionIcon from"../../../../public/images/icons/conditionsgen.svg"
import { LightBackground } from "../../../styles/BackgroundStyle";
import { Container } from "../../../components/HomeMainComponent/styles";
import { MainContent } from "../../../styles/HomeStyles";
import LayoutMobility from "../../../Layout/LayoutMobility";

const ConditionsGenerales: NextPage = () => {
 
  return (
    <LightBackground>
      <LayoutMobility icon={conditionIcon}>
        <Container>
          <MainContent>
            <p>conditions générales</p>
          </MainContent>
        </Container>
      </LayoutMobility>
    </LightBackground>
  );
};

export default ConditionsGenerales;