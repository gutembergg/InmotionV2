import styled from "styled-components";

export const Container = styled.div`a{
  cursor: pointer;
}
`;
export const MainContent = styled.div`
    overflow-x: hidden;
  @media (max-width: 1024px) {
    padding-top: 0px;

  }
`;
export const MobilitySlider = styled.div`
  display: flex;
  filter: drop-shadow(-1px 6px 3px rgba(0, 0, 0, 0.5));
  position: relative;
  margin: 0;
  @media (max-width: 1024px) {
    margin: 0;
  }
`;

export const PromotedProducts = styled.section`
  min-height: 290px;
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 50px;
`;

export const PromotedSection = styled.section`
  position: relative;
  width: 100%;
  .clipPathShadow {
    filter: drop-shadow(-1px 6px 3px rgba(0, 0, 0, 0.5));
    z-index: 3;
    position: absolute;
    left: 0;
    width: 40%;
    margin-top: -9px;
    @media (max-width: 640px) {
      filter: none;
      z-index: 3;
      position: relative;
      left: 0;
      width: 100%;
      margin-top: 0;
    }
    .promotedSectionImage {
      clip-path: polygon(0 0, 90% 0, 100% 100%, 0% 100%);
      width: 100%;
      position: relative;
      height: 380px;
      @media (max-width: 640px) {
          clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
          height: 270px;
      }
      @media (max-width: 480px) {
          clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
          height: 240px;
      }
    }
  }
  .content {
    background: var(--BgGrayGradient);
    flex: 1 0 50vw;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    padding: 10px 4vw 10px 45%;
    height: 360px;
    box-shadow: -1px 6px 5px rgb(0 0 0 / 23%);
    @media (max-width: 640px) {
      padding: 30px 1rem 30px 1rem;
      flex: 0 1 100%;
      height: auto;
      h1{
        font-size:1.15em;
        margin-left: 1rem ;
      }
    }

    h2 {
      color: var(--TxtRed);
    }
    p {
      color: var(--Black);
    }
    a {
      color: var(--White);
      background-color: var(--Blue);
      padding: 10px 20px;
      margin-top: 20px;
      text-decoration: none;
      transition: all ease-in 0.1s;

      &:hover {
        background-color: var(--BlueHover);
        transition: all ease-in 0.1s;
      }
    }
  }
`;

export const RentalSection = styled.section`
  box-shadow: -1px 6px 5px rgb(0 0 0 / 23%);
  display: flex;
  margin-bottom: 70px;
  @media (max-width: 960px) {
    flex-direction: column-reverse;
  }
  @media (max-width: 640px) {
    margin-bottom: 70px;
  }
  .content {
    background: var(--BgGrayGradient);
    flex: 1 1 40%;
    padding: 40px 5%;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    h2 {
      color: var(--TxtRed);
    }
    a {
      color: var(--White);
      background-color: var(--Blue);
      padding: 10px 20px;
      margin-top: 20px;
      text-decoration: none;
      transition: all ease-in 0.1s;

      &:hover {
        background-color: var(--BlueHover);
        transition: all ease-in 0.1s;
      }
    }
  }
  .rentalImg {
    flex: 0 0 auto;
    position: relative;
    height: auto;
    width: 40vh;
    @media (max-width: 960px) {
      height: 200px;
      width: 100%;
    }
  }
`;

export const HelpSection = styled.section`
 margin: 0px 5% 0 5%;
  display: flex;
  justify-content: space-around;
  align-items: center;

  @media (max-width: 640px) {
    flex-direction: column;
  }
  .helpImg {

    @media (max-width: 640px) {
      margin-top: 50px;
    }
  }
  .content {
    flex: 0 1 50%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
   
    @media (max-width: 640px) {
      align-items: center;
      text-align: center;
    }
    a {
      color: var(--White);
      background-color: var(--Blue);
      padding: 10px 20px;
      margin-top: 20px;
      text-decoration: none;
      transition: all ease-in 0.1s;

      &:hover {
        background-color: var(--BlueHover);
        transition: all ease-in 0.1s;
      }
    }
  }
`;


export const NewProducts = styled.section`
  min-height: 290px;
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 50px;
`;
