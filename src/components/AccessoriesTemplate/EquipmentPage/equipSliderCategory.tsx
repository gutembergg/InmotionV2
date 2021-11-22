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
  activedAllProductMenu: boolean;
  selectCategory: (categorySlug: string, index: number) => void;
}

const EquipSliderCategory = ({
  subCategories,
  selectCategory,
  activedMenuIndex,
}: Props) => {
  console.log("equpSlider");
  return (
    <SliderContainer>
      <Swiper
        direction="horizontal"
        slidesPerView={3}
        spaceBetween={0.5}
        breakpoints={{
          300: {
            slidesPerView: 1.2,
            spaceBetween: 0,
          },
          388: {
            slidesPerView: 1.2,
            spaceBetween: 0,
          },
          479: {
            slidesPerView: 1.8,
            spaceBetween: 0,
          },
          520: {
            slidesPerView: 2,
            spaceBetween: 0,
          },
          574: {
            slidesPerView: 2.2,
            spaceBetween: 0,
          },
          630: {
            slidesPerView: 2.5,
            spaceBetween: 0,
          },
          746: {
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
                className={activedMenuIndex === index ? "active" : ""}
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

export default EquipSliderCategory;
