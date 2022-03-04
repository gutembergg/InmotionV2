import styled from "styled-components";

export const StyledModalBody = styled.div`
  padding-top: 10px;
`;

export const StyledModalHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  font-size: 25px;

  .closeButton {
    height: 20px;
    width: 20px;
    position: relative;
    box-sizing: border-box;
    line-height: 20px;
    display: inline-block;
    border: none;
    background-color: transparent;
    transform: skew(15deg);
    margin-bottom: 5px;
    @media (max-width: 540px) {
transform: none;
    }
    &:before,
    &:after {
      transform: rotate(-45deg);
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      margin-top: -1px;
      margin-left: -10px;
      display: block;
      height: 3px;
      width: 20px;
      background-color: var(--Red);
      transition: all 0.25s ease-out;
    }

    &:after {
      transform: rotate(-135deg);
    }

    &:hover {
      &:before,
      &:after {
        transform: rotate(0deg);
      }
    }
  }
`;

export const StyledModal = styled.div`
  background: rgb(242, 20, 43);
  background: linear-gradient(
    90deg,
    rgba(242, 20, 43, 1) 72%,
    rgba(242, 20, 43, 0) 72%,
    rgba(242, 20, 43, 0) 100%
  );
  width: 96vw;
  max-width: 410px;
  padding: 15px;
  transform: skew(-15deg);
  display: flex;
  align-content: flex-start;
  justify-content: flex-start;
  align-items: flex-start;
  @media (max-width: 540px) {
    flex-direction: column;
    background: rgb(242, 20, 43);
    background: linear-gradient(
      90deg,
      rgba(242, 20, 43, 1) 100%,
      rgba(242, 20, 43, 0) 100%,
      rgba(242, 20, 43, 0) 100%
    );
    width: 96vw;
    max-width: none;
    transform: none;
    padding: 5px;
  }
  h3 {
    writing-mode: vertical-rl;
    transform: skew(15deg) rotate(195deg);
    color: var(--White);
    margin-right: 5px;
    margin-top: 15px;
    text-transform: uppercase;
    letter-spacing: 0.09rem;
    font-size: 1.2em;
    @media (max-width: 540px) {
      writing-mode: inherit;
      transform: none;
      margin-top: 0px;
    }
  }
  .modalContainer {
    background-color: var(--White);
    display: flex;
    margin-top: 5%;
    padding: 20px;
    flex-direction: column;
    margin-bottom: 5%;
    @media (max-width: 540px) {
    margin-top: 5px;
    padding: 10px;
    margin-bottom: 5px;
    width: 100%;
    }
  }
`;
export const StyledModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9000;
`;
