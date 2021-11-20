import HomeIcon from "../../../../../public/images/icons/house.svg";
import type { NextPage } from "next";
import { ICategories } from "../../../../interfaces/ICategories";
import { Container, MainContent } from "../../../../styles/HomeStyles";
import React, { ReactElement } from "react";
import Layout3DPrinter from "../../../../Layout/Layout3DPrinter";

export interface IProducts {
  categories: ICategories[];
  menu_order: ICategories[];
}

export default function ServicesImpression() {
  return (
    <Container>
      <MainContent>page IMPRESSIONS 3D section print</MainContent>
    </Container>
  );
}

ServicesImpression.getLayout = function getLayout(page: ReactElement) {
  return <Layout3DPrinter>{page}</Layout3DPrinter>;
};
