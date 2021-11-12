import { useRouter } from "next/router";
import { PreviousPageLinkStyle } from "./styles";

interface IPreviousLink {
  text: string;
}
const PreviousPageLink = ({ text }: IPreviousLink) => {
  const router = useRouter();

  return (
    <PreviousPageLinkStyle
      className="previousPage"
      onClick={() => router.back()}
    >
      {text}
    </PreviousPageLinkStyle>
  );
};
export default PreviousPageLink;
