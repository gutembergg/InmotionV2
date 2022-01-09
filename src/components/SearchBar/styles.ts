import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
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

export const SearchProductsList = styled.div`
  position: absolute;
  z-index: 99999;
  top: 50px;
  right: 0;
  background: var(--White);

  height: auto;
  max-height: 600px;
  overflow-y: hidden;
  width: 100%;
  padding: 0.5rem;
`;

export const ProductName = styled.div`
  cursor: pointer;
  padding-bottom: 0.5rem;

  &:hover {
    color: var(--LightGray);
  }
`;
