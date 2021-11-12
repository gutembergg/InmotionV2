import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  h2 {
    text-align: center;
    color: var(--Blue);
    span {
      color: var(--Red);
    }
  }
`;

export const ImageBlock = styled.div``;

export const PriceQuantity = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  width: 100%;

  input {
    width: 50px;
    height: 40px;
    padding: 5px;

    background: transparent;
    border: 1px solid var(--DarkGray);
  }
`;

export const Button = styled.div`
  height: 2rem;
  width: 100%;
  background: var(--Blue);
  text-align: center;

  margin-top: 1.3rem;

  button {
    background: transparent;
    color: #fff;
    border: none;
    padding: 0.5rem 0.5rem;
  }
`;

export const StockProduct = styled.div`
  margin-top: 0.5rem;
  padding: 3px;
`;

export const ProductPrice = styled.div``;
