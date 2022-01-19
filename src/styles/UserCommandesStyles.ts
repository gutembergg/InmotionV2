import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;

  h1 {
    text-align: center;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 200px;

  margin-top: 1.4rem;
`;

export const OrderInfos = styled.div``;

export const OrderItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 1.2rem;

  h4 {
    margin-right: 0.6rem;
  }

  margin-top: 0.7rem;
`;

export const ResumeWrapper = styled.div``;

export const OrderResume = styled.div`
  .product_list {
    padding: 0.5rem 1rem;

    li {
      list-style: none;
    }
  }
`;

export const OrderShipping = styled.div`
  margin-top: 0.7rem;
  address {
    padding: 1rem;
  }
`;
