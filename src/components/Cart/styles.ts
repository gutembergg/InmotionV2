import styled from "styled-components";

export const StyledCart = styled.div`
  flex: 0 0 50px;

  .cartIconElement {
    position: relative;

    .cartIcon {
      margin-right: 10px;
      transition: all ease-in 0.2s;
      @media (max-width: 1024px) {
        width: 20px;
      }
    }

    #cartItemsNumber {
      position: absolute;
      top: -10px;
      right: 5px;
      background-color: #f2142b;
      color: #fcfcfc;
      width: 25px;
      height: 25px;
      border-radius: 50px;
      font-size: 0.8em;
      display: flex;
      align-items: center;
      justify-content: center;
      @media (max-width: 1024px) {
        width: 15px;
        height: 15px;
        top: -4px;
        right: 20px;
      }
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
      padding-top: 10px;
      z-index: 9999;
      padding-top: 12px;
      right: -1px;
      transform: scaleY(0);
      transform-origin: right 12px;
      transition: all ease-in-out 0.1s;
      @media (max-width: 1024px) {
        position: fixed;
        padding-top: 7px;
        left: 0px;
        right: initial;
      }

      .cartContainer {
        background-color: white;
        width: 300px;
        border-top: none;
        box-shadow: 0px 7px 8px 0px #2121211c;
        padding-bottom: 2px;
        @media (max-width: 1024px) {
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
