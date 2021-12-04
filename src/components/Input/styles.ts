import styled, { css } from 'styled-components'

interface IProps {
  isFocused: boolean
  isFilled: boolean
}

export const Container = styled.div<IProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  background: var(--White);
  border: 2px solid var(--DarkGray);
  border-radius: 4px;
  width: 100%;
  height: 42px;
  padding: 10px 15px;
  margin-bottom: 10px;
  &::placeholder {
    color: #a5a5a5;
  }
  > svg {
    margin-right: 5px;
    color: var(--Blue);
  }
  ${props =>
    props.isFocused &&
    css`
      svg {
        color: var(--Blue);
      }
      border-color: var(--Blue);
    `}
  ${props =>
    props.isFilled &&
    css`
      svg {
        color: var(--Blue);
      }
    `}
  > input {
    flex: 1;
    background: transparent;
    padding-left: 10px;
    width: 90%;
    border: none;
    outline: none;
    font-size: 1.3em;
    color: var(--Black);
  }
  .display_password {
    cursor: pointer;
  }
`