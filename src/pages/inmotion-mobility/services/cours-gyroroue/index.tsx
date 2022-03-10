import React, { ReactElement } from "react";
import { motion } from "framer-motion";
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
import {useRouter} from "next/router";
import HeaderSeo from "../../../../components/HeaderSeo";

export default function ServiceCours() {
  const router = useRouter();
  const { t } = useTranslation();
  const TitleCours = t("cours-gyro:TitleCours");
  const TXTCours = t("cours-gyro:TXTCours");
  const info1 = t("cours-gyro:info1");
  const info2 = t("cours-gyro:info2");
  const offre = t("cours-gyro:offre");
  const contact = t("cours-gyro:contact");

  return (
    <>
    <HeaderSeo
    description="inmotion.suisse vous propose une scéance de cours où vous pourrez apprendre avec un professionel les bases pour bien débuter."
    title="Cours de gyroroues"
    canonical={`https://inmotion-suisse.ch/services/cours-gyroroue`}
    og_locale={router.locale ||""}
    og_title="Cours de gyroroues"
    />
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
          <motion.div 
              animate={{ x: ["-100%", "0%"], opacity: [0, 1] }}
              transition={{ type: "spring", stiffness: 100, duration: 0.5 }}>
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
                <motion.a initial={{background: "#0570A6" }}
                      whileHover={{
                        scale: 1.02,
                        transition: { duration: 0.01 },
                        background: "#03486b" 
                      }}
                      style={{ originX: 0.5 }}
                      whileTap={{ scale: 0.98, transition: { duration: 0.01 },}}>
                        {contact}
                      </motion.a>
              </Link>
              </div>
            </div>
          </div>
</motion.div>
        </BlockInfoCours>
      </MainContent>
    </Container>
</>
  );
}

ServiceCours.getLayout = function getLayout(page: ReactElement) {
  return <LayoutMobility>{page}</LayoutMobility>;
};
