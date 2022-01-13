import styled from "styled-components";
import mainBg from "../../../public/images/backgrounds/lightBackground.jpg";

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

  .location{
    margin-top:110px;
display: flex;
  }
  main {
    padding: 0 0%;
    flex: auto;
  }

  Header {
    padding: 0 0%;
    position:fixed;
    width: 100%;
    z-index:9990;
  }
`;
