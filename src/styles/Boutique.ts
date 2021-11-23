import styled from "styled-components";

export const Container = styled.div``;

export const MainContent = styled.div`
  position: relative;
  height: 59vh;
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  margin-top: 2.5rem;

  .link {
    text-decoration: none;
    color: var(--Black);
  }

  .category_card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    transform: scale(0.9);
    transition: transform 0.2s ease;
    margin-top: 2rem;
    .imgBox {
      width: 20vh;
}
    .care_blue_hover {
      display: none;
      background-color: var(--Blue);
      width: 14rem;
      height: 100%;
    }

    &:hover {
      transform: scale(1);
      .category_name {
        color: #fff;
        @media (max-width: 1024px) {
          color: var(--Blue);
        }
      }

      .care_blue_hover {
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        left: calc(50% - 3.5rem);
        transform: skew(-20deg);
        @media (max-width: 1040px) {
          display: none;
        }
      }
    }
  }

  .category_name {
    z-index: 999;
    font-weight: 600;
    font-size: 1.3em;
    color: var(--Blue);
  }

  @media (max-width: 1024px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);

    margin-top: 3rem;
  }

  /* @media (max-width: 791px) {
    display: grid;
    grid-template-columns: 1fr;
  } */
`;
