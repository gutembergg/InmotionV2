import styled, { css } from "styled-components";

interface IProps {
  isFocused: boolean;
  isFilled: boolean;
}

export const Container = styled.p`
 margin-top:10px;
 a{ 
   color: var(--Blue);
   &:hover{
     color: var(--BlueHover)
   }
 }
`;
