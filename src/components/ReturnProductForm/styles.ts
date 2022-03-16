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
    @media (max-width: 640px){
      flex-direction: column;
      align-content: stretch;
    }
    .left {
      flex: 0 1 49%;
      @media (max-width: 640px){
        flex: 0 1 100%;
      }
    }
    .right {
      flex: 0 1 49%;
      @media (max-width: 640px){
        margin-top: 40px;
        flex: 0 1 100%;
        align-content: stretch;
      }
    }
    .inputcontent {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
    justify-content: space-between;
    @media (max-width: 960px){
      flex-direction: column;
    }
    }
    .input_block {
      display: flex;
      flex-direction: column;
      flex: 0 1 49%;
      @media (max-width: 640px){
        flex: 0 1 100%;
      }

      .erros {
        border: 2px solid red;
      }
      input {
        width: 100%;
        padding: 7px;
        margin-bottom: 10px;
      }

      textarea{
        min-height: 100px;
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
  position: relative;
  margin-bottom:20px;

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
