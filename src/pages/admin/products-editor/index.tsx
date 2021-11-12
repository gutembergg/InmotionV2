import type {  NextPage } from "next";
import { LightBackground } from "../../../styles/BackgroundStyle";
import { Container } from "../../../components/HomeMainComponent/styles";
import { MainContent } from "../../../styles/HomeStyles";
import LayoutAdmin from "../../../Layout/LayoutAdmin";

const ProductEditor: NextPage = () => {
 
  return (
    <LightBackground>
      <LayoutAdmin>
        <Container>
          <MainContent>
            <p>list all products. add link to wordpress for editing</p>
          </MainContent>
        </Container>
      </LayoutAdmin>
    </LightBackground>
  );
};

export default ProductEditor;