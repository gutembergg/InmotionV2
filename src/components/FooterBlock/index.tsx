import { StyledFooterBlock } from "./styles";
import logo from "../../../public/images/logo-inmotion-black.png";
import Image from "next/image";
import Link from "next/link";
import useTranslation from "next-translate/useTranslation";

const FooterBlock = () => {
  const facebookLink = "https://www.facebook.com/";
  const InstaLink = "https://www.instagram.com/";
  const { t } = useTranslation();
  const legalMentionsTxt = t("common:legalMentionsTxt");
  const shopAddressTxt = t("common:shopAddressTxt");
  const shopHours = t("common:shopHours");
  const horaireLundi = t("common:horaireLundi");
  const horaireMardi = t("common:horaireMardi");
  const horaireMercredi = t("common:horaireMercredi");
  const horaireJeudi = t("common:horaireJeudi");
  const horaireVendredi = t("common:horaireVendredi");
  const horaireSamedi = t("common:horaireSamedi");
  const horaireDimanche = t("common:horaireDimanche");
  return (
    <StyledFooterBlock>
      <div className="box1">
      <div className="logobox">
        <Image
          src={logo}
          alt="logo entreprise"
          layout="fill"
          objectFit="contain"
        />
      </div>      
      </div>
      <div className="box2">
      <div className="legalMentions">
      <h2 className="squared">{legalMentionsTxt}</h2>
        <address>
          <b>Inmotion-Suisse Sàrl</b><br/>
          Route des Brévires 21<br/> 
          1741 Cottens FR<br/>
          <Link href="mailto:info@inmotion-suisse.ch">
            <a>info@inmotion-suisse.ch</a>
          </Link>
        </address>
      </div>
      </div>
      <div className="box3">
      <div className="ShopAddress">
      <h2 className="squared">{shopAddressTxt}</h2>
        <address>
          <b>Inmotion-Suisse</b><br/>
          Gerberngasse 12<br/>
          3011 Bern<br/>
          <Link href="mailto:info@inmotion-suisse.ch">
            <a>info@inmotion-suisse.ch</a>
          </Link>
        </address>
      </div>
      </div>
      <div className="box4">
      <div className="horaires">
      <h2 className="squared">{shopHours}</h2>
            <p>{horaireLundi}</p>
            <p>{horaireMardi}</p>
            <p>{horaireMercredi}</p>
            <p>{horaireJeudi}</p>
            <p>{horaireVendredi}</p>
            <p>{horaireSamedi}</p>
            <p>{horaireDimanche}</p>
      </div>
      </div>




    </StyledFooterBlock>
  );
};
export default FooterBlock;
