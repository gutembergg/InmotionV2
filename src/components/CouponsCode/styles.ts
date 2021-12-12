import styled from "styled-components";

export const Container = styled.div`
  form {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  label {
    margin-right: 0.7rem;
  }
  button {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 1.7rem;
    background: var(--Blue);
    color: var(--White);

    padding: 0.5rem;
  }
`;
