import { shade } from "polished";
import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;

  width: 100%;
  margin-top: 1rem;

  @media (max-width: 1200px) {
    justify-content: center;
  }

  @media (max-width: 570px) {
    display: none;
  }
`;

export const AccessoryImage = styled.div`
  display: block;

  margin-right: 1.5rem;
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

export const BtnProductWhitVariation = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  height: 40px;
  width: 250px;
  background-color: var(--Blue);

  border: none;

  a {
    text-decoration: none;
    color: #fff;
    font-weight: 600;
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

export const MobileTemplate = styled.div`
  display: none;

  @media (max-width: 570px) {
    display: flex;
    justify-content: space-around;
    width: 100%;

    padding: 6px;
    border: 1px solid;
    border-radius: 6px;
  }
`;

export const MobileImageBox = styled.div`
  width: 100px;
  height: 100px;

  display: flex;
  align-items: center;
`;

export const MobileInfos = styled.div`
  padding: 1rem;
  font-size: 0.8rem;

  .prod_category_name {
    color: var(--DarkGray);
  }
`;

export const MobileButtons = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.6rem;
    margin-bottom: 1rem;

    background: var(--Blue);
    color: var(--White);
    border: none;
    border-radius: 4px;

    width: 90px;
  }

  a {
    text-decoration: none;
    color: var(--Blue);
  }
`;
