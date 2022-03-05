import useTranslation from "next-translate/useTranslation";
import Image from "next/image";
import Link from "next/link";
import useCart from "../../../hooks/useCart";
import useCurrency from "../../../hooks/useCurrency";
import { IProduct } from "../../../interfaces/IProducts";
import ButtonSkew from "../../ButtonSkew";
import StockStatuts from "../../StockStatus";
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
  const sale = t("productDetail:Promotion");

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
      <Link href={`/inmotion-mobility/produit/${product.slug}`}>
        <a>
          {Array.isArray(product.images) && (
            <Image
              width={150}
              height={150}
              src={product.images[0].src}
              placeholder="blur"
              blurDataURL={product?.images[0].src}
              alt={product.name}
            />
          )}

          {product.on_sale && <p className="onsale">{sale} </p>}

          <Name>{product.name}</Name>
          <PriceBlock>
            <span>
              {currency === "CHF" ? product?.price : product.euroPrice}{" "}
              {currency === "CHF" ? "CHF" : "EUR"}
            </span>
          </PriceBlock>
          <StockStatuts
            stock_quantity={product.stock_quantity}
            stock_status={product.stock_status}
          />
        </a>
      </Link>
      {Array.isArray(product.variations) && product.variations.length > 0 ? (
        <BtnProductDetail>
          <Link href={`/inmotion-mobility/produit/${product.slug}`}>
            {showVariationTradution}
          </Link>
        </BtnProductDetail>
      ) : (
        <>
          <ButtonAddToCart onClick={() => handleAddToCart(product)}>
            {addToCartTradution}
          </ButtonAddToCart>

          <Link href={`/inmotion-mobility/produit/${product.slug}`}>
            <a className="product_detail">Afficher le detail</a>
          </Link>
        </>
      )}
    </Container>
  );
};

export default ProductSmallCard;
