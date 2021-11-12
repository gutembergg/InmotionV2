import styled from "styled-components";

export const Container = styled.div`
  .article_block {
    position: relative;
    width: 100%;

    .articles_title {
      width: 100%;
      max-width: 300px;
      border: 1px solid var(--Red);
      min-height: 40px;
      min-width: 100px;
      background: var(--Red);
      color: #fff;
      font-size: 1.2rem;
      transform: skew(-20deg);
      display: flex;
      align-items: center;
      justify-content: center;

      padding-left: 1rem;
      padding-right: 1rem;
    }

    .title {
      transform: skew(20deg);
      font-size: 1.2rem;
      color: #fff;
    }
  }
`;
