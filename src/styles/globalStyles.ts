import { createGlobalStyle } from "styled-components";
export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Open Sans', sans-serif;
    -webkit-tap-highlight-color: transparent;
    font-size: 16px;
  }
  :root {
    --Blue: #0570A6;
    --BlueHover: #03486b;
    --BlueSelected: #6797B0;
    --Red: #F2142B;
    --Orange:#F2571F;
    --Green:#027011;
    --Black: #212121;
    --White: #FCFCFC;
    --DarkGray: #707070;
    --LightGray:#a0a0a0;
    --BgGrayGradient: linear-gradient(69deg, rgba(230,230,230,1) 0%, rgba(255,255,255,1) 100%);
    --TxtRed: #c70520;


  }

  button{
      cursor: pointer;
  }
  
  input[type="checkbox"] {
  /* ...existing styles */
  display: grid;
  place-content: center;
}

input[type="checkbox"]::before {
  content: "";
  width: 0.65em;
  height: 0.65em;
  transform: scale(0);
  transition: 120ms transform ease-in-out;
  box-shadow: inset 1em 1em var(--form-control-color);
}

input[type="checkbox"]:checked::before {
  transform: scale(1);
}
h1,h2,h3,h4,h5,h6{
  font-family: 'Bitter', sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--Black)
}
h1{
        font-size:1.8em;
        color: var(--Black);
        margin-bottom: 10px;
        z-index:3;
        position: relative;
        font-weight: 600;

        @media (max-width:960px){
          font-size:1.6em
        }
        @media (max-width:640px){
          font-size:1.25em
        }
    }
    h1::before {
        content: " ";
        width:35px;
        height: 35px;
        background-color: var(--Red);
        position: absolute;
        z-index:-1;
        transform: skew(-20deg) translateX(-15px);
        @media (max-width:960px){
          width:35px;
        height: 35px;
        }
        @media (max-width:640px){
          width: 18px;
    height: 23px;
    transform: skew(-20deg) translateX(-4px);
        }
    }

h2{ 
        font-size:1.3em;
        color: var(--Black);
        margin-bottom: 10px;
        z-index:3;
        position: relative;
        @media (max-width:960px){
          font-size:1.25em;
        }
        @media (max-width:640px){
          font-size:1.15em;
        }
    }
    h2.squared{ 
      margin-left: 16px;
      &::before {
        content: " ";
        width:22px;
        height: 35px;
        background-color: var(--Red);
        position: absolute;
        z-index:-1;
        transform: skew(-20deg) translateX(-14px);
        bottom: 2px;
      }
    }

  a , p{
    font-size: 1em;
  }

`;
