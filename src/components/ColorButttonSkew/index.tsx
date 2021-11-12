import { Container } from "./styles";

interface IColors {
  color: string;
}

const ColorButtonSkew = ({ color }: IColors) => {
  return <Container color={color}></Container>;
};

export default ColorButtonSkew;
