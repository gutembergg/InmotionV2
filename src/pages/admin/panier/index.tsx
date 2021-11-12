import type { NextPage } from "next";
import { LightBackground } from "../../../styles/BackgroundStyle";
import LayoutAdmin from "../../../Layout/LayoutAdmin";
import { Button } from "../../../styles/ProductDetail";
import CartResume from "../../../components/CartResume";
import PreviousPageLink from "../../../components/PreviousPageLink";

const CaisseMagasin: NextPage = () => {

  return (
    <LightBackground>
      <LayoutAdmin>
        <PreviousPageLink text='&#8592; Continuer mes achats' />
        <CartResume />
      </LayoutAdmin>
    </LightBackground>
  );
};

export default CaisseMagasin;
