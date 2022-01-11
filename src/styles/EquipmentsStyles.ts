import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2rem;

  h1 {
    text-align: center;
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

export const ButtonSelect = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: var(--Blue);
  color: var(--White);

  height: 35px;
  width: 100%;
  max-width: 200px;
  border: none;

  margin-bottom: 0.8rem;

  p {
    margin-right: 0.6rem;
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
  display: flex;
  justify-content: flex-end;
  padding-top: 2.4rem;

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
    }
  }
`;
