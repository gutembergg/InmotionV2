import type {  NextPage } from "next";
import thankIcon from"../../../../public/images/icons/thank-you.svg"
import { LightBackground } from "../../../styles/BackgroundStyle";
import { Container } from "../../../components/HomeMainComponent/styles";
import { MainContent } from "../../../styles/HomeStyles";
import Layout3DPrinter from "../../../Layout/Layout3DPrinter";

const Contact: NextPage = () => {
 
  return (
    <LightBackground>

      <Layout3DPrinter icon={thankIcon}>
        <Container>
          <MainContent>
            <p>contact Print</p>
          </MainContent>
        </Container>
      </Layout3DPrinter>
    </LightBackground>
  );
};

export default Contact;