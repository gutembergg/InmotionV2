import styled from "styled-components";

export const MenuSearchBar = styled.div`

  display: flex;
  border-bottom: 1px solid var(--Black);
  margin-right: 25px;

  input {
    border: none;
    background-color: transparent;
    width: 100%;

    &:focus {
      outline: none;
    }
  }
  .searchIcon {
    width: 25px;
  }

  @media screen and (max-width: 1024px) {
    border-bottom: none;
  }
`;
