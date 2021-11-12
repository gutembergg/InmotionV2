import styled from "styled-components";

export const Container = styled.div`
  min-width: 100%;
  display: flex;
  flex-direction: column;

  h2 {
    font-size: 1.2em;
    text-align: center;
    color: var(--Blue);
    span {
      color: var(--Red);
    }
  }
`;

export const ImageBlock = styled.div`
height:200px;
div{
  height: inherit;
  img{
    object-fit: contain;
    width: 100%;
    height: 100%;
  }
}
  `;

export const PriceQuantity = styled.div`

`;

export const Button = styled.div`

  text-align: center;



  button {
    background: #4b4b4b38;
    color: var(--Blue);
    border: 2px solid var(--Blue);
    border-radius: 20px;
    padding: 0.5rem 0.5rem;
    min-height: 340px;
  }
`;

export const StockProduct = styled.div`

`;

export const ProductPrice = styled.div``;
