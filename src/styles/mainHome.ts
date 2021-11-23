import styled from "styled-components";

export const MainHome = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  /* position: relative; */
  z-index: 20;
  flex: 1 1 auto;
  height: 100vh;
  width: 100%;
  min-height: 500px;

  .topBlock {
    padding-right: 20px;
    padding-top: 10px;
    width: 100%;
    min-width: 210px;
    @media (min-width: 580px) {
      min-width: 320px;
    }
  }
`;

export const MainContent = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 2% 5%;
  @media (min-width: 580px) {
    margin-top: 2rem;
  }
`;
export const ContentHeader = styled.div`
  .title {
    display: flex;
    justify-content: center;

    h1 {
      font-size: 1em;
      margin-top: 5px;
      @media (min-width: 580px) {
        font-size: 2em;
      }
    }
    .mainLogo {
      width: 140px;
      margin-left: 10px;

      @media (min-width: 580px) {
        width: 250px;
      }
    }
  }
  p {
    text-align: center;
    width: 100%;
  }
`;
export const HomeContentBody = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  @media (orientation: landscape) {
    flex-direction: row;
    margin-top: 0;
  }
  @media (orientation: landscape) and (min-width: 580px) {
    margin-top: 11%;
  }
  .right h2 {
    color: var(--Orange);
  }
  .left h2 {
    color: var(--Blue);
  }

  .left,
  .right {
    min-height: 200px;
    height: 34vh;
    max-width: 400px;
    @media (orientation: landscape) {
      width: 45%;
    }
    @media (min-width: 580px) {
      max-width: 70%;
    }
    a {
      display: flex;
      flex-direction: row;
      align-items: center;
      height: 100%;
      text-decoration: none;

      @media (min-width: 580px) {
      max-width: 500px;
    }
      @media (min-width: 960px) {
      max-width: 720px;
    }

      .topBlock {
        position: relative;
        height: 100%;
        display: flex;
        align-items: center;
      }
      .container {
        margin-left: -120px;
        z-index: 12;

        @media (min-width: 580px) {
          margin-left: -190px;
        }

        p {
          font-weight: bold;
          font-size: 0.9em;
          text-align: left;
          color: var(--Black);

          @media (min-width: 580px) {
            font-size: 1.1em;
          }
        }
        h2 {
          font-size: 0.8em;
          font-weight: bold;
          font-style: italic;
          text-align: left;

          @media (min-width: 580px) {
             font-size: 1em;
          }
        }
        .logoMobilityBox {
          width: 92%;
        }
      }
    }
  }
`;
export const GifBox1 = styled.div`
  background-color: #ac2c39;
  width: 44%;
  margin-left: 33px;
  height: 80%;
  transform: skew(-15deg);
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  opacity: 0.8;
  @media (min-width: 580px) and (orientation: landscape) {
    height: 100%;
  }
  .imgBox1 {
    position: absolute;
    opacity: 0.6;
    width: 200%;
    height: 101%;
    bottom: 0%;
    object-fit: cover;
    filter: grayscale(1);
    transform: skew(15deg);
    right: -50%;
  }
`;
export const GifBox2 = styled.div`
  opacity: 0.8;
  background-color: var(--Blue);
  width: 44%;
  min-width: 50px;
  margin-left: 33px;
  height: 80%;
  transform: skew(-15deg);
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  @media (min-width: 580px) and (orientation: landscape) {
    height: 100%;
  }
  .imgBox2 {
    opacity: 0.6;
    filter: grayscale(1);
    width: 181%;
    height: 101%;
    top: -0.5%;
    right: -39%;
    transform: skew(15deg);
    position: absolute;
    object-fit: cover;
    object-position: 0px 30%;
  }
`;
