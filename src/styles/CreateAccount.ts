import styled from "styled-components";

export const Container = styled.div`
  height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  @media (max-width: 480px) {
    align-items: stretch;
    padding: 0 1rem ;
  }
  `;

  export const Content = styled.div`
  text-align:center;
  input{
    width: 100%;
    height: 40px;
    border: 2px solid var(--Blue);
    padding: 0.4rem;
  }
  .errors{
    color: var(--Red);
    text-align: left;
    font-size: 0.9em;
  }
  form{
   position: relative;
 }
  `;

export const FormBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
  max-width: 550px;

  @media (max-width: 560px) {
    width: 100%;
    /* max-width: 400px; */
  }
`;


export const FormRow1 = styled.div`
  display: flex;
  flex-direction: row;
  gap: 15px;
  margin-bottom: 15px ;

  input {
    width: 100%;
  }
  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

export const IconBlock = styled.button`
  position: absolute;
  right: -16px;
  bottom: -16px;
  transition: 0.2s ease;
  background: transparent;
  border: none;

  &:hover {
    transform: scale(1.2);
  }

  @media (max-width: 480px) {
    display: none;
  }
`;

export const ButtonValidateMobile = styled.button`
  display: none;
  width: 100%;
  max-width: 500px;
  height: 50px;
  background: var(--Blue);
  color: var(--White);
  border: none;
  font-size: 1.2rem;
  transition: 0.2s ease;
  margin-top: 20px ;
  &:active {
    transform: scale(0.9);
  }

  @media (max-width: 480px) {
    display: block;
  }
`;
