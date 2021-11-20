import styled from "styled-components";

export const StyledHeader = styled.header`
  display: none;

  @media screen and (max-width: 1024px) {
    display: block;
    .topHeader {
      display: flex;
      align-items: flex-end;
    justify-content: space-around;
    width: 100%;
    height: 56px;
    position: fixed;
    background-color: #d5d5d5;
    left: 0;
    padding: 64px 139px 0px 10px;
    z-index: 8000;

      .logoBox {
        width: 50%;
        height: 56px;
        img{
          object-fit:cover;
          position: relative;
        }
      }
      .rightContent {
        display: flex;
      }
    }
    //closed menu container//
    .mainBlock {
      /* visibility: hidden; */
      display: none;
      opacity: 0;
      transition: opacity ease-in 0.1s;
      position: fixed;
      z-index: 8900;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      
      .logoBox{
        width:50%;
        
      }
      .slogan{
        margin-bottom: 40px;
      }
      .contentBg{
        top: 0;
        left: 0;
        width: 90vw;
        height: 100vh;
        transform:skew(-10deg);
        margin-left:5vw;
        visibility: hidden;
        transition: all ease-in 0.01s;
        padding: 10px 40px;
        position: relative;
        overflow: hidden;
      }
      .bgLeft{
        position: absolute;
        width: 50%;
        height: 100vh;
        left: 0;
        top: -100%;
        background-color: var(--White);
        transition: all ease-in 0.01s;
      }
      .bgRight{
        transition: all ease-in 0.01s;
        position: absolute;
        width: 50.1%;
        height: 100vh;
        bottom: -100%;
        right: 0;
        background-color: var(--White);
      }
      .content{
          position: relative;
          z-index: 100;
        hr{
          margin: 20px 0px;
        }
        }
    }


    //opened menu container//
    .mainBlock.open {
      display: inline-block;
      transition: opacity ease-in 0.2s;
      /* visibility: visible; */
      opacity: 1;
      background-color:#000000ed;
      top: 0;
      left: 0;
      
      
      .contentBg{
        visibility: visible;
        opacity: 1;
        transition: all ease-in 0.3s;
        top: 0;
        left: 0;
        width: 90vw;
        height: 100vh;
        
        .bgLeft{
          transition: all ease-in 0.4s;
          position: absolute;
          width: 50.1%;
          height: 100vh;
          left: 0;
          top: 0;
          background-color: var(--White);
          z-index: 1;
        }
        .bgRight{
          transition: all ease-in 0.4s;
          position: absolute;
          width: 50.1%;
          height: 100vh;
          bottom: 0;
          right: 0;
          background-color: var(--White);
          z-index: 1;
        }

      }
    }
    
    //navigation icon
    .mobileButton {
      position: fixed;
      z-index:8910;
      right: 25px;
      top: 0;
      transform: skew(-20deg);
      background-color: var(--Red);
      display: flex;
      #nav-icon2 {
        transform: skew(20deg) rotate(0deg);
        width: 36px;
        height: 24px;
        position: relative;
        margin: 19px 18px;
        transition: 0.5s ease-in-out;
        cursor: pointer;
      }

      #nav-icon2 span {
        display: block;
        position: absolute;
        height: 3px;
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
      }

      #nav-icon2 span:nth-child(even) {
        left: 49%;
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
        top: 10px;
      }

      #nav-icon2 span:nth-child(5),
      #nav-icon2 span:nth-child(6) {
        top: 20px;
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
        top: 15px;
      }

      #nav-icon2.open span:nth-child(6) {
        left: calc(50% - 5px);
        top: 15px;
      }
    }
  }
`;
