import styled from "styled-components";

export const Container = styled.li`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0.6rem 0;
  border-bottom: 1px solid var(--LightGray);

  .onsale {
    color: var(--Red);
    font-weight: bold;
    font-size: 1em;
  }
`;

export const ProductBlock = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  div.image {
    height: 100px;
    width: 100px;
    position: relative;

    @media (max-width: 480px) {
      height: 65px;
      width: 65px;
    }
  }

  div.prod_info {
    margin-left: 0.7rem;
    @media (max-width: 480px) {
      margin-left: 0;
      gap: 5px;
    }
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
    color: var(--BlueHover);
  }

  span {
    color: var(--Black);
    font-weight: bold;
    font-size: 0.95em;
  }
  span.span_currency {
    margin-right: 0.5rem;
  }

  p.detail_view {
    cursor: pointer;
    color: var(--Blue);
    font-weight: 600;
    padding-left: 30px;
    padding-top: 0.4rem;
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
  width: 220px;
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
