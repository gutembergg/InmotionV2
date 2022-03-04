import styled, { keyframes } from "styled-components";

const upSellList = keyframes`
 100% { opacity: 1; height: auto }
`;

export const Container = styled.div`
  display: flex;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  width: 100%;
  max-width: 1600px;
  padding: 3rem 3rem;

  @media (max-width: 1024px) {
    padding: 2rem 2rem;
  }
  @media (max-width: 640px) {
    padding: 2rem 1rem;
  }
  h1 {
    text-align: center;
    margin-bottom: 1.4rem;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export const ButtonMenu = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 45px;
  background: var(--Blue);
  color: var(--White);

  border: none;

  &:hover {
    background: var(--BlueHover);
  }

  p {
    margin-left: 0.6rem;
  }
`;

export const FiltersBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  border-bottom: 1px solid;
  width: 90%;

  @media (max-width: 1024px) {
    width: 100%;
  }

  @media (max-width: 380px) {
    flex-direction: column;
    align-items: stretch;
    border-bottom: 1px solid;
    align-content: stretch;
    gap: 18px;
  }
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
  padding: 0 15px;
  height: 35px;
  width: 100%;
  max-width: 300px;
  border: none;
  @media (max-width: 380px) {
    max-width: none;
  }
  p {
    margin-right: 0.6rem;
  }
`;

export const ModelListWrapper = styled.div`
  position: relative;
`;

export const ModelList = styled.ul`
  position: absolute;
  z-index: 9999;
  top: 20;
  left: 0;
  width: 100%;
  max-width: 300px;
  opacity: 0;
  background: var(--White);
  line-height: 200%;
  border-top: none;
  box-shadow: 0px 7px 8px 0px #2121211c;
  animation: ${upSellList} 0.5s forwards;

  @media (max-width: 380px) {
    max-width: none;
  }
  .upsell_name {
    cursor: pointer;
    color: var(--Blue);
    font-weight: 600;
    list-style: none;
    padding: 0.2rem 0.7rem;

    &:hover {
      background: var(--Blue);
      color: var(--White);
    }
  }
`;

export const PaginateBar = styled.div`
  text-align: right;
  width: 100%;
`;

export const ProductsSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  width: 100%;
  padding-top: 0.5rem;
`;

export const ProductsMobile = styled.ul`
  display: none;

  @media (max-width: 600px) {
    display: block;
    margin-top: 1rem;
  }
`;

export const Products = styled.div`
  width: 95%;
  margin-top: 2rem;
  margin-bottom: 2rem;

  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  grid-gap: 35px;

  @media (max-width: 1024px) {
    width: 100%;
  }

  @media (max-width: 600px) {
    display: none;
  }
`;

export const MenuSubCategoriesMobilie = styled.div`
  display: none;

  @media (max-width: 1024px) {
    display: block;
    position: relative;
  }

  .menu_subcategories {
    position: absolute;
    z-index: 9999;
    top: 20;
    right: 0;
    width: max-content;
    background: var(--White);
    line-height: 200%;
    border-top: none;
    box-shadow: 0px 7px 8px 0px #2121211c;
    list-style: none;
    border-top: none;
    box-shadow: 0px 7px 8px 0px #2121211c;
    list-style: none;
    li {
      padding: 0.2rem 0.7rem;
      background: var(--White);
      &:hover {
        background: var(--Blue);
        color: var(--White);
        font-weight: 600;
        a {
          color: var(--White);
        }
      }
      a {
        text-decoration: none;
        color: var(--Blue);
        font-weight: 600;
      }
    }
  }
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
      color: var(--DarkGray);
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

  @media (max-width: 1024px) {
    display: none;
  }
`;
