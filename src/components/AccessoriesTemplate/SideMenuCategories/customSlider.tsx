import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/scrollbar";
import SwiperCore, { Scrollbar } from "swiper";

import { SliderContainer, Button } from "./styles";
import { ICategories } from "../../../interfaces/ICategories";

SwiperCore.use([Scrollbar]);

interface Props {
  subCategories: ICategories[];
}

const CustomSlider = ({ subCategories }: Props) => {
  return (
    <SliderContainer>
      <Swiper
        direction="horizontal"
        slidesPerView={3}
        spaceBetween={0.5}
        breakpoints={{
          320: {
            slidesPerView: 1.5,
          },
          480: {
            slidesPerView: 2,
          },
          630: {
            slidesPerView: 2.5,
          },
          900: {
            slidesPerView: 3,
          },
        }}
      >
        {subCategories.map((category) => {
          return (
            <SwiperSlide key={category.id}>
              <Button>{category.name}</Button>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </SliderContainer>
  );
};

export default CustomSlider;
