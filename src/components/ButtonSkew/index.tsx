import { Container } from "./styles";

interface IProps {
  text: string;
}

const ButtonSkew = ({ text }: IProps) => {
  return (
    <Container>
      <div className="article_block">
        <div className="articles_title">
          <div className="title">{text}</div>
        </div>
      </div>
    </Container>
  );
};

export default ButtonSkew;
