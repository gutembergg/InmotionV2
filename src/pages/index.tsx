import type { NextPage } from "next";
import useTranslation from "next-translate/useTranslation";
import { ICategories } from "../interfaces/ICategories";
import { CurvedBackground } from "../styles/BackgroundStyle";
import Link from "next/link";
import Image from "next/dist/client/image";
import mobilityImage from "../../public/images/grpmobility.png";
import printImage from "../../public/images/grpprint.png";
import logo from "../../public/images/logo-inmotion-black.png";
import logoBlue from "../../public/images/logo-blue.png";
import { MainHome, MainContent } from "../styles/mainHome";
import LanguageSelector from "../components/LanguageSelector";
import {
  VideoStyle,
  Video2Style,
  VideoBox1,
  VideoBox2,
} from "../styles/mainHome";
import { useState } from "react";

export interface IProducts {
  categories: ICategories[];
  menu_order: ICategories[];
}

const Home: NextPage<IProducts> = () => {
  const [playTrot, setplayTrot] = useState(false);
  const [playPrint, setplayPrint] = useState(false);

  const playvideotrot = () => {
    setplayTrot(true);
  };
  // translation strings
  const { t } = useTranslation();
  const TXT_Welcome = t("home:welcomeTitle");
  const TXT_ChooseShop = t("home:chooseYourShop");
  const TXT_MobilitySpecialist = t("home:MobilitySpecialist");
  const TXT_3DSpecialist = t("home:3DSpecialist");

  return (
    <CurvedBackground>
      <MainHome>
        <div className="topBlock">
          <LanguageSelector />
        </div>
        <MainContent>
          <div className="contentHeader">
            <div className="title">
              <h1>{TXT_Welcome}</h1>
              <div className="mainLogo">
                <Image src={logo} alt="corporate" height={112} width={685} />
              </div>
            </div>
            <p>{TXT_ChooseShop}</p>
          </div>
          <div className="content">
            <div className="left" onMouseEnter={(e) => playvideotrot}>
              <Link href="/inmotion-mobility">
                <a>
                  <div className="topBlock">
                    <VideoBox1>
                      <VideoStyle autoPlay muted loop className="video">
                        <source src="/video/trottinette.mp4" type="video/mp4" />
                      </VideoStyle>
                    </VideoBox1>
                    <div className="imgBox">
                      <Image src={mobilityImage} alt="mobility section image" />
                    </div>
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
                    <VideoBox2>
                      <Video2Style autoPlay muted loop className="video">
                        <source src="/video/printer.mp4" type="video/mp4" />
                      </Video2Style>
                    </VideoBox2>
                    <div className="imgBox">
                      <Image src={printImage} alt="print section image" />
                    </div>
                  </div>
                  <div className="container">
                    <div className="logoMobilityBox">
                      <Image src={logoBlue} alt="print section image" />
                    </div>
                    <p>Addicted to create, addicted to Print</p>
                    <h2>{TXT_3DSpecialist}</h2>
                  </div>
                </a>
              </Link>
            </div>
          </div>
        </MainContent>
      </MainHome>
    </CurvedBackground>
  );
};
export default Home;
