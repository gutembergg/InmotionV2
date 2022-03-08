import React, { ReactElement } from "react";
import {
  BlockInfoLocation,
  Container,
  LocationContainer,
  MainContent,
} from "../../../../styles/locationPage";
import LayoutMobility from "../../../../Layout/LayoutMobility";
import BgLocation from "../../../../../public/images/locationBg.webp";
import Image from "next/dist/client/image";
import Link from "next/dist/client/link";
import useTranslation from "next-translate/useTranslation";
import { GetStaticProps } from "next";
import { getLocationsVehicles } from "../../../../services/wordpressApi/locationsVehicles";
import { IWPPage } from "../../../../interfaces/IWPPage";
import {motion} from "framer-motion";

interface Props {
  locations:IWPPage[];
}

export default function ServiceLocation({locations}:Props) {
  const { t } = useTranslation();
  const TitleLocation = t("location-page:TitleLocation");
  const TXTLocation = t("location-page:TXTLocation");
  const contact = t("location-page:contact");
  const nosOffres = t("location-page:nosOffres");

  return (
    <Container>
      <MainContent>
        <div className="bgContainer">
          <div className="bgImage">
            <Image
            priority
              src={BgLocation.src}
              layout="fill"
              objectFit="cover"
              objectPosition="right"
              alt="Leçon de gyroroue sur une route"
            />
          </div>
        <BlockInfoLocation>
          <motion.div animate={{ x: ["100%", "0%"], opacity: [0, 1] }}
              transition={{ type: "spring", stiffness: 100, duration: 0.5 }}>
          <div className="block">
            <div className="unskewBlock">
              <h1>{TitleLocation}</h1>
              <p>{TXTLocation}</p>
            </div>
          </div>
          </motion.div>
        </BlockInfoLocation>
        </div>
        <LocationContainer>
          <h2 className="squared">{nosOffres}</h2>
          <ul>
            {locations.map((location) => {
              return (
                <motion.li 
                key={location.id} 
                whileInView="visible"
                initial={{y:"100%"}}
            viewport={{ once: true }}
            variants={{
              visible: {
                y: "0%",
                transition: {
                  duration: 0.3
                },
              },
            }}
                >
                  <div className="locationImg">
                    <Image
                      src={location.acf.image_location.url}
                      layout="fill"
                      objectFit="contain"
                      objectPosition="right"
                      alt="Leçon de gyroroue sur une route"
                    />
                  </div>
                  <div className="productContent">
                    <h3 dangerouslySetInnerHTML={{__html: location.title.rendered}}></h3>
                    <div dangerouslySetInnerHTML={{__html: location.acf.description_location}} ></div>
                    <div className="button">
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
                </motion.li>
              );
            })}
          </ul>
        </LocationContainer>
      </MainContent>
    </Container>
  );
}

ServiceLocation.getLayout = function getLayout(page: ReactElement) {
  return <LayoutMobility>{page}</LayoutMobility>;
};


export const getStaticProps: GetStaticProps = async (ctx) => {
  const lang = ctx.locale;
  const locations = await getLocationsVehicles(lang as string);

  return {
    props: {
      locations,
    },
    revalidate: 60,
  };
};
