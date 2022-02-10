import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  .content {
    clip-path: polygon(12% 0, 100% 0, 100% 99%, 0% 100%);
    width: 45%;
    right: 0;
    padding: 30px 40px 20px 7vw;
    position: absolute;
    height: 520px;
    margin-top: -10px;
    color: var(--Black);
    background: var(--White);
    z-index: 3;
    display: flex;
    flex-direction:column;
    align-items: flex-start;
    justify-content: center;
    top:0; 
    margin-bottom: 50px;
    @media screen and (max-width: 1024px) {
      clip-path: polygon(0% 0,100% 0,100% 100%,0% 100%);
      width: 100%; 
      position: relative;
      height: auto;
      margin-top: 0px;
      color: var(--Black);
      background: var(--White);
      z-index: 3;
      justify-content: flex-start;     
    }
    @media screen and (max-width: 960px) {
     
    }
      a{
        color: var(--White);
        background-color: var(--Blue);
        padding:  10px 20px;
        margin-top: 20px;
        text-decoration: none;
        transition: all ease-in 0.1s ;

        &:hover {
            background-color: var(--BlueHover);
            transition: all ease-in 0.1s ;
        }
    }
}
.sliderImage{
    width: 57vw;
    position: relative;
    height: 500px;
    @media screen and (max-width: 1024px) {
      height: 400px;
      width: 100%;
    }
    @media screen and (max-width: 640px) {
    height: 300px;
  }
    @media screen and (max-width: 480px) {
      height: 270px;
  }
}

  .swiper-slide {
    width: 100%;
  }
`;
