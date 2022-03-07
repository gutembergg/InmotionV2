import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import Link from "next/dist/client/link";
import bgHeader from "../../../../public/images/homeMobility/HeadHomeBg.webp";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import { motion } from "framer-motion";
import SwiperCore, { Pagination, Navigation, Autoplay } from "swiper";

import { Container } from "./styles";
import { IWPPage } from "../../../interfaces/IWPPage";
import useTranslation from "next-translate/useTranslation";

interface Props {
  slider: IWPPage[];
}
SwiperCore.use([Autoplay, Pagination, Navigation]);

const SliderMobility = ({ slider }: Props) => {
  const { t } = useTranslation();
  const TXT_Welcome = t("home:mobilityWelcomeTitle");
  const slogan = t("home:slogan");
  return (
    <Container>
      <Swiper
        direction="horizontal"
        slidesPerView={1}
        autoHeight={true}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 4000,
          disableOnInteraction: true,
        }}
        className="mySwiper"
      >
        <SwiperSlide key="99999">
          <div className="sliderImage sliderImage1">
            <Image
              src={bgHeader.src}
              alt="corporate"
              layout="fill"
              objectFit="cover"
              priority
            />
          </div>
          <div className="content">
            <h1>{TXT_Welcome}</h1>
            <span>{slogan}</span>
          </div>
        </SwiperSlide>
        {slider.map((sliderItem, index) => {
          return (
            <SwiperSlide key={index}>
              <div className="sliderImage">
                {sliderItem.acf.image && (
                  <Image
                    src={sliderItem.acf.image?.url}
                    alt="corporate"
                    layout="fill"
                    objectFit="cover"
                    priority
                  />
                )}
              </div>
              <div className="content">
                <h2
                  dangerouslySetInnerHTML={{
                    __html: sliderItem.title.rendered,
                  }}
                ></h2>
                <div
                  className="sliderParagraph"
                  dangerouslySetInnerHTML={{
                    __html: sliderItem.acf.description,
                  }}
                ></div>
                <div className="link">
                  <Link href={sliderItem.acf.lien}>
                    <motion.a
                    initial={{background: "#0570A6" }}
                      whileHover={{
                        scale: 1.02,
                        transition: { duration: 0.01 },
                        background: "#03486b" 
                      }}
                      style={{ originX: 0.5 }}
                      whileTap={{ scale: 0.98, transition: { duration: 0.01 },}}
                    >
                      {sliderItem.acf.texte_du_lien}
                    </motion.a>
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </Container>
  );
};

export default SliderMobility;
