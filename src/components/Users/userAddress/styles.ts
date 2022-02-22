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
`;

export const InputBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;

  input {
    height: 40px;
    width: 100%;
    max-width: 300px;
    padding: 0.4rem;
    margin-bottom: 1rem;
  }

  button {
    height: 40px;
    padding: 0.4rem;
    color: var(--White);
    background: var(--Blue);
    font-weight: 600;
    border: none;
    transition: 0.2s ease;

    &:hover {
      background: var(--BlueHover);
    }
  }
`;
