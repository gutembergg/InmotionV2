import styled from "styled-components";

export const StyledCart = styled.div`
  flex: 0 0 50px;
  margin-left: 100px;

    .cartPreview {
      padding-top: 10px;

      .cartContainer {
        width: 300px;
        border-top: none;
        ul{
          max-height: 250px;
          overflow-y: scroll;
          
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
        .btnVoirPanier {
          font-size: 0.8em;
          width: calc(100% - 24px);
          margin-left: 12px;
          margin-bottom: 20px;
          height: 40px;
          border: none;
          background-color: var(--LightGray);
          color: var(--White);
          text-transform: uppercase;
          font-weight: bold;
          transition: all ease-in 0.2s;
          &:hover {
            transition: all ease-in 0.1s;
            background-color:  var(--DarkGray);
          }
        }
        .btnCommander {
          font-size: 0.8em;
          width: calc(100% - 24px);
          margin-left: 12px;
          margin-bottom: 25px;
          height: 40px;
          border: none;
          background-color:  var(--Blue);
          color:  var(--White);
          text-transform: uppercase;
          font-weight: bold;
          transition: all ease-in 0.2s;
          &:hover {
            transition: all ease-in 0.1s;
            background-color: #1186c0;
          }
        }
      }
    }
  
`;
