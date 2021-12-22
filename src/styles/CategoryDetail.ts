import { shade } from "polished";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;

  margin-top: 5rem;

  .decouvrez_model {
    margin: auto;
    margin-bottom: 1rem;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  padding: 0 8rem;

  @media (max-width: 1160px) {
    padding: 0 5rem;
  }

  @media (max-width: 1015px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  @media (max-width: 416px) {
    gap: 12px;
    padding: 0 0;
  }
`;

export const ProductInfos = styled.div`
  width: 100%;
  max-width: 300px;
  display: grid;
  min-width: 290px;
  grid-template-columns: 1fr;
  grid-template-rows: 4fr;
  gap: 20px;

  .weight {
    display: flex;
    align-items: center;
  }

  .autonomie {
    margin-left: 5px;
  }

  .politic_text {
    display: flex;
    align-items: center;
  }

  span + span {
    margin-left: 1.5rem;
  }

  @media (max-width: 1160px) {
    min-width: 200px;
  }

  @media (max-width: 1015px) {
    grid-template-columns: repeat(2, 1fr);
    min-width: 600px;
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    grid-template-rows: 4fr;
    min-width: 40px;
  }

  @media (max-width: 416px) {
    grid-template-columns: 1fr;
    grid-template-rows: 4fr;
    min-width: 20px;
  }
`;

export const ProductImage = styled.div`
  width: 100%;
  position: relative;
  height: auto;
  min-height: 200px;
  min-width: 200px;

  @media (max-width: 1015px) {
    order: -1;
    margin-top: 2rem;
    margin-bottom: 1.5rem;
  }

  @media (max-width: 416px) {
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 200px;
  }
`;

export const ProductMenuModel = styled.div`
  width: 100%;
  max-width: 300px;

  span.skew {
    display: flex;
    justify-content: flex-end;
  }

  .category_name {
    font-size: 0.9rem;
    font-weight: 600;
    opacity: 0.3;

    margin-top: 0.7rem;
  }

  .prod_model-marque {
    list-style: none;
    margin-top: 1.5rem;

    text-align: end;
    line-height: 200%;
  }

  .prod_model_item {
    color: var(--Red);
    font-weight: 600;
    cursor: pointer;

    span {
      color: var(--Blue);
    }
  }

  .sub_cat_accesory {
    color: var(--DarkGray);
    font-weight: 600;
    cursor: pointer;

    &:hover {
      color: var(--Blue);
    }
  }

  @media (max-width: 1015px) {
    order: -2;
    display: none;
  }
`;

export const ProductMenuResponsive = styled.div`
  display: none;

  @media (max-width: 1015px) {
    display: flex;
    width: 100vw;
    order: -2;
    margin-top: 1.4rem;
  }
`;

export const LogoProduct = styled.div`
  margin: auto;

  .logo_box {
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    margin-top: 1rem;
  }

  .price {
    display: flex;
    flex-direction: column;

    margin-left: 0.8rem;
  }

  .regular_price {
    text-decoration: line-through;
    opacity: 0.4;
  }

  .sale_price {
    color: red;
  }
`;

export const AddToCartSession = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: auto;

  width: 400px;

  .link {
    text-decoration: none;
    color: var(--Blue);

    &:hover {
      color: ${shade(0.2, "#0570A6")};
    }
  }

  span {
    color: var(--Blue);
    cursor: pointer;

    &:hover {
      color: ${shade(0.2, "#0570A6")};
    }
  }

  .addToCart_button {
    height: 40px;
    width: 100%;
    max-width: 250px;

    border: none;
    background-color: var(--Blue);
    color: #fff;

    &:hover {
      background-color: ${shade(0.2, "#0570A6")};
    }
  }

  @media (max-width: 400px) {
    flex-direction: column;
    width: 250px;

    a {
      margin-top: 1.2rem;
    }
  }
`;
