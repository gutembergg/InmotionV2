import styled from "styled-components";

export const StyledHeader = styled.header`
  .topBlock {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  .mainBlock {
    width: 100%;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    border-bottom: 2px solid var(--Blue);
    padding-bottom: 10px;

    .logoBox {
      width: 350px;
      transition: all ease-in 0.2s;
    }
    .rightContent {
      display: flex;
    }
  }

  .bottomBlock {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    p {
      margin-top: 15px;
      flex: 0 1 37%;
    }
  }
  @media screen and (max-width: 1280px) {
    .mainBlock {
      .logoBox {
        width: 290px;
        transition: all ease-in 0.2s;
        margin-top: 10px;
      }
    }

    display: block;

    @media screen and (max-width: 1024px) {
      display: none;
    }
  }
`;
