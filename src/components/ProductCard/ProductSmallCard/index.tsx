import useTranslation from "next-translate/useTranslation";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import Notiflix from "notiflix";
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
  const router = useRouter();
  const { currency } = useCurrency();
  const { cartItem, addToCart } = useCart();
  const { t } = useTranslation();
  const addToCartTradution = t("productDetail:addToCart");
  const showDetails = t("productDetail:showDetails");
  const showVariationTradution = t("productDetail:showVariationTradution");
  const sale = t("productDetail:Promotion");
  const priceFrom = t("productDetail:priceFrom");
  const preorder = t("productDetail:preorder");
  const preorderDate = t("productDetail:preorderDate");

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

  const handleShowDetails = (slug: string) => {
    Notiflix.Loading.init({
      svgColor: "var(--Blue)",
      svgSize: "100px",
      messageColor: "var(--Red)",
      messageFontSize: "17px",
      backgroundColor: "rgba(234, 234, 234, 0.856)",
    });

    const handleStart = () => {
      Notiflix.Loading.standard("Loading...");
    };
    const handleStop = () => {
      Notiflix.Loading.remove();
    };
    handleStart();
    router
      .push(`/inmotion-mobility/produit/${slug}`)
      .then((res) => handleStop());
  };

  // console.log("product===>", product.stock_status);

  return (
    <Container>
      <div onClick={() => handleShowDetails(product.slug)}>
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
          {product.variations.length > 0 ? (
            <>
              <PriceBlock>
                <div className={product?.on_sale ? "regular_price" : ""}>
                  {priceFrom}{" "}
                  {currency === "CHF"
                    ? !!product?.price && product?.price + " " + currency
                    : !!product?.euroPrice &&
                      product?.euroPrice + " " + currency}
                </div>

                <div className="sale_price">
                  {currency === "CHF"
                    ? !!product?.sale_price &&
                      product?.sale_price + " " + currency
                    : !!product?.sale_price &&
                      product?.euroPrice + " " + currency}
                </div>
              </PriceBlock>
            </>
          ) : (
            <>
              <PriceBlock>
                <div className={product?.on_sale ? "regular_price" : ""}>
                  {currency === "CHF"
                    ? !!product?.regular_price &&
                      product?.regular_price + " " + currency
                    : !!product?.euroRegularPrice &&
                      product?.euroRegularPrice + " " + currency}
                </div>

                <div className="sale_price">
                  {currency === "CHF"
                    ? !!product?.sale_price &&
                      product?.sale_price + " " + currency
                    : !!product?.sale_price &&
                      product?.euroPrice + " " + currency}
                </div>
              </PriceBlock>
            </>
          )}
          {product.acf.precommande === true && (
            <>
              <div className="Preorder">
                {preorder} <br />
                {preorderDate} {product.acf.date_de_sortie}
              </div>
            </>
          )}
          <StockStatuts
            stock_quantity={product.stock_quantity}
            stock_status={product.stock_status}
          />
        </a>
      </div>
      {Array.isArray(product.variations) && product.variations.length > 0 ? (
        <BtnProductDetail onClick={() => handleShowDetails(product.slug)}>
          {showVariationTradution}
        </BtnProductDetail>
      ) : (
        <>
          <ButtonAddToCart
            disabled={false}
            onClick={() => handleAddToCart(product)}
          >
            {addToCartTradution}
          </ButtonAddToCart>

          <div onClick={() => handleShowDetails(product.slug)}>
            <a className="product_detail">{showDetails}</a>
          </div>
        </>
      )}
    </Container>
  );
};

export default ProductSmallCard;
