import { shade } from "polished";
import styled from "styled-components";
import backgroundProduct from "../../public/images/backgrounds/MainBackground.jpg"

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  min-height:80vh;
  background-image: url(${backgroundProduct.src});
  background-size: cover;
  background-position-x: center;
  background-position-y: bottom;
  background-repeat: no-repeat;
  padding-top: 3rem;
  align-items: flex-start;
  .decouvrez_model {
    margin: auto;
    margin-bottom: 1rem;
  }

  .sliderTitle {
    text-align: center;
    width: calc(100% - 1rem);
    flex: 0 1 auto;
  }
h1{
text-align: center;
width: 100%;
margin-bottom:20px;
}
`;

export const Content = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  padding: 0 5rem;
  align-items:center;
  flex: 1 1 auto;
  justify-content: center;

  @media (max-width: 1160px) {
    padding: 0 5rem;
  }

  @media (max-width: 1024px) {
    padding: 0 2rem;
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
    width:100%;

    div{
      margin-bottom:5px ;
      .iconBox{
        height: 25px;
        width: 25px;
        position:relative;
        align-self: center;
        margin-right:5px ;
      }
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
 margin-bottom: 30px ;
 width: 98vw;

  @media (max-width: 1015px) {
    width: 96vw;
    margin-top: 1.4rem;
  }
`;

export const BtnProductDetail = styled.button`
   height: 40px;
  width: 100%;
  max-width: 200px;
  background: var(--Blue);
  color: var(--White);
  border: none;
  text-align: center;
  margin: 0 auto;
  &:hover {
    background: var(--BlueHover);
}
a {
    text-decoration: none;
    color: var(--White);
    font-weight: 600;

  }
`;

export const LogoProduct = styled.div`
  margin:0 auto;

  .logo_box {
    display: flex;
    flex-direction:column;
    justify-content: center;
    font-weight: 600;
    margin-top: 1rem;
    align-items: flex-start;
  }

  .price {
    display: flex;
    flex-direction: row;
    margin-bottom: 15px;

  }

  .regular_price {
    text-decoration: line-through;
    opacity: 0.4;
    margin-right: 10px
  }

  .sale_price {
    color: red;
  }
`;

export const AddToCartSession = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 20px ;
  align-items:center;

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

  @media (max-width: 450px) {
    flex-direction: column;
    width: 250px;

    a {
      margin-top: 1.2rem;
    }
  }
`;
