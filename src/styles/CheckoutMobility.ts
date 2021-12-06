import styled from "styled-components";
import { IoMdRadioButtonOn, IoMdRadioButtonOff } from "react-icons/io";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  padding: 1rem 2rem;

  .content {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    width: 100%;
  }
`;

export const FormSection = styled.div`
  width: 100%;
`;

export const OrderSession = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  max-width: 600px;

  .products_list {
    list-style-type: none;
  }

  .cart_products {
    background-color: white;

    border: 3px solid var(--Blue);
    h2 {
      text-align: center;
      background-color: var(--Blue);
      color: var(--White);
      padding: 1rem;
      font-size: 1.7rem;
    }

    .prod_block {
      padding: 0 1rem;

      div + div {
        border-top: 1px solid;
        padding-top: 1rem;
      }
    }

    div.taxes {
      border-top: 2px solid var(--Blue);
    }

    h5 {
      border-top: 3px solid var(--Blue);
    }

    .total_block {
      padding: 0.7rem;
    }
  }

  .taxe_block {
    padding: 0.7rem;
  }

  .taxes {
    margin-top: 0.4rem;

    padding-top: 0.9rem;
    padding-left: 1rem;
    padding-right: 1rem;
    padding-bottom: 0.5rem;

    .taxes_item {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
  }

  h5.sousTotalTxt {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 0.4rem;
    margin-bottom: 1rem;
    padding: 0 1rem;

    padding-top: 1rem;

    span {
      font-size: 1.2rem;
    }
  }

  .btn_valider_commande {
    display: flex;
    justify-content: end;
    margin-top: 1rem;

    button {
      width: 21rem;
      height: 40px;

      border: none;
      background-color: var(--Blue);
      color: var(--White);
      font-weight: 600;
    }
  }
`;

export const Payment = styled.div`
  width: 100%;

  .payment_container {
    .button_block {
      display: flex;
    }

    .payment_list {
      margin-top: 1rem;
    }

    .payments_block {
      display: flex;
      flex-direction: column;
    }

    .btn_payment {
      margin-top: 1rem;
    }

    button {
      width: 100%;
      max-width: 300px;
      height: 40px;
      background-color: var(--Blue);
      color: var(--White);
      border: none;
      font-weight: 600;
    }
  }
`;

export const PaymentMethods = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 400px;
  padding: 0 1rem;

  .methods {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    padding: 5px 0;

    .method_name {
      font-size: 1.1rem;
      font-weight: 600;
    }
  }

  .desactive {
    pointer-events: none;
    color: var(--DarkGray);
  }

  div.selected {
    background-color: var(--Blue);
    color: white;
  }

  .logo_box {
    margin-right: 0.5rem;
  }
`;

export const ProductCart = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  margin-top: 0.4rem;

  .product_image {
    width: 100%;

    display: flex;
    flex-direction: row;
    align-items: center;
    padding-top: 0.4rem;
    padding-bottom: 1rem;

    span {
      margin-left: 1rem;
      font-size: 1.3rem;
      font-weight: 600;
    }
  }

  .product_price {
    width: 100px;
    font-weight: 600;
  }
`;

export const IoMdRadioButtonOk = styled(IoMdRadioButtonOn)`
  width: 25px;
  height: 25px;
  color: var(--Blue);

  margin-right: 1rem;
`;

export const IoMdRadioButtonNot = styled(IoMdRadioButtonOff)`
  width: 25px;
  height: 25px;
  color: var(--Blue);

  margin-right: 1rem;
`;
