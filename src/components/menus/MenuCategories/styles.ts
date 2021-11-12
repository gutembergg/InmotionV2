import styled from "styled-components";

export const Container = styled.div`
  padding: 1rem 1.5rem;

  @media (max-width: 790px) {
    order: -1;
    display: flex;
    justify-content: center;
  }
`;

export const CategoriesList = styled.ul`
  list-style: none;
  text-align: end;
  cursor: pointer;

  .active {
    color: var(--Blue);
  }

  .article_block {
    position: relative;

    .articles_title {
      position: relative;
      text-align: center;
      border: 1px solid var(--Red);
      min-height: 40px;
      min-width: 200px;
      padding: 6px 0;

      background: var(--Red);
      color: #fff;
      font-size: 1.2rem;
      transform: skew(-20deg);
    }

    .title {
      position: absolute;
      top: 20%;
      left: 33%;

      font-size: 1.2rem;
      color: #fff;
    }
  }

  .all_articles_title {
    margin: 10px 0;
    font-weight: 600;
  }
`;

export const CategoryItem = styled.li`
  font-weight: 600;

  &:nth-child(6) {
    margin-bottom: 15px;
  }
`;

export const CategoryName = styled.ul`
  list-style: none;

  .active {
    color: var(--Blue);
  }
`;

export const CategoryNameLi = styled.li`
  margin-left: 20px;
`;
