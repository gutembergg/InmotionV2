import styled from "styled-components";

export const StyledFooterBlock = styled.section`
  h1 {
    /* visibility: hidden; */
    height: 0;
    width: 0;
    line-height: 0;
    opacity: 0;
    display: none;
  }
  display: flex;
  bottom: 0;
  background-color: #f6f6f6;
  width: 100%;
  right: 0;
  padding: 33px 5%;
  color: var(--Black);
  justify-content: space-between;
  align-items: flex-start;
  box-shadow: 0px -3px 5px 0px #00000026;
  @media (max-width: 730px) {
    padding: 20px 2%;
  }
  @media (max-width: 660px) {
    flex-direction: column;
    width: 100%;
    align-items: start;
    > div {
      padding-left: 1rem;
      margin: 20px 0;
    }
  }

  h2 {
    font-size: 1em;
  }
  .box1 {
    display: flex;
    flex: 0 1 10%;
    @media (max-width: 960px) {
      display: none;
      visibility: hidden;
    }
    .logobox {
      position: relative;
      width: 100%;
      height: 100px;
    }
  }
  a {
    text-decoration: none;
    color: var(--Blue);
    margin: 10px 0;
    display: block;
    &:hover {
      color: var(--BlueHover);
      text-decoration: underline;
    }
  }
`;
