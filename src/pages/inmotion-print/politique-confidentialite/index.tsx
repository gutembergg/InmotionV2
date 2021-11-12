import type {  NextPage } from "next";
import confidentialiteIcon from"../../../../public/images/icons/confidentialite.svg"
import { Container } from "../../../components/HomeMainComponent/styles";
import { LightBackground } from "../../../styles/BackgroundStyle";
import { MainContent } from "../../../styles/HomeStyles";
import Layout3DPrinter from "../../../Layout/Layout3DPrinter";

const PolitiqueConfidentialite: NextPage = () => {
 
  return (
    <LightBackground>
      <Layout3DPrinter icon={confidentialiteIcon}>
        <Container>
          <MainContent>
            <p>Politique de confidentialité</p>
          </MainContent>
        </Container>
      </Layout3DPrinter>
    </LightBackground>
  );
};

export default PolitiqueConfidentialite;