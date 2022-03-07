import { StyledFooterBlock } from "./styles";
import logo from "../../../public/images/logo-inmotion-black.webp";
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
      <h1>Informations</h1>
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
            <b>Inmotion-Suisse Sàrl</b>
            <br />
            Route des Brévires 21
            <br />
            1741 Cottens FR
            <br />
            <Link href="&#109;&#97;&#105;&#108;&#116;&#111;&#58;%69%6E%66%6F%40%69%6E%6D%6F%74%69%6F%6E%2D%73%75%69%73%73%65%2E%63%68">
              <a>info@inmotion-suisse.ch</a>
            </Link>
          </address>
        </div>
      </div>
      <div className="box3">
        <div className="ShopAddress">
          <h2 className="squared">{shopAddressTxt}</h2>
          <address>
            <b>Inmotion-Suisse</b>
            <br />
            Gerberngasse 12
            <br />
            3011 Bern
            <br />
            <Link href="&#109;&#97;&#105;&#108;&#116;&#111;&#58;%69%6E%66%6F%40%69%6E%6D%6F%74%69%6F%6E%2D%73%75%69%73%73%65%2E%63%68">
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
