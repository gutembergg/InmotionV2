import { shade } from "polished";
import styled from "styled-components";

export const Container = styled.div``;

export const MenuCategoriesResponsive = styled.div`
  display: none;

  @media (max-width: 1225px) {
    display: flex;
    order: -1;
  }

  .menu_block {
    display: flex;
    flex-direction: row;
    justify-content: center;

    @media (max-width: 716px) {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    }
  }

  .menu_buttons {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;

    width: 200px;
    height: 40px;
    margin: 0.5rem 0.5rem;

    background: transparent;
    color: var(--Blue);
    border: 1px solid var(--Blue);
    border-radius: 3rem;
  }

  .active_menu {
    background: var(--Blue);
    color: var(--White);
  }

  @media (max-width: 1225px) {
    display: flex;
    order: -1;
  }
`;

export const MenuCategories = styled.div`
  width: 100%;
  max-width: 300px;
  color: var(--DarkGray);

  font-size: 1.2rem;

  .active_menu {
    color: var(--Blue);
  }

  .prod_model_marque {
    text-align: end;
    line-height: 200%;

    margin-top: 1.5rem;
  }

  .prod_model_item {
    list-style: none;

    font-weight: 600;
    cursor: pointer;

    &:hover {
      color: ${shade(0.2, "#0570A6")};
    }
  }

  @media (max-width: 1225px) {
    display: none;
  }
`;

export const SliderContainer = styled.div`
  width: 100%;
  max-width: 800px;
  margin-bottom: 3rem;

  .active {
    background: var(--Blue);
    color: var(--White);
  }
`;

export const Button = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 220px;
  height: 40px;
  background: transparent;
  color: var(--Blue);
  border: 1px solid var(--Blue);
  border-radius: 3rem;

  font-size: 0.8rem;
  font-weight: 600;
`;
