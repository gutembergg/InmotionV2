import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  .swiper-slide {
    width: 100%;

    .sliderImage1 {
      position: relative;
    }
    
    .sliderImage {
      width: 100%;
      position: relative;
      z-index: 10;
      height:  75vh;
      @media screen and (max-width: 1024px) {
      height: 45vh;
    }
    }
    
    .content {
    clip-path: polygon(6% 0,100% 0,100% 100%,0% 100%);
    width: 89%;
    right: 0;
    padding: 22px 18px 47px 82px;
    position: absolute;
    height: auto;
    background: var(--White);
    z-index: 200;
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-weight: bold;
    color: var(--Black);
    max-width: 1000px;
      .link {
        margin-top: 21px;
      }
      h1 {
        position: relative;
        margin-bottom: 10px;    
        color: var(--Blue);
        &::before {
          background: none;
        }
        
        &::before {
          content: " ";
          width: 18px;
          height: 23px;
          transform: skew(-20deg) translateX(-4px);
        }
        @media (max-width: 450px) {
          font-size: 1.2em;
        }
      }
      h2{
        color: var(--Blue);
        line-height: 23px;
    letter-spacing: 1px;
      }
      a {
        color: var(--White);
        background-color: var(--Red);
        padding: 10px 20px;
        margin-top: 20px;
        text-decoration: none;
        transition: all ease-in 0.1s;
        width: fit-content;
    height: 100%;
    display: block;
    cursor: pointer;
        /* &:hover {
          background-color: var(--BlueHover);
          transition: all ease-in 0.1s;
        } */
      }

      @media screen and (max-width: 1024px) {
        clip-path: polygon(0% 0, 100% 0, 100% 100%, 0% 100%);
        width: 100%;
        height: auto;
        /* min-height: 450px; */
        justify-content: center;
        position: relative;
      }

      @media screen and (max-width: 960px) {
        clip-path: polygon(0% 0, 100% 0, 100% 100%, 0% 100%);
        width: 100%;
        padding: 30px 2rem 50px 2rem;
      }
    }
  }
`;
