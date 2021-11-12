import styled from "styled-components";

export const StyledFilAriane = styled.div`
  flex: auto;
  margin-right: 30px;
  margin-top:20px;
  display: flex;
  justify-content: flex-end;
  
  nav {
    ol {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      li {
        list-style: none;
        margin: 0 4px;
        a {
          color: var(--Blue);
          text-decoration: none;
          transition: text-shadow .2s;
          &:hover{
            text-shadow: 0 0 .65px var(--Blue), 0 0 .65px var(--Blue);
        }  
    }
    &::after {
        content: "/";
        margin-left: 4px;
    }
    &:last-child {
        a {
              text-shadow: none;
            font-weight: bold;
            color: var(--Black);
        }
        }
        &:last-child::after {
          content: "";
        }
      }
    }
  }
`;
