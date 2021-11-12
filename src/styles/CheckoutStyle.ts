import styled from "styled-components";

export const StyledCheckout = styled.div`
  display: flex;

  Form {
    display: flex;
    flex-wrap: wrap;
    .shippingForm,
    .billingForm {
      > div {
        display: flex;
        flex-direction: column;
      }
    }
    button {
      flex: 0 1 200px;
    }
  }
`;
