import styled from "styled-components";

export const StyledFooter = styled.div`
  display: flex;
  bottom: 0;
  background-color: var(--Black);
  width: 100%;
  right: 0;
  padding: 6px 5%;
  color: var(--White);
  justify-content: space-between;
  align-items: center;
.footerLinks{
@media (max-width:540px){
  display: none;
}
    a {
        color: var(--White);
        text-decoration: none;
        border-bottom: 1px solid transparent;
        transition: all ease-in 0.1s;
    }
    
    a:hover {
        border-bottom: 1px solid var(--White) ;
        transition: all ease-in 0.2s;
    }
}
    
  .socialLinks {
    flex: 0 0 65px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 4px;

    a {
      transition: all ease-in 0.1s;
      transform: scale(1);
    }
    a:hover {
      transform: scale(1.2);
      transition: all ease-in 0.1s;
    }
  }
`;
