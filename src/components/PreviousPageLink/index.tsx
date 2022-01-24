import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { PreviousPageLinkStyle } from "./styles";

const PreviousPageLink = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const previousPageLink = t("common:previousPageLink");
  
  return (
    <PreviousPageLinkStyle
      className="previousPage"
      onClick={() => router.back()}
    >
      {previousPageLink}
    </PreviousPageLinkStyle>
  );
};
export default PreviousPageLink;
