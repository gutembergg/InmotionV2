import styled from "styled-components";

export const LoginContainer = styled.div`
  & > * > * > * {
    transform: skew(15deg);
    @media (max-width: 540px) {
      transform: none;
    }
  }
  p,
  a {
    transform: skew(15deg);
    @media (max-width: 540px) {
      transform: none;
    }
    &.createAccount {
      text-decoration: none;
      transform: skew(15deg);
      font-weight: bold;
      color: var(--BlueHover);
      text-align: center;
      display: flex;
      flex-direction: column;
      align-content: center;
      &:hover {
        text-decoration: underline;
      }
    }
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
  color: var(--White);
  transition: all ease-in 0.1s;
  display: flex;
  align-items: center;
  margin-right: 10px;

  span {
    color: var(--White);
  }

  /* @media (max-width: 1024px) {
    width: 50px;
    margin-right: 15px;
    svg {
      fill: var(--Blue);
    }
    span {
      width: 0;
      display: none;
    }
  } */
  @media only screen and (-webkit-min-device-pixel-ratio: 2) and (max-width: 1400px) {
    width: 40px;
    margin-right: 10px;
    svg {
      fill: var(--Blue);
    }
    span {
      width: 0;
      display: none;
    }
  }
  @media only screen and (max-width: 1024px) {
    width: 40px;
    margin-right: 10px;
    svg {
      fill: var(--Blue);
    }
    span {
      width: 0;
      display: none;
    }
  }

  @media (max-width: 640px) {
    width: 40px;
    margin-right: 15px;
  }

  &:hover {
    color: var(--Black);
    transition: all ease-in 0.1s;
  }

  span {
    display: flex;
    flex-direction: row;
    padding: 0.3rem;
    @media only screen and (-webkit-min-device-pixel-ratio: 2) {
      display: none;
    }
    @media only screen and (max-width: 1024px) {
      display: none;
    }
  }
`;

export const MyAccountLink = styled.div`
  cursor: pointer;
  margin-top: 0px;
  color: var(--White);
  transition: all ease-in 0.1s;
  &:hover {
    transition: all ease-in 0.1s;
  }
  a {
    text-decoration: none;
    color: var(--White);
    @media screen and (max-width: 1024px) {
      color: var(--Blue);
    }
    div {
      display: flex;
      align-items: center;
      @media screen and (max-width: 1024px) {
        svg {
          font-size: 30px;
        }
        margin: 0 25px;
      }

      span {
        margin-left: 12px;
        margin-right: 20px;
        @media screen and (max-width: 1024px) {
          display: none;
        }
      }
    }
  }
`;
