import styled from "styled-components";

export const RegisterContainer = styled.div`
  & > * > * > * {
    transform: skew(15deg);
  }
  p,
  a {
    transform: skew(15deg);
  }

  #sendButton {
    background-color: var(--Blue);
    border: none;
    padding: 10px 20px;
    color: var(--White);
    font-weight: bold;
    margin: 15px 0;
    width: 100%;
    cursor: pointer;
  }

.b2bBox{
  transform: skew(15deg);
  display:flex;
  input[type="checkbox"] {
    -webkit-appearance: none;
    appearance: none;
    margin: 0;  
    font: inherit;
    color: var(--DarkGray);
    width: 1.15em;
    height: 1.15em;
    border: 0.15em solid  var(--DarkGray);
    border-radius: 0.15em;
    transform: translateY(-0.075em);    
    display: grid;
    place-content: center;
  }
  
  input[type="checkbox"]::before {
    content: "";
    width: 0.65em;
    height: 0.65em;
    clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
    transform: scale(0);
    transform-origin: bottom left;
    transition: 120ms transform ease-in-out;
    box-shadow: inset 1em 1em var(--form-control-color);
    /* Windows High Contrast Mode */
    background-color: var(--Blue);
  }
  
  input[type="checkbox"]:checked::before {
    transform: scale(1);
  }
  
  
  input[type="checkbox"]:disabled {
    --form-control-color: var(--form-control-disabled);
    
    color: var(--form-control-disabled);
    cursor: not-allowed;
  }
}
  
  `;
  export const RegisterLink = styled.div`
  background-color: var(--LightGray);
  border: none;
    padding: 10px 20px;
    color: var(--White);
    font-weight: bold;
    margin: 15px 0;
    width: 100%;
    cursor: pointer;
    text-align: center;
    transition: all ease-in 0.1s;
    p{
      transform: skew(0deg);
    }
  &:hover {
    background-color: var(--DarkGray);
    transition: all ease-in 0.1s;
  }
`;
