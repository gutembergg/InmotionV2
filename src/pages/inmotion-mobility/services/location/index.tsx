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
          <div className="block">
            <div className="unskewBlock">
              <h1>{TitleLocation}</h1>
              <p>{TXTLocation}</p>
            </div>
          </div>
        </BlockInfoLocation>
        </div>
        <LocationContainer>
          <h2 className="squared">{nosOffres}</h2>
          <ul>
            {locations.map((location) => {
              return (
                <li key={location.id}>
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
                      <a>{contact}</a>
                    </Link>
                    </div>
                  </div>
                </li>
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
