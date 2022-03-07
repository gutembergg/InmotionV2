import styled from "styled-components";
import { shade } from "polished";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-top: 4rem;

  @media (max-width: 1200px) {
    margin-top: 1rem;
  }
`;

export const ProductArea = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;

  gap: 5rem;
  width: 100%;

  @media (max-width: 1200px) {
    flex-direction: column;
    justify-content: center;
    margin-top: 4rem;
    gap: 1rem;
  }
`;

export const ProductInfo = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: 900px;
`;

export const MenuCategories = styled.div`
  width: 100%;
  max-width: 300px;
  color: var(--DarkGray);
  font-size: 1.2rem;
  
  .category_name {
    cursor: pointer;
  }
  .active_menu {
    color: var(--Blue);
  }
  
  .prod_model_marque {
    text-align: end;
    line-height: 200%;
    
    margin-top: 1.5rem;
    cursor: pointer; 
  }
  
  .prod_model_item {
    list-style: none;

    font-weight: 600;
    cursor: pointer;

    /* &:hover {
      color: ${shade(0.2, "#0570A6")};
    } */
  }

  @media (max-width: 1200px) {
    display: none;
  }
`;

export const ProductMenuResponsive = styled.div`
  display: none;

  .prod_model_marque {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    grid-gap: 16px;

    .active_menu {
      background: var(--Blue);
      color: var(--White);
    }
  }

  .menu_buttons {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;

    padding: 1rem;
    height: 40px;
    background: transparent;
    border: 2px solid var(--Blue);
    border-radius: 30px;
    color: var(--Blue);
  }

  @media (max-width: 1200px) {
    display: block;
    order: -1;
  }
`;

export const ProductsFooter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 5rem;
`;
