import styled from "styled-components";

export const LoginContainer = styled.div`
  & > * > * > * {
    transform: skew(15deg);
  }
  p,
  a {
    transform: skew(15deg);
  }

  #sendButton {
    background-color: var(--Blue);
    border: none;
    padding: 10px 20px;
    color: var(--White);
    font-weight: bold;
    margin: 15px 0;
    width: 100%;
    cursor: pointer;
  }
`;
export const LoginLink = styled.div`
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;
export const LogoutLink = styled.div`
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;
