import styled from "styled-components";
import { AiFillPlayCircle } from "react-icons/ai";

export const Container = styled.li`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0;
  border-bottom: 1px solid var(--LightGray);
`;

export const ProductBlock = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  div.image {
    min-height: 70px;
    min-width: 70px;
  }

  div.prod_info {
    margin-left: 0.7rem;
  }
`;

export const ProductInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 20px;

  h4 {
    font-size: 0.8rem;
  }
`;

export const BtnAddToCart = styled.button`
  width: 200px;
  height: 30px;
  padding: 0 2rem;

  background: var(--Blue);
  border: none;
  color: var(--White);
`;

export const IconFleche = styled(AiFillPlayCircle)`
  color: var(--Blue);
  font-size: 24px;
`;

export const BtnDetail = styled.div`
  margin-left: 1rem;
`;
