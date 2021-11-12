import type { NextPage } from "next";
import { Container } from "../../components/HomeMainComponent/styles";
import useUser from "../../hooks/useUser";
import LayoutAdmin from "../../Layout/LayoutAdmin";
import { LightBackground } from "../../styles/BackgroundStyle";
import { MainContent } from "../../styles/HomeStyles";

const AdminPage: NextPage = () => {
  const {user} = useUser();
  console.log('pageuseradmin',user)

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
};

export default AdminPage;
