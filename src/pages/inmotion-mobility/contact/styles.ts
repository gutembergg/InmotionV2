import styled from "styled-components";

export const Input = styled.input`
  width: 100%;
  height: 40px;
  border: 2px solid var(--Blue);
  padding: 0.4rem;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 4rem;
  margin-bottom: 3rem;
`;

export const Description = styled.div``;

export const Content = styled.div`
  display: flex;
  flex-direction: row;
  gap: 15px;
  margin-top: 2rem;
`;

export const MapBlock = styled.div`
  border: 2px solid var(--Blue);
`;

export const Form = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 29px;
  width: 550px;

  textarea {
    border: 2px solid var(--Blue);
    padding: 0.4rem;
  }
`;

export const FormRow1 = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;

  input {
    width: 100%;
  }
`;

export const IconBlock = styled.div`
  position: absolute;
  right: -20px;
  bottom: -20px;
  transition: 0.2s ease;

  &:hover {
    transform: scale(1.2);
  }
`;
