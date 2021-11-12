import styled from "styled-components";


export const StyledHeader = styled.header`
  .topBlock {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    a{
      transform: scale(0.9);
      text-decoration: none;
      transition: all ease 0.1s;
      &:hover{
        transform: scale(1);
        transition: all ease 0.1s;
      }
    }
  }
  .mainBlock {
    width: 100%;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    border-bottom: 2px solid var(--Green);
    padding-bottom: 10px;

    .logoBox {
      width: 350px;
      transition: all ease-in 0.2s;
    }
    .rightContent {
      display: flex;
    }
  }

  .bottomBlock {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    p {
      margin-top: 15px;
      flex: 0 1 37%;
    }
  }
  @media screen and (max-width: 1280px) {
    .mainBlock {
      .logoBox {
        width: 290px;
        transition: all ease-in 0.2s;
        margin-top: 10px;
      }
    }

    display: block;

    @media screen and (max-width: 1024px) {
      display: none;
    }
  }
`;
export const LinkMobility = styled.div`
display:flex;
border-bottom-left-radius: 10px;
border-bottom-right-radius: 10px;
margin-right: 35px;
padding: 5px 15px;
color: var(--Red);
font-weight: bold;
text-decoration: none;
align-items: center;
.iconLink{
  margin-right: 10px;
  width: 30px;
  height: auto;
}

`

export const LinkPrint = styled.div`
display:flex;
border-bottom-left-radius: 10px;
border-bottom-right-radius: 10px;
margin-right: 35px;
padding: 5px 15px;
color: var(--Blue);
font-weight: bold;
text-decoration: none;
align-items: center;

.iconLink{
  margin-right: 10px;
  width: 30px;
  height: auto;
  image{
    object-fit: contain;
    width: 100%;
    height:100%;
  }
}
`

