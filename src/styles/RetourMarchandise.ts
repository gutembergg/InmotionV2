import styled from "styled-components";

export const Container = styled.div`
padding: 50px 5rem;
@media (max-width: 960px) {
  padding: 30px 2rem;
  }
@media (max-width: 640px) {
  padding: 30px 1rem;
  }
`;

export const MainContent = styled.div`
  width: 100%;

`;

export const DirectivesRetour = styled.div`
h1{
    margin-bottom: 30px;
}
p{
    margin-bottom: 10px;
}
h2{
    margin-top:50px
}
li{
    padding: 5px 0 5px 5px;
    margin-left: 20px;
    
}
`