import HomeIcon from "../../../../public/images/icons/house.svg";
import type { NextPage } from "next";
import { ICategories } from "../../../interfaces/ICategories";
import { Container, MainContent } from "../../../styles/HomeStyles";
import React, { ReactElement } from "react";
import Layout3DPrinter from "../../../Layout/Layout3DPrinter";

export interface Props {
  categories: ICategories[];
  menu_order: ICategories[];
}

export default function BoutiquePrint({ categories, menu_order }: Props) {
  return (
    <Container>
      <MainContent>page BOUTIQUE section print</MainContent>
    </Container>
  );
}

BoutiquePrint.getLayout = function getLayout(page: ReactElement) {
  return <Layout3DPrinter>{page}</Layout3DPrinter>;
};
