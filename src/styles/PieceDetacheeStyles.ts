import styled, { keyframes } from "styled-components";

const upSellList = keyframes`
 100% { opacity: 1; height: auto }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2rem;

  h1 {
    text-align: center;
  }

  @media (max-width: 1024) {
    margin-top: 20rem;
    background-color: red;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: row;
`;

export const FiltersBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid;

  width: 90%;
`;

export const ButtonFilterBlock = styled.div`
  position: relative;
`;

export const ButtonSelect = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: var(--Blue);
  color: var(--White);

  height: 35px;
  width: 300px;
  border: none;

  p {
    margin-right: 0.6rem;
  }
`;

export const ModelListWrapper = styled.div``;

export const ModelList = styled.div`
  cursor: pointer;
  position: absolute;
  z-index: 9999;
  top: 20;
  right: 0;
  width: 100%;
  opacity: 0;
  background: var(--White);
  padding: 0.5rem 0.7rem;
  line-height: 200%;

  border-top: none;
  box-shadow: 0px 7px 8px 0px #2121211c;

  animation: ${upSellList} 1s forwards;

  .upsell_name {
    color: var(--Blue);
    font-weight: 600;
  }
`;

export const PaginateBar = styled.div``;

export const ProductsSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  width: 100%;
  padding-top: 0.5rem;
`;

export const Products = styled.div`
  width: 100%;
  margin-top: 2rem;
  padding-right: 4rem;

  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-gap: 25px;
`;

export const MenuSubCategories = styled.div`
  cursor: pointer;

  width: 100%;
  max-width: 400px;
  display: flex;
  justify-content: flex-end;
  padding-top: 2.4rem;
  width: 100%;
  max-width: 200px;

  .skew_button {
    margin-bottom: 1rem;
  }

  .category_name {
    list-style: none;
    display: flex;
    justify-content: flex-end;
    margin-bottom: 0.3rem;

    a {
      text-decoration: none;
      color: var(--Black);
      font-weight: 600;
      font-size: 1.2rem;

      &:hover {
        color: var(--Blue);
      }
    }

    a.active {
      color: var(--Blue);
    }
  }
`;
