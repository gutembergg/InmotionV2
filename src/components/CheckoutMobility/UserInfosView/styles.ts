import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;

  padding: 1.8rem;

  li {
    list-style: none;
  }

  .title {
    font-weight: 600;
    margin-bottom: 3rem;
  }

  @media (max-width: 1200px) {
    flex-direction: column;

    div + div {
      margin-top: 1.4rem;
    }
  }
`;
