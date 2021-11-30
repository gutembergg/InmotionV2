import styled from "styled-components";

export const MenuSearchBar = styled.div`

  display: flex;
  border-bottom: 1px solid var(--Black);
  margin-right: 25px;

  input {
    border: none;
    background-color: transparent;
    width: 100%;

    &:focus {
      outline: none;
    }
  }
  .searchIcon {
    width: 25px;
  }

  @media screen and (max-width: 1024px) {
display:none  }
`;

export const MobileMenuSearchBar = styled.div`
  @media screen and (min-width: 1025px) {
display:none  }

input{
  position: absolute;
  width: 74%;
  left: 13%;
  position: absolute;
  padding: 15px;
  border: none;
  box-shadow: 0 3px 3px #0000002b;
    border-top: 2px solid var(--DarkGray);
    transition: all 0.2;
    display: inline-block;
    &.close{
      display: none;
      top: -10%;
    }
  &:focus {
      outline: none;
    }
}
`;