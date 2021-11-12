import { shade } from "polished";
import styled from "styled-components";

export const Container = styled.div``;

export const Content = styled.div`
  display: flex;
  flex-direction: row;
  align-self: flex-start;

  width: 100%;

  @media (max-width: 1200px) {
    justify-content: center;
  }

  @media (max-width: 820px) {
    flex-direction: column;
  }
`;

export const AccessoryImage = styled.div`
  margin-right: 1rem;

  @media (max-width: 820px) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const AccessoryInfos = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;

  div + div {
    margin-top: 0.7rem;
  }

  .prod_category_name {
    font-weight: 600;
    color: var(--DarkGray);
  }

  .prod_name {
    font-size: 1.8rem;
    font-weight: 600;
  }

  .color {
    display: flex;
    align-items: center;

    span {
      margin-right: 0.8rem;
    }
  }

  .price_block {
    margin-top: 0.4rem;
    margin-bottom: 0.7rem;
    padding-left: 0.8rem;
    color: var(--Red);
    font-weight: 600;
  }

  .regular_price {
    text-decoration: line-through;
    opacity: 0.4;
    margin-right: 1rem;
  }

  @media (max-width: 820px) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const ButtonsBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  width: 100%;
  max-width: 900px;

  gap: 1rem;

  @media (max-width: 820px) {
    flex-direction: column;
  }
`;

export const ButtonProduct = styled.button`
  height: 40px;
  width: 250px;
  background-color: var(--Blue);
  color: #fff;

  border: none;
`;

export const LinkProduct = styled.div`
  .link {
    text-decoration: none;
    color: var(--Blue);

    &:hover {
      color: ${shade(0.2, "#0570A6")};
    }
  }
`;
