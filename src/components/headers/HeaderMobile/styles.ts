import styled from "styled-components";

export const StyledMobileHeader = styled.header`
  display: none;

  .settings {
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-evenly;
    @media only screen and (max-width: 640px) {
      justify-content: space-between;
    }
  }
  .mainBlock.open {
    transition: all ease-in 0.3s;
    background-color: #000000ed;
    top: 0;
    left: 0;

    .contentBg {
      transition: all ease-in 0.3s;
      top: 0;
      right: 0;
      width: 100%;
    }
    .backgroundMobile {
      left: 0rem;
      width: calc(100% - 460px);
      height: 100vh;
      position: relative;
    }
  }

  @media screen and (max-width: 1024px) {
    display: block;
  }
  @media only screen and (min-width: 1024px) and (max-height: 1366px) and (-webkit-min-device-pixel-ratio: 2) {
    display: block;
  }

  /* Portrait */
  @media only screen and (min-width: 1024px) and (max-height: 1366px) and (orientation: portrait) and (-webkit-min-device-pixel-ratio: 2) {
    display: block;
  }
  .topHeader {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 40px;
    position: fixed;
    background-color: var(--White);
    left: 0;
    padding: 2px 65px 0px 2%;
    z-index: 8000;
    box-shadow: 1px 1px 10px #0000002e;
    top: 0;
    @media screen and (min-width: 640px) {
      height: 55px;
      padding: 2px 90px 0px 2%;
    }

    .logoBox {
      width: 150px;
      height: 22px;
      margin-right: 25px;
      position: relative;

      @media screen and (min-width: 640px) {
        width: 205px;
        height: 36px;
        margin-right: 25px;
      }

      img {
        object-fit: cover;
        position: relative;
      }
    }
    .rightContent {
      display: flex;

      .b2bButton {
        color: var(--Red);
        text-decoration: none;
        display: flex;
        align-items: center;
        font-style: italic;
        font-weight: 600;
        letter-spacing: 0.5px;
        margin-right: 1.7rem;
      }
    }
  }
  //closed menu container//
  .mainBlock {
    transition: all ease-in 0.1s;
    position: fixed;
    z-index: 8900;
    top: 0;
    width: 100vw;
    height: 100vh;
    left: 100vw;
    overflow-y: scroll;

    .logoBox {
      width: 40%;
      height: 70px;
      position: relative;
    }
    .slogan {
    }
    .contentBg {
      top: 0;
      right: 100vw;
      width: 100vw;
      padding: 10px 10px;
      position: absolute;
      overflow: hidden;
      background-color: var(--White);
      min-height: 100vh;
      max-width: 460px;
    }
    .content {
      position: relative;
      z-index: 100;
      hr {
        margin: 5px 0px;
      }
    }
  }

  //opened menu container//
  .mainBlock.open {
    transition: all ease-in 0.1s;
    background-color: #000000ed;
    top: 0;
    left: 0;
    width: 100vw;
    .contentBg {
      transition: all ease-in 0.1s;
      top: 0;
      right: 0;
    }
  }

  //navigation icon
  .mobileButton {
    position: fixed;
    z-index: 9910;
    right: 15px;
    top: 0;
    transform: skew(-20deg);
    background-color: var(--Red);
    display: flex;

    #nav-icon2 {
      transform: skew(20deg) rotate(0deg);
      width: 20px;
      height: 13px;
      position: relative;
      margin: 15px 14px;
      transition: 0.5s ease-in-out;
      cursor: pointer;
      @media screen and (min-width: 640px) {
        width: 35px;
        margin: 20px 19px;
        height: 25px;
      }
    }

    #nav-icon2 span {
      display: block;
      position: absolute;
      height: 2px;
      width: 50%;
      background: var(--White);
      opacity: 1;
      -webkit-transform: rotate(0deg);
      -moz-transform: rotate(0deg);
      -o-transform: rotate(0deg);
      transform: rotate(0deg);
      -webkit-transition: 0.25s ease-in-out;
      -moz-transition: 0.25s ease-in-out;
      -o-transition: 0.25s ease-in-out;
      transition: 0.25s ease-in-out;
      @media screen and (min-width: 640px) {
        height: 3px;
      }
    }

    #nav-icon2 span:nth-child(even) {
      left: 48%;
      border-radius: 0 9px 9px 0;
    }

    #nav-icon2 span:nth-child(odd) {
      left: 0px;
      border-radius: 9px 0 0 9px;
    }

    #nav-icon2 span:nth-child(1),
    #nav-icon2 span:nth-child(2) {
      top: 0px;
    }

    #nav-icon2 span:nth-child(3),
    #nav-icon2 span:nth-child(4) {
      top: 5px;
      @media screen and (min-width: 640px) {
        top: 10px;
      }
    }

    #nav-icon2 span:nth-child(5),
    #nav-icon2 span:nth-child(6) {
      top: 10px;
      @media screen and (min-width: 640px) {
        top: 20px;
      }
    }

    #nav-icon2.open span:nth-child(1),
    #nav-icon2.open span:nth-child(6) {
      -webkit-transform: rotate(45deg);
      -moz-transform: rotate(45deg);
      -o-transform: rotate(45deg);
      transform: rotate(45deg);
    }

    #nav-icon2.open span:nth-child(2),
    #nav-icon2.open span:nth-child(5) {
      -webkit-transform: rotate(-45deg);
      -moz-transform: rotate(-45deg);
      -o-transform: rotate(-45deg);
      transform: rotate(-45deg);
    }

    #nav-icon2.open span:nth-child(1) {
      left: 5px;
      top: 7px;
    }

    #nav-icon2.open span:nth-child(2) {
      left: calc(50% - 5px);
      top: 7px;
    }

    #nav-icon2.open span:nth-child(3) {
      left: -50%;
      opacity: 0;
    }

    #nav-icon2.open span:nth-child(4) {
      left: 100%;
      opacity: 0;
    }

    #nav-icon2.open span:nth-child(5) {
      left: 5px;
      top: 7px;
      @media screen and (min-width: 640px) {
        top: 15px;
      }
    }

    #nav-icon2.open span:nth-child(6) {
      left: calc(50% - 5px);
      top: 7px;
      @media screen and (min-width: 640px) {
        top: 15px;
      }
    }
  }
`;

export const MobileMobilityHeader = styled.header`
  align-items: flex-start;
  margin: 0 0px;
  flex-direction: column;
  display: flex;
  position: relative;
  list-style: none;
  font-weight: bold;
  ul {
    a {
      cursor: pointer;
    }
    > li {
      padding: 10px;
      flex: 0 1 auto;
      list-style: none;
      width: 100%;
      border-collapse: content;
      a {
        width: fit-content;
        text-decoration: none;
        color: var(--BlueHover);
      }
      a::before {
        content: "- ";
      }
      > ul {
        list-style: none;
        border-top: none;
        z-index: 9999;
        transition: all ease-in-out 0.1s;
        width: max-content;
        visibility: visible;
        opacity: 1;
        transform: none;
        position: relative;
        box-shadow: none;
        margin: 0 0 0 10px;
        transform-origin: 0;
        padding: 0;

        > li {
          margin: 10px 0 10px 0;
          padding: 0;
          background-color: transparent;
          font-weight: 600;
          a {
            text-decoration: none;
            color: var(--Blue);
          }
          a::before {
            content: "- ";
          }
        }
      }
    }
  }
`;
