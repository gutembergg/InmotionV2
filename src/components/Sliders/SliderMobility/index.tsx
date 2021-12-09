import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import imageProvisoire from "../../../../public/images/homeMobility/trott1.jpg";
import imageProvisoire2 from "../../../../public/images/homeMobility/trott2.jpg";
import Link from "next/dist/client/link";
// Import Swiper styles
import "swiper/css";
import "swiper/css/scrollbar";
import SwiperCore, { Pagination, Navigation, Autoplay } from "swiper";

import { Container } from "./styles";

SwiperCore.use([Autoplay, Pagination, Navigation]);

const SliderMobility = () => {
  return (
    <Container>
      <Swiper
        direction="horizontal"
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: true,
        }}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className="sliderImage">
            <Image
              src={imageProvisoire}
              alt="corporate"
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="content">
            <h2>Découvrez le nouveau P2F</h2>
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
              src={imageProvisoire2}
              alt="corporate"
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="content">
            <h2>Découvrez le nouveau P2F</h2>
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
      </Swiper>
    </Container>
  );
};

export default SliderMobility;
