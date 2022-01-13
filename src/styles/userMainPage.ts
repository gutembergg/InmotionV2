import styled from "styled-components";

export const LogoutLink = styled.div`
  cursor: pointer;
  margin-top: 10px;
  color: var(--Blue);
  font-weight: bold;
  transition: all ease-in 0.1s;
  &:hover {
    color: var(--Black);
    transition: all ease-in 0.1s;
  }
  p {
    display: flex;
    align-items: center;

    span {
      margin-left: 12px;
      margin-right: 20px;
    }
  }
`;