import styled from "styled-components";
import lightBg from "../../../public/images/backgrounds/lightBackground.jpg";

export const GlobalContainer = styled.div`
  background-image: url(${lightBg.src});
  background-size: cover;
  background-attachment: fixed;
  background-position-x: center;
  background-repeat: no-repeat;
  @media (min-width: 900px) {
    background-position-x: center;
  }

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;

  main {
    padding: 0 5%;
    flex: auto;
  }

  Header {
    padding: 0 5%;
  }
`;
