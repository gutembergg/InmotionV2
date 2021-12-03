import { StyledFooter } from "./styles";
import InstaIcon from "../../../../public/images/icons/instagram.svg";
import FbIcon from "../../../../public/images/icons/facebook.svg";
import Image from "next/image";
import Link from "next/link";
import useTranslation from "next-translate/useTranslation";

const MobilityFooter = () => {
  const facebookLink = "https://www.facebook.com/";
  const InstaLink = "https://www.instagram.com/";
  const { t } = useTranslation();
  const condGenerales = t("headerMobility:condGenerales");
  const confidentiality = t("headerMobility:confidentiality");
  return (
    <StyledFooter>
      <div>

      <p>© Inmotion-suisse.ch</p>
      <div className="footerLinks">
        <Link href="/inmotion-mobility/conditions-generales">
          <a>{condGenerales}</a>
        </Link>{" "}
        |{" "}
        <Link href="/inmotion-mobility/politique-confidentialite">
          <a>{confidentiality}</a>
        </Link>{" "}
      </div>
      </div>
      <div className="socialLinks">
        <Link href={facebookLink}>
          <a target="_blank">
            <Image src={FbIcon} alt="logo facebook" width={25} height={25} />
          </a>
        </Link>
        <Link href={InstaLink}>
          <a target="_blank">
            <Image src={InstaIcon} alt="logo instagram" width={25} height={25} />
          </a>
        </Link>
      </div>
    </StyledFooter>
  );
};
export default MobilityFooter;
