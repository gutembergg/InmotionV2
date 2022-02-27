import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 85%;
  max-width: 1600px;
  margin: auto;
  margin-top: 3rem;

  @media (max-width: 640px) {
    width: 100%;
    padding: 1rem;
    margin-top: 1rem;
  }
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
  justify-content: end;
  align-items: center;
  border-bottom: 1px solid;

  width: 90%;

  @media (max-width: 1024px) {
    width: 100%;
    justify-content: space-between;
  }

  @media (max-width: 516px) {
    border-bottom: none;
  }
`;

export const ButtonSelect = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: var(--Blue);
  color: var(--White);
  height: 40px;
  width: 100%;
  max-width: 300px;
  border: none;
@media (max-width: 640px){
  max-width:none
}
  &:hover {
    background: var(--BlueHover);
  }

  p {
    margin-right: 0.6rem;
  }
`;

export const PaginateBar = styled.div`
  width: 100%;
  max-width: 100px;

  @media (max-width: 516px) {
    display: none;
  }
`;

export const ProductsSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  width: 100%;
  padding-top: 0.5rem;
  margin-bottom: 1.6rem;
`;

export const Products = styled.div`
  width: 95%;
  margin-top: 2rem;

  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-gap: 25px;

  @media (max-width: 1024px) {
    width: 100%;
  }

  @media (max-width: 600px) {
    display: none;
  }
`;

export const ProductsMobile = styled.ul`
  display: none;

  @media (max-width: 600px) {
    display: block;
    margin-top: 1rem;
  }
`;

export const MenuSubCategoriesMobilie = styled.div`
  display: none;

  @media (max-width: 1024px) {
    display: block;
    position: relative;
    width: 100%;

    .menu_subcategories {
      position: absolute;
      z-index: 9999;
      top: 20;
      left: 0;
      width: 100%;
      max-width: 300px;
      background: var(--White);
      //padding: 0.5rem 0.7rem;
      line-height: 200%;

      border-top: none;
      box-shadow: 0px 7px 8px 0px #2121211c;

      list-style: none;
      @media (max-width: 640px){
  max-width:none;
}
      .categoiry_item {
        padding-left: 0.4rem;
        padding-top: 0.4rem;
        &:hover {
          background: var(--LightGray);
          color: var(--White);
        }
      }
    }
    a {
      text-decoration: none;
      color: var(--Blue);
      font-weight: 600;
    }
  }
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
      color: var(--DarkGray);
      font-weight: 600;
      font-size: 1.2rem;
    }

    a.active {
      color: var(--Blue);
    }
  }

  @media (max-width: 1024px) {
    display: none;
  }
`;
