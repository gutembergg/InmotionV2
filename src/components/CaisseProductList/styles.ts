import styled from "styled-components";

export const Container = styled.div``;

export const ProductsCards = styled.div`
  width: auto;
  padding-top: 60px;

  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-column-gap: 20px;
  grid-row-gap: 30px;
  align-items: end;
  justify-items: center;

  @media (max-width: 790px) {
    padding-top: 60;
  }
`;
