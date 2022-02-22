import styled from "styled-components";

export const Container = styled.div``;

export const FormContainer = styled.div``;

export const PasswordConfig = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1.8rem;

  h4 {
    margin-bottom: 1rem;
  }

  div {
    display: flex;
    align-items: center;
  }

  input {
    height: 40px;
    padding: 0.4rem;
  }

  button {
    height: 40px;
    padding: 0.4rem;
    color: var(--White);
    background: var(--Blue);
    font-weight: 600;
    border: none;
  }
`;
