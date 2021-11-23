import styled from "styled-components";

export const Container = styled.div``;

export const SliderContainer = styled.div`
  margin: auto;
  width: 100%;
  max-width: 950px;
  margin-bottom: 3rem;

  .swiper-slide {
    width: 100%;
    max-width: 240px;
  }
  .active {
    background: var(--Blue);
    color: var(--White);
  }
`;

export const Button = styled.div`
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
