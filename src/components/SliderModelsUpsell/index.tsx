import { Swiper, SwiperSlide } from "swiper/react";
import { IProduct } from "../../interfaces/IProducts";

// Import Swiper styles
import "swiper/css";
import "swiper/css/scrollbar";
import SwiperCore, { Scrollbar } from "swiper";

import { SliderContainer, UpSellButton } from "./styles";

SwiperCore.use([Scrollbar]);

interface Props {
  productsModelsUpSell: IProduct[];
  modelsActivated: number;
  allArticlesTraduction: string;
  selectModelProducts: (
    model: IProduct | { id: number; name: string },
    index: number
  ) => void;
  displayAllProducts: (modelIndex: number) => void;
}

const SliderModelsUpsell = ({
  productsModelsUpSell,
  modelsActivated,
  allArticlesTraduction,
  selectModelProducts,
  displayAllProducts,
}: Props) => {
  const allModels = [
    ...productsModelsUpSell,
    { id: 9999999, name: allArticlesTraduction },
  ];

  return (
    <SliderContainer>
      <Swiper
        direction="horizontal"
        slidesPerView={4}
        spaceBetween={15}
        breakpoints={{
          320: {
            slidesPerView: 1.5,
          },
          480: {
            slidesPerView: 2,
          },
          605: {
            slidesPerView: 2.5,
          },
          900: {
            slidesPerView: 3.5,
          },
          1016: {
            slidesPerView: 4,
          },
        }}
      >
        {allModels.map((product, index) => {
          return (
            <SwiperSlide key={product.id}>
              <UpSellButton
                className={modelsActivated === index ? "active" : ""}
                key={product.id}
                onClick={() =>
                  product.id === 9999999
                    ? displayAllProducts(index)
                    : selectModelProducts(product, index)
                }
              >
                {product.name}
              </UpSellButton>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </SliderContainer>
  );
};

export default SliderModelsUpsell;
