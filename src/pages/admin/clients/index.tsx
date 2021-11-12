import type {  NextPage } from "next";
import { LightBackground } from "../../../styles/BackgroundStyle";
import { Container } from "../../../components/HomeMainComponent/styles";
import { MainContent } from "../../../styles/HomeStyles";
import LayoutAdmin from "../../../Layout/LayoutAdmin";

const AdminListeCommandes: NextPage = () => {
 
  return (
    <LightBackground>
      <LayoutAdmin>
        <Container>
          <MainContent>
            <p>Clients</p>
          </MainContent>
        </Container>
      </LayoutAdmin>
    </LightBackground>
  );
};

export default AdminListeCommandes;