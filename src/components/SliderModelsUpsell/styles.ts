import styled from "styled-components";

export const SliderContainer = styled.div`
  width: 100%;
  max-width: 1020px;
  margin-bottom: 3rem;

  .active {
    background: var(--Blue);
    color: var(--White);
  }
`;

export const UpSellButton = styled.span`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 220px;
  height: 40px;
  background: transparent;
  color: var(--Blue);
  border: 1px solid var(--Blue);
  border-radius: 3rem;

  font-size: 0.8rem;
  font-weight: 600;
`;
