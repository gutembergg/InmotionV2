import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  width: 100%;
  max-width: 1300px;

  .swiper {
    width: 100%;
    overflow-x: hidden;
  }

  .swiper-wrapper {
    display: flex;
    justify-content: center;
  }

  .swiper-slide {
    width: 100%;
    max-width: 230px;
  }
`;

export const UpSellButton = styled.span`
  div {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 240px;
    height: 40px;
    background: transparent;
    color: var(--Blue);
    border: 1px solid var(--Blue);
    border-radius: 3rem;
    text-align: center;

    font-size: 0.8rem;
    font-weight: 600;

    span {
      color: var(--TxtRed);
      margin-left: 3px;
    }
  }

  div.actived {
    background-color: var(--Blue);
    color: var(--White);
  }
`;
