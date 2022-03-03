import styled from "styled-components";
import { AiFillPlayCircle } from "react-icons/ai";

export const Container = styled.li`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0;
  border-bottom: 1px solid var(--LightGray);
  .onsale{
    color: var(--Red);
    font-weight:bold;
    font-size:1em;
  }
`;

export const ProductBlock = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  div.image {
    height: 100px;
    width: 100px;
    position: relative;

    @media (max-width:480px){
      height: 50px;
    width: 50px;
    }
  }
  
  div.prod_info {
    margin-left: 0.7rem;
    @media (max-width:480px){
margin-left: 0 ;
gap: 5px;
    }
  }
`;

export const ProductInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 20px;

  h4 {
    font-size: 1rem;
    color: var(--BlueHover);
  }

  span {
    color: var(--Black);
    font-weight: bold;
    font-size: 0.95em;
  }
  span.span_currency {
    margin-right: 0.5rem;
  }
`;

export const BtnAddToCart = styled.button`
  width: 200px;
  height: 30px;
  padding: 0 2rem;

  background: var(--Blue);
  border: none;
  color: var(--White);
  transition: 0.2s ease;

  &:active {
    transform: scale(0.9);
  }

  a {
    text-decoration: none;
    color: var(--White);
  }

  &:hover {
    background: var(--BlueHover);
  }
`;

export const IconFleche = styled(AiFillPlayCircle)`
  color: var(--Blue);
  font-size: 24px;

  &:active {
    transform: scale(0.9);
  }
`;

export const BtnDetail = styled.div`
  margin-left: 1rem;
`;
