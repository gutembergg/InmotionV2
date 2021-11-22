import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-top: 4rem;

  @media (max-width: 570px) {
    margin-top: 1.5rem;
  }
`;

export const ProductArea = styled.div`
  display: flex;
  flex-direction: row;

  width: 100%;
  gap: 6rem;

  .menu_block {
    width: 100%;
    max-width: 300px;
  }

  @media (max-width: 1225px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2rem;

    .menu_block {
      order: -1;
      width: 100%;
      max-width: 900px;
      margin-bottom: -35px;
    }
  }
`;

export const ProductInfo = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: 900px;

  @media (max-width: 570px) {
    justify-content: space-between;
    margin-top: 1rem;
  }
`;

export const ProductsFooter = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  margin-top: 1.5rem;

  @media (max-width: 570px) {
    margin-top: 1.5rem;
  }
`;
