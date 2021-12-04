import HomeIcon from "../../../public/images/icons/house.svg";
import { Container, MainContent } from "../../styles/HomeStyles";
import useUser from "../../hooks/useUser";
import React, { ReactElement, useState } from "react";
import LayoutMobility from "../../Layout/LayoutMobility";

export default function Home() {
  const { user } = useUser();
  const [loged] = useState(false);

  return (
    <Container>
      <MainContent>
        {loged ? JSON.stringify(user) : ""} page accueil section Mobility
      </MainContent>
    </Container>
  );
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <LayoutMobility icon={HomeIcon}>{page}</LayoutMobility>;
};
