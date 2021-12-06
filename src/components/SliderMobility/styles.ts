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
    width: 54vw;
    position: relative;
    height: 500px;
}

  .swiper-slide {
    width: 100%;
  }
`;
