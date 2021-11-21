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

  h1{
    margin-top:30px;
    width: 100%;
    text-align:center;
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
  padding: 3.5rem 2.5rem;
  width: 100%;
  max-width: 700px;

  .products_list {
    list-style-type: none;
  }
`;

export const Payment = styled.div``;
