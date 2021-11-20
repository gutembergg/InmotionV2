import { Container } from "../../../components/HomeMainComponent/styles";
import { MainContent } from "../../../styles/HomeStyles";
import LayoutAdmin from "../../../Layout/LayoutAdmin";
import { ReactElement } from "react";

export default function AdminListeCommandes() {
  return (
    <Container>
      <MainContent>
        <p>Commandes</p>
      </MainContent>
    </Container>
  );
}

AdminListeCommandes.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAdmin>{page}</LayoutAdmin>;
};
