import styled, { css } from "styled-components";
import { shade } from "polished";

interface PropsBtnTable {
  btnColor: string;
}

export const MyOrders = styled.div`
  width: 100%;

  table {
    width: 100%;

    th {
      text-align: left;
      padding: 1rem;
      border-bottom: 3px solid var(--Blue);
    }

    td {
      background: var(--White);
      border-top: 1px solid;
      padding: 1rem;
    }

    td.footer {
      background: transparent;
    }

    td.btn_table {
      cursor: pointer;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background: transparent;
      transition: 0.2s linear;

      color: var(--Blue);

      &:hover {
        background: ${shade(0.1, "#a0a0a0")};
      }
    }

    td.btn_table_invoice {
      cursor: pointer;
      background: #868686;
      transition: 0.2s linear;

      &:hover {
        background: ${shade(0.2, "#868686")};

        button.btn_invoice {
          background: ${shade(0.2, "#868686")};
        }
      }
    }
  }

  td,
  th,
  tr,
  table {
    border-spacing: 0 !important;
  }

  @media (max-width: 716px) {
    overflow-x: scroll;
  }
`;

export const BtnTable = styled.button<PropsBtnTable>`
  ${(props) =>
    props.btnColor &&
    css`
      background: ${props.btnColor};
    `}
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  border: none;
  color: var(--Blue);
  transition: 0.2s linear;

  span.invoiceIcon {
    color: var(--White);
  }
`;
