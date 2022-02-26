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
      height: 75vh;
      min-height: 550px;

      @media screen and (max-width: 1024px) {
        height: 50vh;
      }
      @media screen and (max-width: 640px) {
        height: 40vh;
        min-height: 300px;
      }
      @media screen and (max-width: 480px) {
        height: 30vh;
      }
    }

    .content {
      clip-path: polygon(12% 0, 100% 0, 100% 100%, 0% 100%);
      width: 53%;
      right: 0;
      padding: 30px 40px 50px 100px;
      position: absolute;
      height: auto;
      background: #0570a6;
      z-index: 200;
      bottom: 0;
      min-height: 310px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      font-weight: bold;
      color: var(--Black);
      .link {
        margin-top: 21px;
      }
      h1 {
        position: relative;
        margin-bottom: 10px;    
        color: var(--White);
        
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
        color: var(--White);
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

        &:hover {
          background-color: var(--BlueHover);
          transition: all ease-in 0.1s;
        }
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
      }
    }
  }
`;
