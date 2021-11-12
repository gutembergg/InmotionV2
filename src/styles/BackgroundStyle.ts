import styled from "styled-components";
import mainBg from "../../public/images/backgrounds/MainBackground.jpg";
import lightBg from "../../public/images/backgrounds/lightBackground.jpg";

export const CurvedBackground = styled.div`
    background-image:url(${mainBg.src});
    background-size: cover;
    background-attachment: fixed;
    background-position-x: center;
    background-repeat: no-repeat;
  
`
export const LightBackground = styled.div`
    background-image:url(${lightBg.src});
    background-size: cover;
    background-attachment: fixed;
    background-position-x:center;
    background-repeat: no-repeat;
    @media (min-width: 900px) {
        background-position-x: center;
  }
  
`