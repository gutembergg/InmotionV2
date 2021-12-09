import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { IProduct } from "../../../interfaces/IProducts";

// Import Swiper styles
import "swiper/css";
import "swiper/css/scrollbar";
import SwiperCore, { Scrollbar } from "swiper";

import { Container } from "./styles";

SwiperCore.use([Scrollbar]);

interface Props {
  products: IProduct[];
  selectProduct: (index: number) => void;
}

const SliderCustom = ({ products, selectProduct }: Props) => {
  return (
    <Container>
      <Swiper
        centerInsufficientSlides={true}
        direction="horizontal"
        scrollbar={{
          draggable: true,
          snapOnRelease: true,
          dragSize: 250,
        }}
        slidesPerView={5}
        spaceBetween={15}
        breakpoints={{
          // when window width is >= 320px
          320: {
            slidesPerView: 1,
            spaceBetween: 0,
          },
          // when window width is >= 480px
          480: {
            slidesPerView: 2,
          },
          // when window width is >= 640px
          640: {
            slidesPerView: 3,
          },
          // when window width is >= 768px
          768: {
            slidesPerView: 4,
          },
          // when window width is >= 900px
          980: {
            slidesPerView: 5,
          },
        }}
      >
        {products.map((product, index) => {
          return (
            <SwiperSlide key={product.id}>
              <div className="slide_block" onClick={() => selectProduct(index)}>
                <Image
                  width={150}
                  height={150}
                  src={product.images[0].src}
                  alt="product"
                  placeholder="blur"
                  blurDataURL={product.images[0].src}
                />
                <div className="product_name">{product.name}</div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </Container>
  );
};

export default SliderCustom;
