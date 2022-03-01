import styled from "styled-components";

export const MainMenu = styled.ul`
  display: flex;
  align-items: flex-end;
  position: relative;
  list-style: none;
  /* font-weight: ; */
  margin: 0 20px;
  cursor: pointer;
  
 a {
    /* font-family: 'Bitter',sans-serif; */
    text-decoration: none;
    color: var(--Blue);
    font-weight: bold;

    &.active {
      color: var(--Red);
    }
  }

  > li {
    flex: 0 1 auto;
    margin: 0 20px;
    list-style: none;

    &:hover {
      a {
        color: var(--DarkGray);
        transition: color ease-in-out 0.1s;
      }
      > ul {
        visibility: visible;
        transform: scaleY(1);
        transition: all ease-in 0.1s;
      }
    }

    > ul {
      list-style: none;
      visibility: hidden;
      position: absolute;
      border-top: none;
      box-shadow: 0px 7px 8px 0px #2121211c;
      padding-top: 10px;
      z-index: 9999;
      margin-left: -20px;
      transform: scaleY(0);
      transform-origin: left 12px;
      transition: all ease-in-out 0.1s;
      width: max-content;
      > li {
        background-color: var(--White);
        padding: 10px 20px;

        a {
          color: var(--Blue);
        }

        &:hover {
          background-color: var(--Blue);

          a {
            color: var(--White);
          }
        }
      }
    }
  }
  @media screen and (max-width: 1280px) {
    > li {
      margin: 0 10px;
    }
  }
  // mobile menu display //
  @media screen and (max-width: 1024px) {
    align-items: flex-start;
    margin: 0 0px;
    flex-direction: column;

    > li {
      margin: 10px 0;

      > ul {
        visibility: visible;
        opacity: 1;
        transform: none;
        position: relative;
        box-shadow: none;
        margin: 0 0 0 10px;
        transform-origin: 0;
        padding: 0;

        > li {
          margin: 10px 0 10px 0;
          transform: skew(10deg);
          padding: 0;
          background-color: transparent;
          font-weight: 600;
          a {
            color: var(--DarkGray);
          }
          a::before {
            content: "- ";
          }
        }
      }
    }
  }
`;
