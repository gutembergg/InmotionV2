import styled from "styled-components";

export const Container = styled.div``;

export const MainContent = styled.div`
  position: relative;

  /* display: flex;
  justify-content: space-around; */

  display: grid;
  grid-template-columns: repeat(4, 1fr);

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

    .care_blue_hover {
      display: none;
      background-color: var(--Blue);
      width: 12rem;
      height: 20.5rem;
    }

    &:hover {
      transform: scale(1);
      .category_name {
        color: #fff;
      }

      .care_blue_hover {
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        left: 95px;
        transform: skew(-20deg);
      }
    }
  }

  .category_name {
    z-index: 999;
    font-weight: 600;
  }

  @media (max-width: 1040px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);

    margin-top: 3rem;
  }

  @media (max-width: 791px) {
    display: grid;
    grid-template-columns: 1fr;
  }
`;
