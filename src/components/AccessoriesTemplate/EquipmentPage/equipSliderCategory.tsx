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
  displayAllProductsMenuResponsive: (index: number) => void;
}

const EquipSliderCategory = ({
  subCategories,
  selectCategory,
  activedMenuIndex,
  displayAllProductsMenuResponsive,
}: Props) => {
  const categoriesWithAllArticles = [
    ...subCategories,
    { id: 9999999, name: "all articles", slug: "all_articles" },
  ];

  return (
    <SliderContainer>
      <Swiper
        direction="horizontal"
        slidesPerView={4}
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
          637: {
            slidesPerView: 2.5,
            spaceBetween: 0,
          },
          755: {
            slidesPerView: 3,
            spaceBetween: 0,
          },

          1020: {
            slidesPerView: 3.5,
          },
        }}
      >
        {categoriesWithAllArticles.map((category, index) => {
          return (
            <SwiperSlide key={category.id}>
              <Button
                className={activedMenuIndex === index ? "active" : ""}
                onClick={() =>
                  category.id === 9999999
                    ? displayAllProductsMenuResponsive(index)
                    : selectCategory(category.slug, index)
                }
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
