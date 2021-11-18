import styled from "styled-components";

export const StyledLangSelector2 = styled.div`
  margin-top: 10px;
cursor:pointer;
margin-right: 20px;

  .langSelector {
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    transition: all ease-in 0.15s;
    color: var(--Blue);

    &:hover span{
  transform: rotate(90deg) ;
    }

    .langSelectorListNameFlag {
      display: flex;
      align-items: center;
      position: relative;
      
    }
      .flagImgBox {
        margin-right: 10px;
        
        p {
          margin-top: -6px;
        }
      }
      
      span{
        font-size: 34px;
    position: absolute;
    margin: 0;
    padding: 0;
    top: -9px;
    right: -30px;
    color: #757575;
    transition: all ease-in 0.15s ;
      }
      
    ul.langSelectorList {
      display: flex;
      list-style: none;
      transition: all ease-in 1s;

      li {
        margin: 0px 5px;
        visibility: hidden;
        width: 0;
        opacity: 0;
        transition: all ease-in 0.1s;
        &:hover{
          transform:scale(1.2)
        }
      }
    }

    &:hover ul.langSelectorList {

    li:nth-child(1) {
      visibility: visible;
      width:40px;
      opacity: 1;
      transition: all ease-in 0.15s;
      transition-delay: 50ms;
    }
    
    li:nth-child(2) {
      visibility: visible;
      width:40px;
      opacity: 1;
      transition: all ease-in 0.15s;

    }
    }

  }
`;
