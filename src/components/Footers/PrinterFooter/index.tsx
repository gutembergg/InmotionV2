import { StyledFooter } from "./styles";
import InstaIcon from "../../../../public/images/icons/instagram.svg";
import FbIcon from "../../../../public/images/icons/facebook.svg";
import Image from "next/image";
import Link from "next/link";

const PrinterFooter = () => {
  const facebookLink = "https://www.facebook.com/";
  const InstaLink = "https://www.instagram.com/";

  return (
    <StyledFooter>
      <p>© Inmotion-suisse.ch</p>
      <div className="footerLinks">
        <Link href="/inmotion-print/conditions-generales">
          <a>Conditions Générales</a>
        </Link>{" "}
        |{" "}
        <Link href="/inmotion-print/politique-confidentialite">
          <a>Politique de confidentialité</a>
        </Link>{" "}
        |{" "}
        <Link href="/inmotion-print/attributions">
          <a>Attributions</a>
        </Link>
      </div>
      <div className="socialLinks">
        <Link href={facebookLink}>
          <a target="_blank">
            <Image src={FbIcon} alt="logo facebook" width={25} height={25} />
          </a>
        </Link>
        <Link href={InstaLink}>
          <a target="_blank">
            <Image
              src={InstaIcon}
              alt="logo instagram"
              width={25}
              height={25}
            />
          </a>
        </Link>
      </div>
    </StyledFooter>
  );
};
export default PrinterFooter;
