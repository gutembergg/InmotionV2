import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/dist/client/image";
import Link from "next/dist/client/link";
import {motion } from "framer-motion";

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


  // ----------------------------------------------------------------
  // <ANIMATION>
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      delay: 1,
      transition: {
        staggerChildren: 0.2,
        duration: 0.5
      }
    }
  }
  
  const item = {
    hidden: { opacity: 0, y:-10, scale:0.2 },
    show: { opacity: 1, y:0, duration: 0.5, scale:1}
  }

  
  return (
    <CarouselBox>
      <motion.div variants={container}
    initial="hidden"
    whileInView= "show" 
    viewport={{once:true}}
    >

      <Swiper
        slidesPerView={listCount >= 5 ? 5 : listCount}
        spaceBetween={30}
        slidesPerGroup={1}
        loop={false}
        loopFillGroupWithBlank={false}
        //  freeMode={true}
        breakpoints={{
          // when window width is >= 320px
          320: {
            slidesPerView: listCount >= 1 ? 1.5 : listCount,
            spaceBetween: 0,
          },
          // when window width is >= 480px
          480: {
            slidesPerView: listCount >= 3 ? 3.5 : listCount,
          },
          // when window width is >= 640px
          640: {
            slidesPerView: listCount >= 3 ? 3.5 : listCount,
          },
          // when window width is >= 768px
          768: {
            slidesPerView: listCount >= 3 ? 3.5 : listCount,
          },
          // when window width is >= 900px
          1024: {
            slidesPerView: listCount >= 4 ? 4.5: listCount,
          },
          1280: {
            slidesPerView: listCount >= 5 ? 5.5 : listCount,
          },
        }}
        >
        {productList.map((product) => {
          return (
            <SwiperSlide key={product.id}>
              <motion.div className="slide_block" variants={item}>
                <Link href={`/inmotion-mobility/produit/${product.slug}`}>
                  <motion.a className="link" whileHover={{
                    scale: 1.04,
                    transition: { duration: 0.07 },
                  }}
                  style={{ originX: 0.5 }}
                  whileTap={{ scale: 0.98, transition: { duration: 0.02 } }}>
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
                  </motion.a>
                </Link>
              </motion.div>
            </SwiperSlide>
          );
        })}
      </Swiper>
        </motion.div>
    </CarouselBox>
  );
}
