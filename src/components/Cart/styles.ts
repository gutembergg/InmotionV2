import styled from "styled-components";

export const StyledCart = styled.div`
  flex: 0 0 50px;
cursor: pointer;
  .cartIconElement {
    position: relative;
display: flex;

    .cartIcon {
      margin-right: 0px;
      transition: all ease-in 0.2s;
      @media (max-width: 1024px) {
        width: 20px;
      }
    }

    #cartItemsNumber {
      position:relative;
      color: var(--Blue);
      width: 25px;
      height: 25px;
      font-size: 1em;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    &:hover {
      .cartIcon {
        transform: scale(1.1);
        transition: all ease-in 0.2s;
      }
    }
    .cartPreview.open {
      visibility: visible;
      opacity: 1;
      transform: scaleY(1);
      transition: all ease-in-out 0.2s;
    }

    .cartPreview {
      position: absolute;
      visibility: hidden;
      opacity: 0;
      padding-top: 38px;
      z-index: 9999;
      right: -1px;
      transform: scaleY(0);
      transform-origin: right 12px;
      transition: all ease-in-out 0.1s;
      @media (max-width: 1024px) {
        position: fixed;
        padding-top: 7px;
        left: 0px;
        right: initial;
        top: 47px;
      }

    @media (max-width: 640px) {
      top: 32px;
    }
  }
  
  .cartContainer {
    background-color: white;
    width: 300px;
    border-top: none;
    box-shadow: 0px 7px 8px 0px #2121211c;
    padding: 0 2rem 2px 2rem;
    @media (max-width: 1024px) {
          border-top: 2px solid var(--Blue) ;
          width: 100vw;
        }

        li {
          list-style: none;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 16px;

          .closeButton {
            height: 20px;
            width: 20px;
            position: relative;
            box-sizing: border-box;
            line-height: 20px;
            display: inline-block;
            border: none;
            background-color: transparent;

            &:before,
            &:after {
              transform: rotate(-45deg);
              content: "";
              position: absolute;
              top: 50%;
              left: 50%;
              margin-top: -1px;
              margin-left: -10px;
              display: block;
              height: 3px;
              width: 20px;
              background-color: var(--Red);
              transition: all 0.25s ease-out;
            }

            &:after {
              transform: rotate(-135deg);
            }

            &:hover {
              &:before,
              &:after {
                transform: rotate(0deg);
              }
            }
          }

          &:nth-child(even) {
            background-color: var(--White);
          }

          &:nth-child(odd) {
            background-color: #efefef;
          }
        }

        .sousTotalTxt {
          border-top: 2px solid var(--DarkGray);
          padding: 10px 0px;
          margin: 4px 16px;
          @media (max-width: 1024px) {
            margin: 4px 0px;
          }
        }
        .closeCartButton {
          text-align: center;
          margin-bottom: 7px;
          text-decoration: underline;
          cursor: pointer;
        }
        .btnVoirPanier {
          font-size: 0.8em;
          width: calc(100% - 24px);
          margin-left: 12px;
          margin-bottom: 20px;
          height: 40px;
          border: none;
          background-color: var(--Blue);
          color: var(--White);
          text-transform: uppercase;
          font-weight: bold;
          transition: all ease-in 0.2s;
          @media (max-width: 1024px) {
            width:100%;
            margin-left: 0 ;
          }
          &:hover {
            transition: all ease-in 0.1s;
            background-color: var(--DarkGray);
          }
          &.disabled {
            background-color: var(--LightGray);
            cursor: not-allowed;
          }
          p {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
            text-decoration: none;
            color: var(--White);
          }
          a.btnVoirPanierText {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
            text-decoration: none;
            color: var(--White);
          }
        }

        .btnCommander {
          cursor: pointer;
          font-size: 0.8em;
          width: calc(100% - 24px);
          margin-left: 12px;
          margin-bottom: 20px;
          height: 40px;
          border: none;
          background-color: var(--Blue);
          color: var(--White);
          text-transform: uppercase;
          font-weight: bold;
          transition: all ease-in 0.2s;
          @media (max-width: 1024px) {
            width:100%;
            margin-left: 0 ;
          }
          &:hover {
            transition: all ease-in 0.1s;
            background-color: #1186c0;
          }
          &.disabled {
            cursor: not-allowed;
            background-color: var(--LightGray);
          }

          p {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
            text-decoration: none;
            color: var(--White);
          }
          a.btnVoirCheckoutText {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
            text-decoration: none;
            color: var(--White);
          }
        }
      }
    }
  }
`;
