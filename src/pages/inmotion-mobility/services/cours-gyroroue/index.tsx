import React, { ReactElement } from "react";
import {
  BlockInfoCours,
  Container,
  MainContent,
} from "../../../../styles/CoursGyro";
import LayoutMobility from "../../../../Layout/LayoutMobility";
import BgGyro from "../../../../../public/images/coursGyro.jpg";
import Image from "next/dist/client/image";
import Link from "next/dist/client/link";
import useTranslation from "next-translate/useTranslation";
export default function ServiceCours() {
  const { t } = useTranslation();
  const TitleCours = t("cours-gyro:TitleCours");
  const TXTCours = t("cours-gyro:TXTCours");
  const info1 = t("cours-gyro:info1");
  const info2 = t("cours-gyro:info2");
  const offre = t("cours-gyro:offre");
  const contact = t("cours-gyro:contact");

  return (
    <Container>
      <MainContent>
        <div className="bgContainer">
          <div className="bgImage">
            <Image
              src={BgGyro.src}
              layout="fill"
              objectFit="cover"
              objectPosition="right"
              alt="Leçon de gyroroue sur une route"
            />
          </div>
        </div>
        <BlockInfoCours>
          <div className="block">
            <div className="unskewBlock">
              <h1>{TitleCours}</h1>
              <p>{TXTCours}</p>
              <ul>
                <li>{info1}</li>
                <li>{info2}</li>
              </ul>
              <p className="promo">{offre}</p>
              <div>
              <Link href="/inmotion-mobility/contact">
                <a>{contact}</a>
              </Link>
              </div>
            </div>
          </div>
        </BlockInfoCours>
      </MainContent>
    </Container>
  );
}

ServiceCours.getLayout = function getLayout(page: ReactElement) {
  return <LayoutMobility>{page}</LayoutMobility>;
};
