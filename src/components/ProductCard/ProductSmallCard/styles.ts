import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ImageBlock = styled.div`
  width: 100%;
`;

export const Name = styled.div`
  text-align: center;
  color: var(--Blue);
  font-size: 1.1rem;
  font-weight: 600;
`;

export const Stock = styled.div``;

export const PriceBlock = styled.div`
  span {
    color: var(--Red);
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

  &:hover {
    background: var(--BlueHover);
  }
`;
