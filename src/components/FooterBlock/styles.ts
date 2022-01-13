import styled from "styled-components";

export const StyledFooterBlock = styled.div`

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

  h2{
    font-size:1em
  }
  .box1 {
    display: flex;
    flex: 0 1 10%;
    .logobox {
      position: relative;
      width: 100%;
      height: 100px;
    }
  }
`;
