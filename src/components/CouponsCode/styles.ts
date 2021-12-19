import styled from "styled-components";

export const Container = styled.div`
  form {
    display: flex;
    flex-direction: row;
    align-items: center;

    @media (max-width: 416px) {
      flex-direction: column;

      p {
        margin-bottom: 1rem;
      }
    }
  }

  div.input_block {
    display: flex;
    flex-direction: row;
  }

  @media (max-width: 416px) {
    div.input_block {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      button {
        border: none;
        width: 100%;

        margin-top: 1rem;
      }
    }
  }

  p {
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
