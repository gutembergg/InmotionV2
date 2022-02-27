import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 4rem;
  margin-bottom: 3rem;
  padding: 0 2rem;

  @media (max-width: 486px) {
    padding: 0 0.6rem;
  }
`;

export const Description = styled.div`
  text-align: center;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 15px;
  margin-top: 2rem;
  width: 100%;

  @media (max-width: 860px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const MapBlock = styled.div`
  border: 2px solid var(--Blue);
  width: 400px;
  height: 400px;
  background: red;

  @media (max-width: 444px) {
    width: 380px;
    height: 380px;

    margin: 0 0.5rem;
  }

  @media (max-width: 360px) {
    margin: 0 4rem;
  }
`;

export const Form = styled.form`
  position: relative;
  display: flex;
  flex-direction: column;

  gap: 29px;
  width: 100%;
  max-width: 550px;

  textarea {
    border: 2px solid var(--Blue);
    padding: 0.4rem;
  }

  @media (max-width: 560px) {
    width: 100%;
    max-width: 400px;
  }
`;

export const Input = styled.input`
  width: 100%;
  height: 40px;
  border: 2px solid var(--Blue);
  padding: 0.4rem;
`;

export const FormRow1 = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;

  input {
    width: 100%;
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

  @media (max-width: 450px) {
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

  &:active {
    transform: scale(0.9);
  }

  @media (max-width: 450px) {
    display: block;
  }
`;
