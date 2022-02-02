import styled from "styled-components";

export const Container = styled.div`
  width: 85%;
  max-width: 1600px;
  margin: auto;
  margin-bottom: 2rem;
`;

export const Welcome = styled.div`
  text-align: center;
  margin-top: 1rem;
  margin-bottom: 1rem;
  font-size: 1.2rem;
`;
export const MyOrders = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 3rem;

  ul {
    width: 100%;
    max-width: 900px;
  }
`;

export const FormContainer = styled.div`
  margin-top: 3rem;
`;

export const OrdersList = styled.ul`
  display: flex;
`;

export const OrderItem = styled.li`
  cursor: pointer;
  list-style: none;
  margin-right: 1rem;
`;
