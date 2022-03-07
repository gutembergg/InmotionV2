import styled from "styled-components";

export const Container = styled.li`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0;
  border-bottom: 1px solid var(--LightGray);
`;

export const ProductBlock = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  div.image {
    min-height: 70px;
    min-width: 70px;
  }

  div.prod_info {
    margin-left: 0.7rem;
  }
`;

export const ProductInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 20px;

  h4 {
    font-size: 1rem;
  }

  span {
    color: var(--Red);
  }
  span.span_currency {
    margin-right: 0.5rem;
  }

  p.show_detail {
    cursor: pointer;
    color: var(--Blue);
    font-weight: 600;
    transition: 0.2s ease;

    &:active {
      transform: scale(0.9);
    }
  }
`;

export const BtnAddToCart = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 30px;
  padding: 0 2rem;

  background: var(--Blue);
  border: none;
  color: var(--White);
  transition: 0.2s ease;

  &:active {
    transform: scale(0.9);
  }

  p {
    cursor: pointer;
    color: var(--White);
  }

  &:hover {
    background: var(--BlueHover);
  }
`;
