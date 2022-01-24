import type { NextPage } from "next";
import servicesIcon from "../../../../public/images/icons/services.svg";
import { Container } from "../../../components/HomeMainComponent/styles";
import React, { ReactElement } from "react";
import LayoutMobility from "../../../Layout/LayoutMobility";
import useTranslation from "next-translate/useTranslation";
import { MainContent, ServicePage } from "../../../styles/servicePage";
import Link from "next/link";
import { RiCustomerService2Line,RiSecurePaymentLine  } from "react-icons/ri";
import { BiBuildings } from "react-icons/bi";
import { BsShop,BsMailbox} from "react-icons/bs";
import { GiCarKey } from "react-icons/gi";
import { IoDocumentTextOutline } from "react-icons/io5";

export default function Services() {
  const { t } = useTranslation();
  const servicesTitle = t("services:serviceTitle");
  const serviceApresVente = t("services:serviceApresVente");
  const prestationB2b = t("services:prestationB2b");
  const paymentOnline = t("services:paymentOnline");
  const shopInBern = t("services:shopInBern");
  const docAndFormTitle = t("services:docAndFormTitle");
  const locationTitle = t("services:locationTitle");
  const locationLink = t("services:locationLink");
  const returnTitle = t("services:returnTitle");
  const returnLink = t("services:returnLink");
  const ManualsTitle = t("services:ManualsTitle");
  const manualsLink = t("services:manualsLink");

  return (
    <Container>
      <MainContent>
        <ServicePage>
          <section id="whatWeOffer">
            <h1>{servicesTitle}</h1>
            <ul>
              <li>
                <RiCustomerService2Line />
                <h2>{serviceApresVente}</h2>
              </li>
              <li>
                <BiBuildings />
                <h2>{prestationB2b}</h2>
              </li>
              <li>
                <RiSecurePaymentLine />
                <h2>{paymentOnline}</h2>
              </li>
              <li>
                <BsShop />
                <h2>{shopInBern}</h2>
              </li>
            </ul>
          </section>
          <section id="docAndForm">
            <h1>{docAndFormTitle}</h1>
            <ul>
              <li>
                <GiCarKey />
                <h2>{locationTitle}</h2>
                <Link href="/inmotion-mobility/services/location">
                  <a className="linkLocation">{locationLink}</a>
                </Link>
              </li>
              <li>
                <IoDocumentTextOutline />
                <h2>{ManualsTitle}</h2>
                <Link href="/inmotion-mobility/services/guides-utilisateur">
                  <a className="linkManuals">{manualsLink}</a>
                </Link>
              </li>
              <li>
                <BsMailbox />
                <h2>{returnTitle}</h2>
                <Link href="/inmotion-mobility/services/autorisation-retour">
                  <a className="linkReturnProduct">{returnLink}</a>
                </Link>
              </li>
            </ul>
          </section>
        </ServicePage>
      </MainContent>
    </Container>
  );
}

Services.getLayout = function getLayout(page: ReactElement) {
  return <LayoutMobility>{page}</LayoutMobility>;
};
