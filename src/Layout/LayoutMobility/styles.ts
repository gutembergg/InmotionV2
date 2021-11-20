import styled from "styled-components";
import mainBg from "../../../public/images/backgrounds/MainBackground.jpg";

export const GlobalContainer = styled.div`
  background-image: url(${mainBg.src});
  background-size: cover;
  background-attachment: fixed;
  background-position-x: center;
  background-repeat: no-repeat;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
  min-height: -webkit-fill-available;

  main {
    padding: 0 5%;
    flex: auto;
  }

  Header {
    padding: 0 5%;
  }
`;
