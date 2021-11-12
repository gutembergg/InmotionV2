import HomeIcon from "../../../public/images/icons/house.svg";
import type { NextPage } from "next";
import { ICategories } from "../../interfaces/ICategories";
import { Container, MainContent } from "../../styles/HomeStyles";
import { CurvedBackground } from "../../styles/BackgroundStyle";
import LayoutMobility from "../../Layout/LayoutMobility";
import useUser from "../../hooks/useUser";
import { useEffect, useState } from "react";

export interface IProducts {
  categories: ICategories[];
  menu_order: ICategories[];
}

const Home: NextPage<IProducts> = () => {
  const { user } = useUser();
  const [loged, setloged] = useState(false);

  useEffect(() => {
    if (user.token) {
      setloged(true);
    } else {
      setloged(false);
    }
  }, [user]);

  return (
    <CurvedBackground>
      <LayoutMobility icon={HomeIcon}>
        <Container>
          <MainContent>
            {loged ? JSON.stringify(user) : ""}page accueil section Mobility
          </MainContent>
        </Container>
      </LayoutMobility>
    </CurvedBackground>
  );
};
export default Home;
