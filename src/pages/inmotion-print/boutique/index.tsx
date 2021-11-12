import HomeIcon from "../../../../public/images/icons/house.svg";
import type { NextPage } from "next";
import { ICategories } from "../../../interfaces/ICategories";
import { Container, MainContent } from "../../../styles/HomeStyles";
import { CurvedBackground } from "../../../styles/BackgroundStyle";
import Layout3DPrinter from "../../../Layout/Layout3DPrinter";


export interface IProducts {
  categories: ICategories[];
  menu_order: ICategories[];
}

const BoutiquePrint: NextPage<IProducts> = () => {


  return (
    <CurvedBackground>
      <Layout3DPrinter icon={HomeIcon}>
        <Container>
          <MainContent>
          page BOUTIQUE section print
          </MainContent>
        </Container>
      </Layout3DPrinter>
    </CurvedBackground>
  );
};
export default BoutiquePrint;
