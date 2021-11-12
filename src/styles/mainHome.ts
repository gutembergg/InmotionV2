import styled from "styled-components";

export const MainHome = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  position: relative;
  z-index: 20;
  flex: 1 1 auto;
  height: 100vh;

  .topBlock {
    display: flex;
    justify-content: flex-end;
    padding: 0 5%;
  }
`;
export const VideoStyle = styled.video`
  position: absolute;
  opacity: 0.6;
  width: 200%;
  z-index: 10;
  height: 101%;
  top: -0.5%;
  object-fit: cover;
  object-position: 100%;
  filter: grayscale(1);
  transform: skew(15deg);
  right: -39%;
`;
export const Video2Style = styled.video`
  opacity: 0.6;
  filter: grayscale(1);
  width: 171%;
  height: 101%;
  top: -0.5%;
  right: -39%;
  transform: skew(15deg);
  position: absolute;
  object-fit: cover;
  object-position: 0px 30%;
`;

export const VideoBox1 = styled.div`
  background-color: var(--Red);
  width: 50%;
  height: 100%;
  transform: skew(-15deg);
  position: absolute;
  overflow: hidden;
`;

export const VideoBox2 = styled.div`
  background-color: var(--Blue);
  width: 50%;
  height: 100%;
  transform: skew(-15deg);
  position: absolute;
  overflow: hidden;
`;
export const MainContent = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  position: relative;
  z-index: 20;
  flex: 1 1 auto;

  .contentHeader {
    display: flex;
    flex-direction: column;
    align-items: center;

    .title {
      margin-top: 2rem;
      margin-bottom: 1rem;
      display: flex;
      align-items: baseline;
      font-style: italic;
      flex-wrap: wrap;
      @media (max-width: 769px) {
        justify-content: center;
        flex-direction: column;
        align-items: center
      }
      @media (max-width: 540px){
        font-size: 0.7em;
        margin-top: 1rem;
      }
      .mainLogo {
        margin-left: 20px;
        width: 300px;
        height: auto;

        @media (max-width: 769px) {
          margin-left: 0;
        }
        @media (max-width: 540px){
        width: 200px;
      }
        image {
          object-fit: contain;
        }
      }
    }
  }

  .content {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-content: space-between;
    flex-wrap: nowrap;
    align-items: center;
    flex: 1 1 auto;
    /* overflow: hidden; */

    .left,
    .right {
      width: 45%;
      /* background-color: aqua; */
      height: 90%;
      min-height: 460px;
      @media (max-width: 1280px) {
        width: 38%;
        max-height: 680px;
      }
      @media (max-width: 960px) {
        width: 38%;
        max-height: 500px;
      }

      a {
        display: flex;
        flex-direction: column;
        align-items: center;
        transform: scale(0.96);
        transition: all ease-in 0.2s;
        text-decoration: none;
        color: var(--Black);
        align-content: center;
        height: 100%;
        justify-content: center;

        .topBlock {
          margin-left: 40px;
          height: 65%;
          position: relative;
          width: 100%;
          display: flex;
          justify-content: center;
          padding: 0 5%;
          max-width: 670px;
          .imgBox {
            transform: translateY(40px);
            width: 90%;
            height: auto;
            z-index: 100;
            position: absolute;
            bottom: 0;

            image {
              margin: auto;
              object-fit: contain;
            }
          }
        }
        .container {
          p {
            font-weight: bold;
            font-size: 1.5em;
            text-align: center;
            @media (max-width: 1280px) {
              font-size: 1.2em;
            }
            @media (max-width: 960px) {
              font-size: 1em;
            }
          }
          h2 {
            font-size: 1em;
            font-weight: normal;
            font-style: italic;
            text-align: center;
          }
        }

        .logoMobilityBox {
          max-width: 500px;
        }

        &:hover {
          transform: scale(1);
          transition: all ease-in 0.2s;
        }
      }
    }
    .right a .topBlock .imgBox {
      width: 70%;
    }
    .left a .logoMobilityBox {
      margin-top: 28px;
    }
    .right h2 {
      color: var(--Orange);
    }
    .left h2 {
      color: var(--Red);
    }
  }

  @media (max-width: 769px) and (orientation: portrait) {
    .content {
      flex-direction: column;
      .left,
      .right {
        width: 90%;
        a {
          flex-direction: row;
          flex-wrap: nowrap;

          .topBlock {
            margin-left: 0px;
            height: 55%;
            position: relative;
            width: 93%;
            display: flex;
            justify-content: center;
            padding: 0 0%;
            
          }
        }
      }
    }
  }

  @media (max-width: 769px) and (orientation: landscape) {
    .content {
      flex-direction: row;
      min-height: 300px;
      .left,
      .right {
        width: 90%;
        a {
          flex-direction: column;
          flex-wrap: nowrap;

          .topBlock {
            margin-left: 0px;
            height: 55%;
            position: relative;
            width: 93%;
            display: flex;
            justify-content: center;
            padding: 0 0%;
          }
        }
      }
    }
  }
`;
