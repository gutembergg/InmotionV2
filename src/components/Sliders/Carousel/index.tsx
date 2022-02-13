import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/dist/client/image";
import Link from "next/dist/client/link";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";

// import Swiper core and required modules
import SwiperCore, { FreeMode, Navigation } from "swiper";

// install Swiper modules
SwiperCore.use([FreeMode, Navigation]);

import "./styles.ts";
import { IProduct } from "../../../interfaces/IProducts";
import { CarouselBox } from "./styles";
import { useEffect, useState } from "react";
import useCurrency from "../../../hooks/useCurrency";

interface Props {
  products: IProduct[];
}

export default function CarouselSwiper({ products }: Props) {
  const { currency } = useCurrency();
  const [productList, setProductList] = useState(products as IProduct[]);
  const listCount = productList.length;

  useEffect(() => {
    setProductList(products);
  }, [products]);

  return (
    <CarouselBox>
      <Swiper
        slidesPerView={listCount >= 5 ? 5 : listCount}
        spaceBetween={30}
        slidesPerGroup={1}
        loop={false}
        loopFillGroupWithBlank={false}
        //  freeMode={true}
        navigation={true}
        breakpoints={{
          // when window width is >= 320px
          320: {
            slidesPerView: listCount >= 2 ? 2 : listCount,
            spaceBetween: 0,
          },
          // when window width is >= 480px
          480: {
            slidesPerView: listCount >= 3 ? 3 : listCount,
          },
          // when window width is >= 640px
          640: {
            slidesPerView: listCount >= 3 ? 3 : listCount,
          },
          // when window width is >= 768px
          768: {
            slidesPerView: listCount >= 3 ? 3 : listCount,
          },
          // when window width is >= 900px
          1024: {
            slidesPerView: listCount >= 4 ? 4 : listCount,
          },
          1280: {
            slidesPerView: listCount >= 5 ? 5 : listCount,
          },
        }}
      >
        {productList.map((product) => {
          return (
            <SwiperSlide key={product.id}>
              <div className="slide_block">
                <Link href={`/inmotion-mobility/produit/${product.slug}`}>
                  <a className="link">
                    <Image
                      width={150}
                      height={150}
                      src={product.images[0]?.src}
                      alt="product"
                      placeholder="blur"
                      blurDataURL={product.images[0]?.src}
                    />
                    <div className="product_name">
                      <strong>{product.name}</strong>
                    </div>
                    <div className="product_price">
                      {currency === "CHF" ? "CHF" : "EUR"}{" "}
                      {currency === "CHF" ? product.price : product.euroPrice}.-
                    </div>
                    <div className="ButtonViewProduct"></div>
                  </a>
                </Link>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </CarouselBox>
  );
}
