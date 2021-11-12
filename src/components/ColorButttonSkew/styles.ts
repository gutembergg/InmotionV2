import styled, { css } from "styled-components";

interface Props {
  color: string;
}
export const Container = styled.div<Props>`
  width: 25px;
  height: 20px;
  transform: skew(-20deg);

  margin-left: 3px;
  margin-right: 3px;

  ${(props) =>
    props.color &&
    css`
      background: ${props.color};
    `}
`;
