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
    flex-direction: row;
    width: 100%;
    padding-top: 1rem;
    align-content: center;
    flex-wrap: wrap;
    justify-content: space-between;
    .left {
      flex: 0 1 49%;
    }
    .right {
      flex: 0 1 49%;
    }
    .inputcontent {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
    justify-content: space-between;
    }
    .input_block {
      display: flex;
      flex-direction: column;
      flex: 0 1 49%;

      .erros {
        border: 2px solid red;
      }
      input {
        width: 100%;
        padding: 7px;
        margin-bottom: 10px;
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
  }
`;

export const FormSession = styled.div`
  width: 100%;
  position: relative;
  .wrapper_checkBox {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
`;

export const ButtonRegiste = styled.button`
  height: 30px;
  width: 100%;
  max-width: 300px;
  position: absolute;
  right: 0;
  bottom: 0;

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
