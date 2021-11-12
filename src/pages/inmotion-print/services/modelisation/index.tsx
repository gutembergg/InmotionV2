import HomeIcon from "../../../../../public/images/icons/house.svg";
import type { NextPage } from "next";
import { ICategories } from "../../../../interfaces/ICategories";
import { Container, MainContent } from "../../../../styles/HomeStyles";
import { LightBackground } from "../../../../styles/BackgroundStyle";
import Layout3DPrinter from "../../../../Layout/Layout3DPrinter";


export interface IProducts {
  categories: ICategories[];
  menu_order: ICategories[];
}

const ServicesModelisation: NextPage<IProducts> = () => {


  return (
    <LightBackground>
      <Layout3DPrinter icon={HomeIcon}>
        <Container>
          <MainContent>
          page MODELISATION 3D section print
          </MainContent>
        </Container>
      </Layout3DPrinter>
    </LightBackground>
  );
};
export default ServicesModelisation;
