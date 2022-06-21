import styled from "styled-components";

export const B2BLogin = styled.div`
  display: flex;
  width: 90%;
  max-width: 500px;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  align-items: center;
  margin: 0 auto;
  min-height: 57vh;
  margin-bottom: 3rem;
  .logoBox {
    position: relative;
    width: 70%;
    height: 100px;
  }
  h2 {
    text-align: center;
    font-size: 1em;
    color: var(--BlueHover);
    margin-bottom: 10px;
    z-index: 3;
    position: relative;
  }
  form {
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    #sendButton {
      width: 100%;
      max-width: 300px;
      height: 50px;
      background: var(--Blue);
      color: var(--White);
      border: none;
      font-size: 1.2rem;
      transition: 0.2s ease;
      margin-top: 20px;
      &:active {
        transform: scale(1.02);
      }
      &:hover {
        transform: scale(1.02);
      }
    }
    .createLink {
      text-decoration: none;
      color: var(--Blue);
      font-weight: bold;
      border-bottom: 3px solid;
      margin-top: 6px;
      transition: all ease-in 0.1s;
      &:hover {
        transform: scale(1.03);
        transition: all ease-in 0.1s;
      }
    }
  }
`;
