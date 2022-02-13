import styled from "styled-components";

export const OrderContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  padding-top: 2rem;

  h1 {
    text-align: center;
    margin-bottom: 1.5rem;
  }

  .imageThank {
    position: relative;
    align-items: right;
    width: 350px;
    height: 200px;

    p {
      position: absolute;
      bottom: 45px;
      right: -15px;
      font-weight: bold;
      color: var(--Blue);
    }
  }

  .orderInfos {
    margin-top: 1rem;
  }

  .orderDetails {
    margin-top: 1.2rem;

    ul {
      padding-left: 1.4rem;
      list-style: none;
      margin-bottom: 0.8rem;
    }
  }

  .title {
    padding-left: 1.4rem;
    padding-bottom: 0.5rem;
  }

  address {
    padding: 0.6rem 1rem;
  }

  .shippingBillingInfo {
    margin-top: 1rem;
  }
`;

export const OrderInfos = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 0.6rem;

  h4 {
    margin-right: 0.5rem;
  }
`;

export const ProductInfos = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 0.6rem;

  p + p {
    margin-left: 0.5rem;
  }
`;
