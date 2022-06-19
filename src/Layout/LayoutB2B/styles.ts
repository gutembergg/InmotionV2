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
    @media only screen 
  and (min-width: 1024px) 
  and (max-height: 1366px) 
  and (-webkit-min-device-pixel-ratio: 2) {
    margin-top:50px;
}

/* Portrait */
@media only screen 
  and (min-width: 1024px) 
  and (max-height: 1366px) 
  and (orientation: portrait) 
  and (-webkit-min-device-pixel-ratio: 2) {
    margin-top:50px;
}
  }
  main {
    padding: 0 0%;
    flex: auto;
  }
  

}
`;
