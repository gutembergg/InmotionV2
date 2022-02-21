import styled from "styled-components";

export const Container = styled.div``;
export const MainContent = styled.div`
  overflow: hidden;
  .bgContainer {
    position: relative;
    height: 85vh;
    min-height: 600px;
    width: 100vw;
    z-index: -1;
    .bgImage {
      position: relative;
    }
  }
`;

export const BlockInfoCours = styled.div`
  position: absolute;
  left: -60px;
  bottom: 37%;
  .block {
    background-color: var(--White);
    padding: 30px 50px 30px 120px;
    transform: skew(-10deg);

    .unskewBlock {
      transform: skew(10deg);
      width: 40vw;
      max-width: 500px;
      min-width: 350px;
      h1 {
        margin-bottom: 15px;
        margin-left: 20px;
      }

      p {
        margin-bottom: 15px;
      }

      ul {
        margin-bottom: 15px;

        li {
          list-style-position: inside;
          margin-bottom: 5px;
        }
      }

      .promo {
        margin-bottom: 35px;
      }
      a {
        background-color: var(--Blue);
        padding: 10px 20px;
        text-decoration: none;
        color: var(--White);
        font-weight: 600;
        transition: all ease-in 0.1s;
        &:hover{
            transition: all ease-in 0.1s;
            background-color: var(--BlueHover);
        }
      }
    }
  }
`;
