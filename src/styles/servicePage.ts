import styled from "styled-components";

export const MainContent = styled.div`
  width: 100%;
  @media (max-width: 1024px) {
    padding-top: 100px;
  }
`;
export const ServicePage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  #whatWeOffer {
    width: 100%;
    text-align: center;
    padding: 0 3em;
    @media (max-width:1024px){
        padding: 0 0em;
  }
        
    ul {
      display: flex;    
    justify-content: center;
      align-items: flex-start;
      margin-top: 80px;
      margin-bottom: 140px;
      flex-direction: row;
    flex-wrap: wrap;
      li {
        list-style-type: none;
        flex: 0 1 200px;
        h2 {
          font-family: "Open Sans", sans-serif;
          text-transform: none;
          font-size: 1.1em;
          @media (max-width:1024px){
            font-size: 0.9em;
            }
        }
        }

        svg {
          font-size: 60px;
          color: var(--Blue);
          @media (max-width:1024px){
            font-size: 50px;
  }
        }
      }
    }
  }
  #docAndForm {
    width: 100%;
    text-align: center;
    padding: 0 3em;
    @media (max-width:960px){
        padding: 0 0em;

  }
        }
    ul {
      display: flex;  
      justify-content: space-between;
      align-items: center;
      margin-top: 60px;
      margin-bottom: 60px;
      flex-direction: row;
    flex-wrap: wrap;
      li {
        list-style-type: none;
        display: flex;
    flex-direction: column;
    align-items: center;
    flex: 0 1 220px;
    margin: 20px 0;
        h2 {
          font-family: "Open Sans", sans-serif;
          text-transform: none;
          font-size: 1.1em;
          margin-bottom: 25px;
          /* color: var(--Blue); */
          @media (max-width:960px){
            font-size: 0.9em;
            }
        }

        svg {
          font-size: 60px;
          color: var(--TxtRed);
        }

        a{
          background-color: var(--Blue);
          padding: 10px 20px;
          color: white;
          font-weight: bold;
          text-decoration: none;
          width: 100%;
          transition: all ease-in-out 0.1s;
          @media (max-width:960px){
            font-size: 0.8em;
            }
          &:hover {
              transition: all ease-in-out 0.3s;
            background-color:var(--DarkGray);
          }
        }
      }
    }
  }
`;
