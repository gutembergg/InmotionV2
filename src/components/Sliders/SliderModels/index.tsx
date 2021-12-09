import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/scrollbar";
import SwiperCore, { Scrollbar } from "swiper";
import { IProduct } from "../../../interfaces/IProducts";

import { Container, UpSellButton } from "./styles";
import getAcfContent from "../../../utils/getAcfContent";

SwiperCore.use([Scrollbar]);

interface Props {
  products: IProduct[];
  activedModelIndex: number;
  handleModelMarque: (productId: number, index: number) => void;
}

const SliderModels = ({
  products,
  handleModelMarque,
  activedModelIndex,
}: Props) => {
  return (
    <Container>
      <Swiper
        direction="horizontal"
        slidesPerView={3}
        spaceBetween={20}
        breakpoints={{
          320: {
            slidesPerView: 1,
          },
          390: {
            slidesPerView: 1.5,
          },
          518: {
            slidesPerView: 2,
          },
          680: {
            slidesPerView: 2.5,
          },
          780: {
            slidesPerView: 3,
          },
          1000: {
            slidesPerView: 3.5,
          },
        }}
      >
        {products.map((product, index) => {
          return (
            <SwiperSlide key={product.id}>
              <UpSellButton
                onClick={() => handleModelMarque(product.id, index)}
              >
                <div className={activedModelIndex === index ? "actived" : ""}>
                  {getAcfContent(product, "marque_du_produit")}{" "}
                  <span>{getAcfContent(product, "modele_du_produit")}</span>
                </div>
              </UpSellButton>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </Container>
  );
};

export default SliderModels;
