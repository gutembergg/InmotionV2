import styled from "styled-components";

export const Container = styled.div``;
export const MainContent = styled.div`
  overflow: hidden;
  .bgContainer {
    position: relative;
    width: 100vw;
    z-index: -1;
    .bgImage {
      height: 400px;
      position: relative;
    }
  }
`;

export const BlockInfoLocation = styled.div`
  position: absolute;
  right: -60px;
  bottom: 0px;
  width: calc(92% + 60px);
  @media (max-width:640px){
    position: relative;
    right: initial;
    bottom: initial;
    width: 100%;
  }
  .block {
    background-color: var(--White);
    padding: 30px 120px 30px 50px;
    transform: skew(-10deg);
    width: 100%;
    @media (max-width:640px){
      padding: 30px 2rem 30px 2rem;
      transform: skew(0deg);
    }
    .unskewBlock {
      transform: skew(10deg);
      width: 100%;
      @media (max-width:640px){
      transform: skew(0deg);
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
        &:hover{
          transition: all ease-in 0.1s;
          background-color: var(--BlueHover);
        }
      }
    }
  }
  `;
  export const LocationContainer = styled.div`
  padding: 70px 5rem;
  
  @media (max-width:960px){
    padding: 70px 2rem;
  }
  @media (max-width:640px){
    padding: 40px 1rem;
  }
  h2{
    text-align: center;
    margin-bottom: 60px;
  }
  h3{
    font-size:1.3em;
    color: var(--Blue);
    width: 100%;
    @media (max-width:450px){
      font-size:1.1em;
    }
  }
li{
  display: flex;
  align-items:center;
  margin-bottom: 50px ;
  @media (max-width:640px){
    padding: 0px 2rem;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    text-align: center;
  }
  &:nth-child(even){
    flex-direction:row-reverse;
    text-align:right;
    @media (max-width:640px){
      padding: 0px 2rem;
      flex-direction:column;
      align-items:center;
      justify-content:center;
      text-align: center;
    }
    .productContent{
      align-items: flex-end;
    }
  }
  .productContent{
    flex: 0 1 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
.button{
  padding: 0.7rem 1.5rem;
  background-color: var(--Blue);
  margin-top: 20px;
  width: max-content;
  @media (max-width:640px){
    margin: 20px auto 0 auto;
  }
  a{
    color: var(--White);
    text-decoration: none;
  }
}


  .locationImg{
    width: 208px;
    height: 300px;
    position: relative;
    margin: 0 20px;
    flex: 1 0 auto;
    @media (max-width:640px){      
    height: 220px;
    }
  }
    }
  `
