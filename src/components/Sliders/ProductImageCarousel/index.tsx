import Image from "next/image";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Thumbs } from "swiper";
import { IImage } from "../../../interfaces/IImages";
import { SliderProductImage } from "./styles";
interface props {
  imageList: IImage[];
}
export const ProductImageCarousel = ({ imageList }: props) => {
  // store thumbs swiper instance
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperCore>();

  return (
    <SliderProductImage>
      <Swiper modules={[Thumbs]} thumbs={{ swiper: thumbsSwiper }}>
        {imageList.map((product) => {
          return (
            <SwiperSlide key={product.id}>
              <div className="imgBlock">
                <Image
                  layout="fill"
                  objectFit="contain"
                  src={product.src}
                  alt="product"
                  placeholder="blur"
                  blurDataURL={product.src}
                />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <div className="swiperThumb">
        <Swiper
          modules={[Thumbs]}
          watchSlidesProgress
          onSwiper={setThumbsSwiper}
          slidesPerView={3}
          spaceBetween={1}
          slidesPerGroup={1}
          navigation={true}
        >
          {imageList.map((product) => {
            return (
              <SwiperSlide key={product.id}>
                <Image
                  width={70}
                  height={70}
                  src={product.src}
                  alt="product"
                  placeholder="blur"
                  blurDataURL={product.src}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </SliderProductImage>
  );
};
