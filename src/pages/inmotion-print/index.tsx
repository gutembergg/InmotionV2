import HomeIcon from "../../../public/images/icons/house.svg";
import { ICategories } from "../../interfaces/ICategories";
import { Container, MainContent } from "../../styles/HomeStyles";
import React, { ReactElement } from "react";
import Layout3DPrinter from "../../Layout/Layout3DPrinter";

export interface IProducts {
  categories: ICategories[];
  menu_order: ICategories[];
}

export default function HomePrint() {
  return (
    <Container>
      <MainContent>page accueil section print</MainContent>
    </Container>
  );
}

HomePrint.getLayout = function getLayout(page: ReactElement) {
  return <Layout3DPrinter icon={HomeIcon}>{page}</Layout3DPrinter>;
};
