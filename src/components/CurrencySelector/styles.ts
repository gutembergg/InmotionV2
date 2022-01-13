import styled from "styled-components";

export const CurrencySelectorStyle = styled.div`
  display: flex;
  margin: 5px 20px 0 20px;

  .ImgBox {
    margin-right: 7px;
  }
  select {
    border: none;
    background-color: var(--Blue);
    color: var(--White);
    margin-top: -5px;
    options {
      outline: none;
      box-shadow: none;
    }
    &:focus {
      user-select: none;
      outline: none;
    }
  }
`;
