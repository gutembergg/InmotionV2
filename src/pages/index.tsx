// import type { NextPage } from "next";
// import useTranslation from "next-translate/useTranslation";
// import { ICategories } from "../interfaces/ICategories";
import LayoutMobility from "../Layout/LayoutMobility";
// import Link from "next/link";
// import Image from "next/dist/client/image";
// import logo from "../../public/images/logo-inmotion-black.webp";
// import logoBlue from "../../public/images/logo-blue.webp";
// import LanguageSelector from "../components/LanguageSelector";
// import trotGif from "../../public/video/trottinette.gif";
// import printGif from "../../public/video/printer.gif";
import React, { ReactElement, 
  // useEffect, 
  // useState 
} from "react";

import {
  MainHome,
  // MainContent,
  // HomeContentBody,
  // GifBox1,
  // GifBox2,
  // ContentHeader,
} from "../styles/mainHome";

export default function Home() {
  // translation strings
  // const { t } = useTranslation();
  // const TXT_Welcome = t("home:welcomeTitle");
  // const TXT_ChooseShop = t("home:chooseYourShop");
  // const TXT_MobilitySpecialist = t("home:MobilitySpecialist");
  // const TXT_3DSpecialist = t("home:3DSpecialist");

  return (
      <MainHome>
        <h1>Inmotion-suisse, votre spécialiste en gyroroues, trottinettes et vélos électriques</h1>
        {/* <div className="topBlock">
          <LanguageSelector />
        </div>
        <MainContent>
          <ContentHeader>
            <div className="title">
              <h1>{TXT_Welcome}</h1>
              <div className="mainLogo">
                <Image src={logo} alt="corporate" height={112} width={685} />
              </div>
            </div>
            <p>{TXT_ChooseShop}</p>
          </ContentHeader>
          <HomeContentBody>
            <div className="left">
              <Link href="/inmotion-mobility">
                <a>
                  <div className="topBlock">
                    {   <GifBox1>
                      <div className="imgBox1">
                        <Image
                          src={trotGif}
                          alt="gif trottinette"
                          height={711}
                          width={400}
                        />
                      </div>
                    </GifBox1> }
                  </div>
                  <div className="container">
                    <div className="logoMobilityBox">
                      <Image src={logo} alt="mobility section logo" />
                    </div>
                    <p>Addicted to life, addicted to ride</p>
                    <h2>{TXT_MobilitySpecialist}</h2>
                  </div>
                </a>
              </Link>
            </div>
            <div className="right">
              <Link href="/inmotion-print">
                <a>
                  <div className="topBlock">
                    {  <GifBox2>
                      <div className="imgBox2">
                        <Image
                          src={printGif}
                          alt="gif printer"
                          height={711}
                          width={400}
                        />
                      </div>
                   
                    </GifBox2> }
                  </div>
                  <div className="container">
                    <div className="logoPrinterBox">
                      <Image src={logoBlue} alt="print section image" />
                    </div>
                    <p>Addicted to create, addicted to Print</p>
                    <h2>{TXT_3DSpecialist}</h2>
                  </div>
                </a>
              </Link>
            </div>
          </HomeContentBody>
        </MainContent> */}
      </MainHome>
  );
}
Home.getLayout = function getLayout(page: ReactElement) {
  return <LayoutMobility>{page}</LayoutMobility>;
};

