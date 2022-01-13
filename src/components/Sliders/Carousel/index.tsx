import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/dist/client/image";
import Link from "next/dist/client/link";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode"
import "swiper/css/navigation"

// import Swiper core and required modules
import SwiperCore, {
    FreeMode, Navigation
} from 'swiper';

// install Swiper modules
SwiperCore.use([FreeMode,Navigation]);

import "./styles.ts";
import { IProduct } from "../../../interfaces/IProducts";
import { CarouselBox } from "./styles";
import { useEffect, useState } from "react";


interface Props {
  products: IProduct[];
}

export default function CarouselSwiper({ products }: Props) {

  const [productList, setProductList] = useState(products as IProduct[])

  useEffect(() => {
    setProductList(products)
  }, [products])
  return (
    <CarouselBox>
     <Swiper 
     slidesPerView={5} 
     spaceBetween={30} 
     slidesPerGroup={1} 
     loop={true} 
     loopFillGroupWithBlank={false} 
    //  freeMode={true} 
     navigation={true}   
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
            slidesPerView: 3,
          },
          // when window width is >= 900px
          1024: {
            slidesPerView: 4,
          },
          1280: {
            slidesPerView: 5,
          },
        }}>
     {productList.map((product) => {
          return (
            <SwiperSlide key={product.id}>
              <div className="slide_block" >
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
                <div className="product_name"><strong>{product.name}</strong></div>
                <div className="product_price">CHF {product.price}.-</div>
                <div className="ButtonViewProduct">
                </div>
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
