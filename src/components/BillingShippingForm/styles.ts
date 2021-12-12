import styled from "styled-components";

import { shade } from "polished";

export const Container = styled.div`
  display: flex;
  flex-direction: row;

  .form {
    display: flex;
    flex-direction: column;
  }

  .forms_session {
    display: flex;
    flex-direction: row;
    gap: 1rem;

    @media (max-width: 1200px) {
      flex-direction: column;
    }
  }

  .form_1 {
    display: flex;
    flex-direction: column;
    gap: 0.7rem 0;
    width: 100%;
    padding-top: 1rem;

    .input_block {
      display: flex;
      flex-direction: column;
      width: 100%;

      .erros {
        border: 2px solid red;
      }
      input {
        width: 100%;
        padding: 7px;
      }

      .input_erros {
        font-size: 0.7rem;
        color: red;
      }
    }
  }

  .form_2 {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 0.7rem 0;
    padding-top: 1rem;

    .input_block {
      display: flex;
      flex-direction: column;

      .erros {
        border: 2px solid red;
      }
      input {
        width: 100%;
        padding: 7px;
      }

      .input_erros {
        font-size: 0.7rem;
        color: red;
      }
    }
    select {
      width: 100%;
      padding: 7px;
      color: var(--DarkGray);

      option {
        color: var(--DarkGray);
      }
    }
  }

  .isShippingForm {
    display: flex;
    align-items: center;

    span {
      margin-left: 4px;
    }

    input[type="checkbox"] {
      height: 20px;
      width: 20px;
    }
  }
`;

export const FormSession = styled.div`
  width: 100%;

  .wrapper_checkBox {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .btn_register {
    display: flex;
    justify-content: end;
  }
`;

export const ButtonRegiste = styled.button`
  height: 45px;
  width: 100%;
  max-width: 300px;

  background: var(--Blue);
  color: var(--White);
  font-weight: 600;
  font-size: 1rem;
  border: none;
  margin-top: 1rem;

  &:hover {
    background: ${shade(0.2, "#0570A6")};
  }
`;
