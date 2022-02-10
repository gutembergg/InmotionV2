import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import imagetrot from "../../../../public/images/homeMobility/trottl9.webp";
import imageP2 from "../../../../public/images/homeMobility/p2fslide.webp";
import imagenoel from "../../../../public/images/homeMobility/offrenoel.webp";
import Link from "next/dist/client/link";
// Import Swiper styles
import "swiper/css";

import "swiper/css/pagination";
import "swiper/css/navigation";
import SwiperCore, { Pagination, Navigation, Autoplay } from "swiper";

import { Container } from "./styles";
import useTranslation from "next-translate/useTranslation";

SwiperCore.use([Autoplay, Pagination, Navigation]);

const SliderMobility = () => {
  const { t } = useTranslation();
  const titleSlider1 = t("home:titleSlider1");
  const txtSlider1 = t("home:txtSlider1");
  const txtSlider1_2 = t("home:txtSlider1_2");
  const txtSlider1_3 = t("home:txtSlider1_3");
  const txtSlider1_4 = t("home:txtSlider1_4");

  const titleSlider2 = t("home:titleSlider2");
  const txtSlider2 = t("home:txtSlider2");
  const linkSlider2 = t("home:linkSlider2");

  const titleSlider3 = t("home:titleSlider3");
  const txtSlider3 = t("home:txtSlider3");
  const linkSlider3 = t("home:linkSlider3");

  return (
    <Container>
      <Swiper
        direction="horizontal"
        slidesPerView={1}
        autoHeight={false}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: true,
        }}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className="sliderImage">
            <Image
              src={imagenoel}
              alt="corporate"
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="content">
            <h2>{titleSlider1}</h2>
            <p>{txtSlider1}</p>
            <br />
            <p>{txtSlider1_2}</p>  
            <br />
            <b>{txtSlider1_3}</b>
            <br />
            <p>{txtSlider1_4}</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="sliderImage">
            <Image
              src={imagetrot}
              alt="corporate"
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="content">
            <h2>
              {titleSlider2}
            </h2>
            <p>
            {txtSlider2}
            </p>
            <Link href="/">
              <a>{linkSlider2}</a>
            </Link>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="sliderImage">
            <Image
              src={imageP2}
              alt="corporate"
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="content">
            <h2>{titleSlider3}</h2>
            <p>{txtSlider3}</p>
            <Link href="/inmotion-mobility/produit/inmotion-p2">
              <a>{linkSlider3}</a>
            </Link>
          </div>
        </SwiperSlide>
      </Swiper>
    </Container>
  );
};

export default SliderMobility;
