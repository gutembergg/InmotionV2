import styled from "styled-components";

export const StyledCart = styled.div`

    .cartPreview {
      padding-top: 10px;

      .cartContainer {
        position: relative;
        border-top: none;
    
        li {
          list-style: none;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          padding: 10px 16px;
          
          h5{
            flex: auto;
          }
          .qtyInput{
            margin-left: 30px;
            input{
              width: 50px;
              height: 40px;
              padding: 6px;
            }
          }
          .productPrice{
            margin-left: 10px;
            flex: 0 1 90px;
            align-items: flex-end;
            color: var(--Black);
          }
          .onSalePrice{
            margin-left: 30px;
            flex:0 1 90px;
            text-decoration: line-through;
            text-decoration-color: var(--DarkGray);
            color: var(--LightGray);

          }
          .onSaleBadge{
            background-color: var(--Red);
            color: var(--White);
            font-weight: bold;
            padding: 5px 10px;
            border-radius: 20px ;
            font-size: 0.8em;
          }
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
          margin: 10px 0px 10px 0;
          padding: 15px 0 5px;
          font-size: 1em;
          text-align:right
        }
        
        .btnCommander {
          font-size: 0.8em;
          padding: 12px 60px;
          margin-left: 12px;
          margin-bottom: 25px;
          border: none;
          background-color:  var(--Blue);
          color:  var(--White);
          text-transform: uppercase;
          font-weight: bold;
          transition: all ease-in 0.2s;
          position: absolute;
          right: 0;
          a{
            color: var(--White);
            text-decoration: none ;
          }
          &:hover {
            transition: all ease-in 0.1s;
            background-color: #1186c0;
          }
        }
      }
    }
  
`;
