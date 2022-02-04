import styled, { css, keyframes } from "styled-components";

interface ListItemsProp {
  mobilePadding?: string;
}

export const Container = styled.div`
  width: 85%;
  max-width: 1600px;
  margin: auto;
  margin-top: 4rem;
  margin-bottom: 2rem;
`;

export const Welcome = styled.div`
  text-align: center;
  margin-top: 1rem;
  margin-bottom: 1rem;
  font-size: 1.2rem;
`;

export const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  padding-top: 4rem;

  @media (max-width: 1040px) {
    flex-direction: column;
  }
`;

export const UserComponents = styled.div`
  width: 100%;
`;

export const SideBarMenuMobile = styled.div`
  display: none;

  @media (max-width: 1040px) {
    position: relative;
    display: block;
    margin-bottom: 1.4rem;
  }
`;

export const BtnMobile = styled.button`
  width: 100%;
  max-width: 400px;
  height: 2.6rem;
  background: var(--Blue);
  color: var(--White);
  border: none;
`;

export const MenuListMobile = styled.div`
  position: absolute;
  top: 40px;
  left: 0;
  width: 100%;
  max-width: 400px;
  background: var(--White);
  box-shadow: 1px 1px 10px #0000002e;
`;

export const SideBarMenu = styled.div`
  width: 90%;
  display: flex;
  justify-content: center;
  padding-top: 2rem;

  @media (max-width: 1040px) {
    display: none;
  }
`;

export const MenuList = styled.ul`
  display: flex;
  flex-direction: column;
`;

export const ListItem = styled.li<ListItemsProp>`
  list-style: none;

  ${(props) =>
    props.mobilePadding &&
    css`
      padding: ${props.mobilePadding};
    `}

  .icon_menu_bar {
    cursor: pointer;
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
  }

  .menu_selected {
    color: var(--Blue);
  }

  p {
    font-size: 1.4rem;
    font-weight: 600;
    margin-left: 0.7rem;
  }

  &:hover {
    color: var(--Blue);
  }
`;
