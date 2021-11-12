import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const MainContent = styled.div`
  display: flex;
  justify-content: space-around;

  margin-top: 1.5rem;

  @media (max-width: 791px) {
    flex-direction: column;
  }
`;

