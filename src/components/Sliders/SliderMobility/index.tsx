import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import imagetrot from "../../../../public/images/homeMobility/trottl9.jpg";
import imageP2 from "../../../../public/images/homeMobility/p2fslide.jpg";
import imagenoel from "../../../../public/images/homeMobility/offrenoel.jpg";
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
            <h2>
              <b>{txtSlider1_3}</b>
            </h2>
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
              Découvrez un nouveau moyen de vous déplacer avec lInmotion{" "}
              <span className="red">P2F</span>
            </h2>
            <p>
              Le P2 est un vélo électrique léger, compact et pliable doté d’une
              grande autonomie et de trois modes de conduite : vélo classique,
              avec assistance électrique au pédalage ou tout électrique. La
              prise en main est facile et le démarrage avec clé sécurisé.
              Ludique et élégant, rapide et écologique, ce moyen de déplacement
              saura vous ravir.
            </p>
            <Link href="/">
              <a>lien slider</a>
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
            <Link href="/inmotion-mobility/produit/inmotion-p2-velo-electrique-2">
              <a>{linkSlider3}</a>
            </Link>
          </div>
        </SwiperSlide>
      </Swiper>
    </Container>
  );
};

export default SliderMobility;
