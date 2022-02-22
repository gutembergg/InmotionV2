import styled from "styled-components";


export const GlobalContainer = styled.div`


.bgImage{
  position: fixed;
  width: 100%;
  height: 100%;
  z-index:-1;
  div{
    position: relative;
    width: 100%;
    height: 100%;
  }
}
>.content{
  display: flex;
flex-direction: column;
justify-content: space-between;
  min-height: 100vh;
position: relative;
  .location{
    margin-top:80px;
    @media (max-width:1024px){
      margin-top:50px;
    }
    @media (max-width:640px){
      margin-top:40px;
    }
  }
  main {
    padding: 0 0%;
    flex: auto;
  }
  

}
`;
