import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  margin:0 auto;
  margin-top: 20px;
  flex: 0 1 auto;
  @media (max-width:768px){
    margin-top: 0px;
  }
  .swiper-wrapper {
      display: flex;
      justify-content: center;

      @media (max-width:980px){
        justify-content:flex-start;
      }
    }
  .swiper {
    width: 100%;
  }

  .ImgBox{
    position: relative;
    width: 100%;
    height: 100px
  }

`;

export const UpSellButton = styled.div`
  div {
    cursor: pointer;
    background: transparent;
    color: var(--Blue);
    text-align: center;

    font-size: 0.8rem;
    font-weight: 600;

    h2 {
      color: var(--Blue);
      margin-left: 3px;
    }
  }
  
  div.actived {
    h2{
      color: var(--TxtRed);
    }
  }
`;
