import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  margin: auto;
  margin-bottom: 4rem;
  width: 100%;
padding  : 3rem 3rem ;
@media (max-width: 1024px) {
  padding  : 2.5rem 2rem ;
  }
@media (max-width: 640px) {
  padding  : 2rem 1rem ;
  }
  
  h5{}
  `;

export const StyledCart = styled.div`
  width: inherit;
  span.product_prices {
    margin-right: 0.4rem;
  }
  
  .cartPreview {
    padding-top: 10px;
    
    .cartContainer {
      position: relative;
      border-top: none;
      display: flex;
    flex-direction: column;
    align-items: stretch;

      li {
        list-style: none;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 16px;
        flex-wrap: wrap;
        
        .rightContent {
          display: flex;
          flex-direction: row;
          align-items: center;
          flex: 1;
          flex: 0 0 auto;
          @media (max-width:768px){
            flex-direction: column;
            align-items: flex-end;
          }
          @media (max-width: 480px) {
            flex-direction: row;
            flex: 0 1 100%;
    justify-content: flex-end;
    align-items: center;
            }
        }
        .contentLeft {
          
          display: flex;
          flex-direction: row;
          align-items: center;
          flex: 1;
          margin-right:10px ;
          @media (max-width: 480px) {
            flex: 1 1 80%;
            }
        }
        
        
        .cartProductThmbnail {
          flex: 0 1 77px;
          min-width: 77px;
}
        button {
          margin-right: 10px;
        }

        h5 {
          flex: auto;
          margin-left: 0.8rem;
          color: var(--BlueHover);
        }
        .qtyInput {
          margin-left:10px;
          min-width: 64px;
          input {
            width: 50px;
            height: 40px;
            padding: 6px;
          }
        }
        .productPrice {
          margin-left: 10px;
          flex: 0 1 90px;
          align-items: flex-end;
          color: var(--Price);
          @media (max-width:768px){
            flex: 0 1 24px;
          }
        }
        .onSalePrice {
          margin-left: 30px;
          flex: 0 1 90px;
          text-decoration: line-through;
          text-decoration-color: var(--DarkGray);
          color: var(--LightGray);
          @media (max-width:768px){
            flex: 0 1 24px;
          }
          @media (max-width:480px){
            margin-left: 13px;
          }
        }
        .onSaleBadge {
          background-color: var(--Red);
          color: var(--White);
          font-weight: bold;
          padding: 5px 10px;
          border-radius: 20px;
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
          flex: 0 0 20px;

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
        text-align: right;
      }

      .btnCommander {
        font-size: 0.8em;
        margin-left: 12px;
        margin-bottom: 25px;
        border: none;
        color: var(--White);
        text-transform: uppercase;
        font-weight: bold;
        transition: all ease-in 0.2s;
        align-self: flex-end;
        a {
          padding: 12px 60px;
          color: var(--White);
          text-decoration: none;
          display: block;
          width: 100% ;
          height: 100% ;
        }

      }
    }
  } 
`;
