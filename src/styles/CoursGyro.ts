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
    @media screen and (max-width: 800px) {
      height: 45vh;
      min-height: initial;
    }
    @media screen and (max-width: 480px) {
      min-height: none;
      height: 35vh;
    }
    .bgImage {
      position: relative;
      img {
        @media screen and (max-width: 1240px) {
          object-position: center center !important;
        }
        @media screen and (max-width: 800px) {
          object-position: center center !important;
        }
        @media screen and (max-width: 480px) {
          object-position: -4rem center !important;
        }
      }
    }
  }
`;

export const BlockInfoCours = styled.div`
  position: absolute;
  left: -60px;
  bottom: 37%;
  @media screen and (max-width: 800px) {
    left: 0px;
    position: relative;
    width: 100%;
  }
  .block {
    background-color: var(--White);
    padding: 30px 50px 30px 120px;
    transform: skew(-10deg);
    @media screen and (max-width: 800px) {
      background-color: #d8d8d8;
      padding: 30px 2rem 70px 2rem;
      transform: skew(0deg);
    }
    .unskewBlock {
      transform: skew(10deg);
      width: 40vw;
      max-width: 500px;
      min-width: 200px;
      @media screen and (max-width: 800px) {
        max-width: none;
        transform: skew(0deg);
        bottom: initial;
        top: 50px;
        width: 100%;
      }
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
        &:hover {
          transition: all ease-in 0.1s;
          background-color: var(--BlueHover);
        }
      }
    }
  }
`;
