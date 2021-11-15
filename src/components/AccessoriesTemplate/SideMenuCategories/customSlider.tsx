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
  activedMenuIndex: number;
  selectCategory: (categorySlug: string, index: number) => void;
}

const CustomSlider = ({
  subCategories,
  selectCategory,
  activedMenuIndex,
}: Props) => {
  return (
    <SliderContainer>
      <Swiper
        direction="horizontal"
        slidesPerView={3}
        spaceBetween={0.5}
        breakpoints={{
          320: {
            slidesPerView: 1,
          },
          370: {
            slidesPerView: 1.5,
            spaceBetween: 0,
          },
          570: {
            slidesPerView: 2,
            spaceBetween: 0,
          },
          606: {
            slidesPerView: 2.5,
            spaceBetween: 0,
          },
          730: {
            slidesPerView: 3,
            spaceBetween: 0,
          },
          860: {
            slidesPerView: 3,
          },
        }}
      >
        {subCategories.map((category, index) => {
          return (
            <SwiperSlide key={category.id}>
              <Button
                className={
                  activedMenuIndex === index
                    ? "menu_buttons active_menu"
                    : "menu_buttons"
                }
                onClick={() => selectCategory(category.slug, index)}
              >
                {category.name}
              </Button>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </SliderContainer>
  );
};

export default CustomSlider;
