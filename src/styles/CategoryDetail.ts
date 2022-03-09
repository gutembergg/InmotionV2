import { shade } from "polished";
import styled from "styled-components";
import backgroundProduct from "../../public/images/backgrounds/MainBackground.jpg";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  min-height: 80vh;
  background-image: url(${backgroundProduct.src});
  background-size: cover;
  background-position-x: center;
  background-position-y: bottom;
  background-repeat: no-repeat;
  padding-top: 22px;
  align-items: flex-start;
  overflow-x: hidden;

  .decouvrez_model {
    margin: auto;
    margin-bottom: 1rem;
  }

  .sliderTitle {
    text-align: center;
    width: calc(100% - 1rem);
    flex: 0 1 auto;
  }
  h1 {
    text-align: right;
    width: 100%;
    padding: 0 3rem;
    margin-bottom: 0px;
    margin-right: 20px;
    @media screen and (max-width: 768px) {
      margin-right: 0px;
      padding: 0 1rem;
    }
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  padding: 0 5rem;
  align-items: center;
  flex: 1 1 auto;
  justify-content: center;
  margin-bottom: 30px;
  .productFrom {
    font-weight: bold;
    color: var(--Black);
  }
  .Preorder {
    color: var(--TxtRed);
    margin-bottom: 10px;
    /* font-weight: normal; */
  }
  @media (max-width: 1160px) {
    padding: 0 3rem;
  }

  @media (max-width: 1024px) {
    padding: 0 2rem;
  }
  @media only screen and (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    .ProductDescrt {
      width: 100%;
      padding: 0 0rem;
      display: flex;
      align-items: center;
      flex-direction: column;
      .productFrom {
        text-align: center;
      }
    }
  }

  @media (max-width: 416px) {
    gap: 12px;
    padding: 0 0;
  }
`;

export const ProductInfos = styled.div`
  align-items: start;
  flex-direction: column;
  display: flex;
  -webkit-box-pack: justify;
  justify-content: space-around;
  margin: 0 auto;
  width: 100%;

  @media only screen and (max-width: 768px) {
    flex-direction: row;
    flex-wrap: wrap;
    display: none;
    visibility: hidden;
  }

  div {
    margin-bottom: 5px;
    .iconBox {
      height: 25px;
      width: 25px;
      position: relative;
      align-self: center;
      margin-right: 5px;
    }
  }

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
`;

export const ProductImage = styled.div`
  width: 33%;
  position: relative;
  height: 35vh;
  min-height: 240px;
  min-width: 100px;
  margin-right: 30px;
  align-self: center;

  @media (max-width: 980px) {
    height: 25vh;
  }
  @media (max-width: 768px) {
    width: 250px;
    height: 250px;
    min-height: 170px;
    margin-right: 0px;
    margin-bottom: 15px;
  }
`;

export const ProductMenuModel = styled.div`
  width: 100%;
  max-width: 300px;

  span.skew {
    display: flex;
    justify-content: flex-start;
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
  margin-bottom: 30px;
  width: 100%;

  @media (max-width: 1015px) {
    width: 100%;
    margin-top: 1.4rem;
  }
  @media (max-width: 768px) {
    width: 100%;
    margin-top: 0;
    margin-bottom: 20px;
  }
`;

export const BtnProductDetail = styled.div`
.buttonProductDetail{
  height: 40px;
  width: 100%;
  max-width: 220px;
  color: var(--White);
  border: none;
  text-align: center;
  margin: 0 auto;
  @media (max-width: 768px) {
    margin-top: 10px;
  }
  a {
    text-decoration: none;
    color: var(--White);
    font-weight: 600;
  }
}
`;

export const LogoProduct = styled.div`
  margin: 0 auto;

  .logo_box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-weight: 600;
    margin-top: 1rem;
    align-items: flex-start;

    @media only screen and (max-width: 768px) {
      align-items: center;
      margin-top: 0rem;
    }

    h2 {
      font-size: 2rem;
      color: var(--Blue);
      margin-bottom: 0;
      @media only screen and (max-width: 768px) {
        font-size: 1.5rem;
        margin: 0 13px;
        text-align: center;
      }
      span {
        font-family: "Bitter";
        font-size: inherit;
      }
    }
  }

  .price {
    display: flex;
    flex-direction: row;
    margin-bottom: 15px;
    @media only screen and (max-width: 768px) {
      margin-bottom: 0px;
    }
  }

  .regular_price {
    text-decoration: line-through;
    opacity: 0.4;
    margin-right: 10px;
  }

  .sale_price {
    color: var(--Black);
  }
  .promo {
    margin-left: 10px;
    color: var(--TxtRed);
    font-size: 1em;
  }
`;

export const AddToCartSession = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  margin-top: 20px;
  align-items: center;
  width: 400px;

  @media (max-width: 460px) {
    justify-content: center;
    width: 100%;
    align-items: center;
    flex-direction: column;

    a {
      margin-top: 15px;
      margin-left: 0px;
    }
  }
  .product_detail {
    cursor: pointer;
    text-decoration: none;
    color: var(--Blue);
    font-weight: bold;
    margin-left: 20px;

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
    max-width: 220px;

    border: none;
    background-color: var(--Blue);
    color: #fff;

    &:hover {
      background-color: ${shade(0.2, "#0570A6")};
    }
  }
`;
