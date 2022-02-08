import Image from "next/image";
import Link from "next/link";
import useCart from "../../../hooks/useCart";
import useCurrency from "../../../hooks/useCurrency";
import { IProduct } from "../../../interfaces/IProducts";
import ButtonSkew from "../../ButtonSkew";
import {
  Container,
  ImageBlock,
  Name,
  Stock,
  PriceBlock,
  ButtonAddToCart,
  BtnProductDetail,
} from "./styles";

interface Props {
  product: IProduct;
}

const ProductSmallCard = ({ product }: Props) => {
  const { currency } = useCurrency();
  const { cartItem, addToCart } = useCart();

  const handleAddToCart = (product: IProduct) => {
    const productExist = cartItem.find((item) => item.id === product.id);

    if (productExist) {
      const newCart = [...cartItem];

      const cart = newCart.map((item) =>
        item.id === product.id
          ? { ...productExist, qty: productExist.qty + 1 }
          : item
      );

      addToCart(cart);
    } else {
      addToCart([...cartItem, { ...product, qty: 1 }]);
    }
  };

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

      {product.on_sale && <ButtonSkew text="Promotion!" />}

      <Name>{product.name}</Name>
      <PriceBlock>
        <span>
          price {currency === "CHF" ? product?.price : product.euroPrice}
        </span>
      </PriceBlock>
      <Stock>stock{product.stock_quantity}</Stock>
      <ButtonAddToCart onClick={() => handleAddToCart(product)}>
        Ajouter au panier
      </ButtonAddToCart>
      <BtnProductDetail>
        <Link href={`/inmotion-mobility/produit/${product.slug}`}>
          Afficher detail du produit
        </Link>
      </BtnProductDetail>
    </Container>
  );
};

export default ProductSmallCard;
