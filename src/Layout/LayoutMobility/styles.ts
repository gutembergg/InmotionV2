import styled from "styled-components";


export const GlobalContainer = styled.div`


.bgImage{
  position: fixed;
  width: 100%;
  height: 100%;
  z-index:-1;
}
>.content{
  display: flex;
flex-direction: column;
justify-content: space-between;
  min-height: 100vh;
position: relative;
  .location{
    margin-top: 85px;
    @media (max-width:1024px){
      margin-top: 55px;
    }
    @media (max-width:640px){
      margin-top: 40px;
    }
    display: flex;
  }
  main {
    padding: 0 0%;
    flex: auto;
  }
  
  Header {
    padding: 0 0%;
    position:fixed;
    width: 100%;
    z-index:9990;
  }
}
`;
