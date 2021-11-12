import type {  NextPage } from "next";
import conditionIcon from"../../../../public/images/icons/conditionsgen.svg"
import { LightBackground } from "../../../styles/BackgroundStyle";
import { Container } from "../../../components/HomeMainComponent/styles";
import { MainContent } from "../../../styles/HomeStyles";
import Layout3DPrinter from "../../../Layout/Layout3DPrinter";

const ConditionsGenerales: NextPage = () => {
 
  return (
    <LightBackground>
      <Layout3DPrinter icon={conditionIcon}>
        <Container>
          <MainContent>
            <p>conditions générales</p>
          </MainContent>
        </Container>
      </Layout3DPrinter>
    </LightBackground>
  );
};

export default ConditionsGenerales;