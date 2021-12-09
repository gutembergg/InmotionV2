import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  max-width: 1400px;

  .swiper-scrollbar-drag {
    background: var(--Blue);
  }

  .slide_block {
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 1.2rem;
  }

  .product_name {
    text-align: center;
  }

  .swiper-slide {
    width: 100%;
    max-width: 200px;
  }
`;
