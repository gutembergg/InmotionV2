import { createGlobalStyle } from "styled-components";
export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Open Sans', sans-serif;
  }
  :root {
    --Blue: #0570A6;
    --Red: #F2142B;
    --Orange:#F2571F;
    --Green:#027011;
    --Black: #212121;
    --White: #FCFCFC;
    --DarkGray: #707070;
    --LightGray:#a0a0a0;

  }
  html{
    min-height: -webkit-fill-available;

  }
  body {
  min-height: 100vh;
  min-height: -webkit-fill-available;
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
`;
