import type { NextPage } from "next";
import { LightBackground } from "../../../styles/BackgroundStyle";
import { Container } from "../../../components/HomeMainComponent/styles";
import { MainContent } from "../../../styles/Boutique";
import LayoutMobility from "../../../Layout/LayoutMobility";
import useUser from "../../../hooks/useUser";
import { LogoutLink } from "../../../styles/userMainPage";

const MyAccount: NextPage = () => {
  const { logout, user } = useUser();
  return (
    <LightBackground>
      <LayoutMobility>
        <Container>
          <MainContent>
            <p>USER page add infos, commandes, mes achats, logout etc...</p>
            <LogoutLink onClick={logout}>!logout</LogoutLink>
          </MainContent>
        </Container>
      </LayoutMobility>
    </LightBackground>
  );
};

export default MyAccount;
