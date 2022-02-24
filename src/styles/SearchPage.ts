import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 6rem;
  margin-bottom: 3rem;
`;

export const InputBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const ResultBlock = styled.div`
  width: 100%;
  margin-top: 2rem;

  h2 {
    text-align: center;
  }
`;

export const MenuSearchBar = styled.div`
  display: flex;
  border-bottom: 1px solid var(--Black);
  margin-right: 25px;
  margin-top: 2rem;
  width: 100%;
  max-width: 500px;

  input {
    border: none;
    background-color: transparent;
    width: 100%;
    padding: 0 1rem;

    &:focus {
      outline: none;
    }
  }
  .searchIcon {
    width: 25px;
  }

  span {
    margin: 0 0.3rem;
  }
`;

export const SearchProductsList = styled.div`
  width: 95%;
  margin-top: 2rem;

  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-gap: 25px;
`;

export const ListEmpyt = styled.div`
  text-align: center;
  color: var(--DarkGray);
  font-size: 1.2rem;
  margin-bottom: 9rem;
`;
