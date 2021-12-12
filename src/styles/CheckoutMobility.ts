import styled from "styled-components";
import { IoMdRadioButtonOn, IoMdRadioButtonOff } from "react-icons/io";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100%;

  h1 {
    text-align: center;
    margin-top: 2rem;
  }

  @media (max-width: 400px) {
    margin-top: 40px;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  .content {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    width: 100%;
    margin-top: 2.5rem;

    @media (max-width: 877px) {
      flex-direction: column;
    }
  }
`;

export const FormSection = styled.div`
  width: 100%;

  section.sections_title {
    padding-right: 3rem;

    h2 {
      background-color: var(--Blue);
      color: var(--White);
      font-weight: 600;
      font-size: 1.7rem;
      padding: 1rem;
    }
  }

  section.shipping {
    margin-top: 3rem;
    padding-right: 3rem;
    h2 {
      background-color: var(--DarkGray);
      color: var(--White);
      font-weight: 600;
      font-size: 1.7rem;
      padding: 0.7rem;
    }
  }

  section.code_promo {
    margin-top: 3rem;
    padding-right: 3rem;
    h2 {
      background-color: var(--DarkGray);
      color: var(--White);
      font-weight: 600;
      font-size: 1.7rem;
      padding: 0.7rem;
    }
  }

  @media (max-width: 400px) {
    section.sections_title {
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding-right: 0;
    }

    section.shipping {
      padding-right: 0;
    }

    section.code_promo {
      padding-right: 0;
    }
  }
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

      @media (max-width: 400px) {
        font-size: 0.8rem;
      }

      div {
        font-size: 0.8rem;
      }
    }
  }

  .coupons_block {
    display: flex;
    flex-direction: column;

    .coupons {
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

  div.payment_block {
    display: flex;
    justify-content: end;
    width: 100%;
  }

  @media (max-width: 877px) {
    display: flex;
    justify-self: center;
    align-self: center;
  }

  @media (max-width: 400px) {
    margin-top: 1.4rem;
  }
`;

export const Payment = styled.div`
  width: 100%;
  max-width: 340px;
  display: flex;
  margin-top: 1.4rem;

  .payment_container {
    width: 100%;
    .button_block {
      display: flex;

      button {
        width: 100%;
        max-width: 340px;
      }

      .disabled {
        cursor: not-allowed;
      }

      .btn_payment_method {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;

        span + span {
          margin-left: 1rem;
        }
      }
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

    .spiner {
      width: 300px;
      display: flex;
      justify-content: center;
      margin-top: 1rem;
    }

    button {
      width: 100%;
      max-width: 300px;
      height: 45px;
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
    display: flex;
    justify-content: end;
    padding-right: 0.7rem;
    width: 170px;
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

export const BtnCouponsBlock = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 1rem;

  button + button {
    margin-left: 0.5rem;
  }

  button {
    background: var(--Blue);
    color: var(--White);
    height: 40px;
    width: 200px;
    padding: 0.7rem;

    border: none;
  }
`;
