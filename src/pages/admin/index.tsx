import { ReactElement } from "react";
import { Container } from "../../components/HomeMainComponent/styles";
import useUser from "../../hooks/useUser";
import LayoutAdmin from "../../Layout/LayoutAdmin";
import { LightBackground } from "../../styles/BackgroundStyle";
import { MainContent } from "../../styles/HomeStyles";

export default function AdminPage() {
  const { user } = useUser();
  console.log("pageuseradmin", user);

  return (
    <LightBackground>
      <LayoutAdmin>
        <Container>
          <MainContent>
            <p>admin Homepage</p>
          </MainContent>
        </Container>
      </LayoutAdmin>
    </LightBackground>
  );
}

AdminPage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAdmin>{page}</LayoutAdmin>;
};
