import styled from "styled-components";

export const StyledHeader = styled.header`
position: fixed;
width: 100%;
z-index:8000;

  .topBlock {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    background-color: #0570a6;
    padding: 0 5%;
    a {
      text-decoration: none;
    }
  }
  .mainBlock {
    width: 100%;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    box-shadow: rgba(0, 0, 0, 0.5);
    padding: 10px 5%;
    margin: 0 auto;
    background-color: var(--White);
    box-shadow: 0px 2px 6px #00000014;
    .logoBox {
      width: 175px;
      transition: all ease-in 0.2s;
    }
    .rightContent {
      display: flex;
    }
  }

  .bottomBlock {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 0px 5%;

    p {
      margin-top: 5px;
      flex: 0 1 37%;
    }
  }


    @media only screen and (max-width: 1024px) {
      display: none;
    }
    @media only screen 
  and (min-width: 1024px) 
  and (max-height: 1366px) 
  and (-webkit-min-device-pixel-ratio: 2) {
    display: none;
  }
  
  /* Portrait */
  @media only screen 
  and (min-width: 1024px) 
  and (max-height: 1366px) 
  and (orientation: portrait) 
  and (-webkit-min-device-pixel-ratio: 2) {
    display: none;
}
`;
