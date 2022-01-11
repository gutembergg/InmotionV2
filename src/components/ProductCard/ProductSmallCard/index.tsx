import Image from "next/image";
import useCurrency from "../../../hooks/useCurrency";
import { IProduct } from "../../../interfaces/IProducts";
import {
  Container,
  ImageBlock,
  Name,
  Stock,
  PriceBlock,
  ButtonAddToCart,
} from "./styles";

interface Props {
  product: IProduct;
}

const ProductSmallCard = ({ product }: Props) => {
  const { currency } = useCurrency();

  return (
    <Container>
      <Image
        width={150}
        height={150}
        src={product.images[0].src}
        placeholder="blur"
        blurDataURL={product?.images[0].src}
        alt={product.name}
      />

      <Name>{product.name}</Name>
      <PriceBlock>
        <span>
          price {currency === "CHF" ? product?.price : product.euroPrice}
        </span>
      </PriceBlock>
      <Stock>stock{product.stock_quantity}</Stock>
      <ButtonAddToCart>Ajouter au panier</ButtonAddToCart>
    </Container>
  );
};

export default ProductSmallCard;
