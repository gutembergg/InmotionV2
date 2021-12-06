import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
`;

export const StyledCheckout = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;

  h1 {
    margin-top: 30px;
    width: 100%;
    text-align: center;
    background-color: var(--DarkGray);
    color: var(--White);
    padding: 10px 0;
  }
`;

export const FormSession = styled.div`
  padding: 20px;
  width: 100%;
  max-width: 750px;
`;

export const OrderSession = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 3.5rem 2.5rem;
  width: 100%;
  max-width: 700px;

  .products_list {
    list-style-type: none;
  }

  .cart_products {
    width: 300px;
    max-width: 300px;
  }
`;

export const Payment = styled.div`
  width: 100%;

  .payment_container {
    .button_block {
      display: flex;
      justify-content: center;
    }

    .payment_list {
      margin-top: 1rem;
    }

    .payments_block {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
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
  padding: 0 3rem;

  .methods {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    padding: 5px 8px;
  }

  .desactive {
    pointer-events: none;
    color: var(--DarkGray);
  }

  div.selected {
    background-color: var(--Blue);
    color: white;
  }

  &:hover {
    background-color: var(--LightGray);
  }

  .logo_box {
    margin-right: 0.5rem;
  }
`;
