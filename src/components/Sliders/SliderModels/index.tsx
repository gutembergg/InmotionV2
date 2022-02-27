import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/scrollbar";
import SwiperCore,{ Scrollbar} from "swiper";
import { IProduct } from "../../../interfaces/IProducts";
import Image from "next/dist/client/image";
import { Container, UpSellButton } from "./styles";
import "swiper/css/scrollbar";
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
      scrollbar={true}
        direction="horizontal"
        slidesPerView={2.5}
        spaceBetween={15}
        breakpoints={{
          390: {
            slidesPerView: 2.5,
          },
          512: {
            slidesPerView: 3.5,
          },
          640: {
            slidesPerView: 3.5,
          },
          760: {
            slidesPerView: 3.5,
          },
          980: {
            slidesPerView: 4.5,
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
                  <div className="ImgBox">
                  <Image
              objectFit="contain"
              layout="fill"
              src={product.images[0].src}
              alt={product.images[0].alt}
              placeholder="blur"
              blurDataURL={product.images[0].src}
            />
                  </div>
                  <h2>{product.name}</h2>
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
