import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import Link from "next/dist/client/link";
// Import Swiper styles
import "swiper/css";

import "swiper/css/pagination";
import "swiper/css/navigation";
import SwiperCore, { Pagination, Navigation, Autoplay } from "swiper";

import { Container } from "./styles";
import { IWPPage } from "../../../interfaces/IWPPage";

interface Props{
  slider:IWPPage[];
}
SwiperCore.use([Autoplay, Pagination, Navigation]);

const SliderMobility = ({slider}:Props) => {

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
        {slider.map((sliderItem,index) =>{
          return (

            <SwiperSlide key={index}>
          <div className="sliderImage">
          {sliderItem.acf.image && (
            <Image
            src={sliderItem.acf.image?.url}
            alt="corporate"
            layout="fill"
            objectFit="cover"
            />
            )}
          </div>
          <div className="content">
            <h2 dangerouslySetInnerHTML={{__html: sliderItem.title.rendered}}>
              
            </h2>
            <div dangerouslySetInnerHTML={{__html: sliderItem.acf.description}}></div>
            <Link href={sliderItem.acf.lien}>
              <a>{sliderItem.acf.texte_du_lien}</a>
            </Link>
          </div>
        </SwiperSlide>
            )
            })}
      </Swiper>
    </Container>
  );
};

export default SliderMobility;
