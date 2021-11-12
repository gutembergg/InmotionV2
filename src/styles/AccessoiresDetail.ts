import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  margin-top: 5rem;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;

  @media (max-width: 1000px) {
    flex-direction: column;
  }
`;

export const ProductInfos = styled.div`
  width: 100%;
  max-width: 900px;
  display: flex;
  flex-direction: row;
  justify-content: center;

  .colors_variations {
    display: flex;
    flex-direction: row;

    span {
      margin-right: 6px;
    }
  }

  .product_infos {
    display: flex;
    flex-direction: column;
    justify-content: center;

    .info {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .category_name {
      font-size: 0.9rem;
      font-weight: 600;
      opacity: 0.3;

      margin-top: 0.7rem;
    }

    .price_block {
      margin-top: 0.4rem;
      padding-left: 0.8rem;
      color: var(--Red);
      font-weight: 600;
    }

    .regular_price {
      text-decoration: line-through;
      opacity: 0.4;
    }

    .buttons_block {
      display: flex;
      width: 100%;
      max-width: 400px;
      align-items: center;

      margin-top: 1.4rem;
    }

    .addToCart_button {
      height: 40px;
      width: 250px;
      background-color: var(--Blue);
      color: #fff;

      border: none;
    }

    .show_detail_link {
      color: var(--Blue);
    }
  }

  span + span {
    margin-left: 1.5rem;
  }

  .politic_text {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  @media (max-width: 1000px) {
    .buttons_block {
      flex-direction: column;
      justify-content: center;

      span {
        width: 200px;
      }

      span + span {
        margin-top: 0.8rem;
      }
    }
  }

  @media (max-width: 780px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 2.5rem;

    .info {
      align-items: center;
    }

    .buttons_block {
      span {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }

  @media (max-width: 400px) {
    width: 300px;

    .buttons_block {
      width: 200px;
    }
  }
`;

export const ProductImage = styled.div`
  display: flex;
  justify-content: flex-start;
`;

export const ProductMenuModel = styled.div`
  width: 100%;
  max-width: 300px;

  .active_menu {
    color: var(--Blue);
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
      opacity: 0.7;
    }
  }

  @media (max-width: 1000px) {
    order: -2;
    display: none;
  }
`;

export const ProductMenuResponsive = styled.div`
  display: none;

  li.model_buttons {
    display: flex;

    align-items: center;
    justify-content: center;

    padding: 1rem;
    height: 40px;
    background: transparent;
    border: 2px solid var(--Blue);
    border-radius: 30px;
    color: var(--Blue);

    span {
      color: var(--Red);
    }
  }

  li.model_actived {
    background: var(--Blue);
    color: #fff;
  }

  @media (max-width: 1000px) {
    display: flex;
    order: -2;
    margin-bottom: 2.5rem;

    ul {
      display: grid;
      grid-template-columns: repeat(4, 230px);
      grid-gap: 10px;

      @media (max-width: 1000px) {
        grid-template-columns: repeat(3, 230px);
      }

      @media (max-width: 756px) {
        grid-template-columns: repeat(2, 230px);
      }

      @media (max-width: 550px) {
        grid-template-columns: repeat(1, 230px);
      }
    }
  }

  @media (max-width: 755px) {
    justify-content: center;
  }
`;

export const AllProducts = styled.div`
  display: flex;

  gap: 5rem;
  width: 100%;
  max-width: 800px;
  margin-bottom: 3rem;

  .list_products_footer {
    cursor: pointer;
  }
`;

export const UpSellProducts = styled.div`
  cursor: pointer;
  width: 100%;
  max-width: 900px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 15px;

  margin-top: 2rem;
  margin-bottom: 2rem;

  .upsell_products {
    display: flex;
    justify-content: center;
    align-items: center;

    padding: 1rem;
    height: 40px;
    background: transparent;
    border: 2px solid var(--Blue);
    border-radius: 30px;
    color: var(--Blue);

    .upsell_prodName {
      font-weight: 600;
    }
    .upsell_prodModel {
      color: var(--Red);
      font-weight: 600;
    }
  }

  .button_all_products {
    height: 40px;
    width: 250px;
    background-color: var(--Blue);
    color: #fff;

    border: none;
  }

  .active {
    background: var(--Blue);
    color: #fff;
  }

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;
