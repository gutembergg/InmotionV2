import { ReactElement } from "react";
import { Container } from "../../components/HomeMainComponent/styles";
import LayoutAdmin from "../../Layout/LayoutAdmin";
import { MainContent } from "../../styles/HomeStyles";

export default function AdminPage() {
  return (
    <Container>
      <MainContent>
        <p>admin Homepage</p>
      </MainContent>
    </Container>
  );
}

AdminPage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAdmin>{page}</LayoutAdmin>;
};
