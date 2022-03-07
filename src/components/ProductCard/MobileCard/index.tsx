import useTranslation from "next-translate/useTranslation";
import Image from "next/image";
import { useRouter } from "next/router";
import Notiflix from "notiflix";
import useCart from "../../../hooks/useCart";
import useCurrency from "../../../hooks/useCurrency";
import { IProduct } from "../../../interfaces/IProducts";
import StockStatuts from "../../StockStatus";

import { Container, ProductBlock, ProductInfo, BtnAddToCart } from "./styles";

interface Props {
  product: IProduct;
}

const MobileCard = ({ product }: Props) => {
  const router = useRouter();
  const { cartItem, addToCart } = useCart();
  const { currency } = useCurrency();
  const { t } = useTranslation();
  const btnAddToCart = t("productDetail:addToCart");
  const showDetails = t("productDetail:showDetails");
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

  return (
    <Container>
      <ProductBlock>
        <div className="image">
          <Image
            layout="fill"
            objectFit="contain"
            src={product.images[0].src}
            placeholder="blur"
            blurDataURL={product?.images[0].src}
            alt={product.name}
          />
        </div>

        <ProductInfo className="prod_info">
          <div>
            <h4>{product.name}</h4>
            <span>
              {currency === "CHF" ? product.price : product.euroPrice}
            </span>
            <span className="span_currency">
              {" "}
              {currency === "CHF" ? "CHF" : "EUR"}
            </span>
            {product.on_sale && <span className="onsale">{sale} </span>}
            <StockStatuts
              stock_quantity={product.stock_quantity}
              stock_status={product.stock_status}
            />
          </div>
          {Array.isArray(product.variations) &&
          product.variations.length > 0 ? (
            <BtnAddToCart>
              <p onClick={() => handleShowDetails(product.slug)}>
                {" "}
                {showVariationTradution}
              </p>
            </BtnAddToCart>
          ) : (
            <>
              <BtnAddToCart onClick={() => handleAddToCart(product)}>
                {btnAddToCart}
              </BtnAddToCart>
              <div onClick={() => handleShowDetails(product.slug)}>
                <p className="detail_view">{showDetails}</p>
              </div>
            </>
          )}
        </ProductInfo>
      </ProductBlock>
    </Container>
  );
};

export default MobileCard;
