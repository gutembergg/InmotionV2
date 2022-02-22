import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

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
`;

export const SearchProductsList = styled.ul`
  position: absolute;
  z-index: 9998;
  top: 38px;
  right: 0;
  background: var(--White);
  list-style-type: none;
  height: auto;
  max-height: 400px;
  width: 100%;
  padding: 0.5rem;
  box-shadow: 0px 3px 3px #0000004f;
`;

export const ProductName = styled.li`
  cursor: pointer;
  padding-bottom: 0.5rem;

  &:hover {
    color: var(--LightGray);
  }
`;
