import useTranslation from "next-translate/useTranslation";
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
  const { t } = useTranslation();
  const addToCartTradution = t("productDetail:addToCart");
  const showVariationTradution = t("productDetail:showVariationTradution");

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
console.log("product",product)
  return (
    <Container>
      <Link href={`/inmotion-mobility/produit/${product.slug}`}>
        <a>
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
              {currency === "CHF" ? product?.price : product.euroPrice} {currency}
            </span>
          </PriceBlock>
          <Stock>stock{product.stock_quantity}</Stock>
        </a>
      </Link>
      {product.variations.length > 0 ? (
      <BtnProductDetail>
        <Link href={`/inmotion-mobility/produit/${product.slug}`}>
          {showVariationTradution}
        </Link>
      </BtnProductDetail>
      ):(
           <ButtonAddToCart onClick={() => handleAddToCart(product)}>
        {addToCartTradution}
      </ButtonAddToCart>
      )}
   

    </Container>
  );
};

export default ProductSmallCard;
