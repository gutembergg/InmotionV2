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
  margin-top: 10px;
  color: var(--Blue);
  font-weight: bold;
  transition: all ease-in 0.1s;
  display: flex;
  align-items: center;
  &:hover {
    color: var(--Black);
    transition: all ease-in 0.1s;
  }
  span {
    margin-left: 12px;
    margin-right: 20px;
    
    @media (max-width: 1024px) {
          display: none;
        }
    
  }
`;
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
export const MyAccountLink = styled.div`
  cursor: pointer;
  margin-top: 10px;
  color: var(--Blue);
  font-weight: bold;
  transition: all ease-in 0.1s;
  &:hover {
    transition: all ease-in 0.1s;

    a {
      color: var(--Black);
    }
  }
  a {
    text-decoration: none;
    color: var(--Blue);
    div {
      display: flex;
      align-items: center;

      span {
        margin-left: 12px;
        margin-right: 20px;
      }
    }
  }
`;
