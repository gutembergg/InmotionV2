import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transform: scale(0.96);
  transition: all ease-in 0.1s;

  &:hover {
    transform: scale(1);
    transition: all ease-in 0.1s;
  }

  a {
    cursor: pointer;
    text-decoration: none;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-content: center;
    align-items: center;
  }

  a.product_detail {
    font-weight: 600;
    color: var(--Blue);
    margin-top: 0.4rem;

    &:hover {
      color: var(--BlueHover);
    }
  }
  .onsale {
    color: var(--Red);
    font-weight: bold;
    font-size: 1.1em;
  }
  .Preorder {
  color: var(--TxtRed);
}
`;

export const ImageBlock = styled.div`
  width: 100%;
`;

export const Name = styled.h4`
  text-align: center;
  color: var(--BlueHover);
  font-size: 1.1rem;
  font-weight: 600;
  font-family: "Bitter", sans-serif;
  text-transform: uppercase;
`;

export const Stock = styled.div``;

export const PriceBlock = styled.div`
  div {
    color: var(--Price);
    font-weight: 600;
  }
  
`;

export const ButtonAddToCart = styled.button`
  height: 40px;
  width: 100%;
  max-width: 200px;
  background: var(--Blue);
  color: var(--White);
  border: none;
  font-weight: 600;

  &:hover {
    background: var(--BlueHover);
  }
`;

export const BtnProductDetail = styled.button`
  height: 40px;
  width: 100%;
  max-width: 200px;
  background: var(--Blue);
  color: var(--White);
  border: none;

  &:hover {
    background: var(--BlueHover);
  }

  a {
    text-decoration: none;
    color: var(--White);
    font-weight: 600;
  }
`;
