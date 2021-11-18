import LayoutAdmin from "../../../Layout/LayoutAdmin";
import CartResume from "../../../components/CartResume";
import PreviousPageLink from "../../../components/PreviousPageLink";
import { ReactElement } from "react";

export default function CaisseMagasin() {
  return (
    <>
      <PreviousPageLink text="&#8592; Continuer mes achats" />
      <CartResume />
    </>
  );
}

CaisseMagasin.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAdmin>{page}</LayoutAdmin>;
};
