import styled from "styled-components";

export const Container = styled.div`
`;

export const MainContent = styled.div`
  padding: 70px 3rem;
  @media (max-width:960px){
    padding: 50px 2rem;

  }
  @media (max-width:640px){
    padding: 30px 1rem;

  }
  h1 {
    text-align: center;
    margin-bottom:50px;
    @media (max-width:960px){
      margin-bottom:40px;
      
    }
    @media (max-width:640px){
    margin-bottom:30px;

  }
  }

  ul {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-evenly;
  }
`;

export const GuidItem = styled.li`
  flex: 0 1 70px;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: flex-start;
  margin: 40px 10px;

  h2{
    color: var(--Blue);
  }
  ul{
    display: flex;
    flex-direction: column;
  flex-wrap: nowrap;
  align-items: start;

  li{
    list-style-type: none;
    background-color: var(--LightGray);
    padding: 5px 10px;
    margin-bottom:10px;
    width: 100%;
    
    &:hover {
      background-color: var(--DarkGray);

    }
    a{
      color: var(--White);
      text-decoration: none;
    }
  }
  }
  .imgBox {
    position: relative;
    width: 200px;
    height: 200px;
    margin-bottom: 10px;
    @media screen and (max-width: 960px) {
      width: 150px;
      height: 150px;

    }
  }
`;
