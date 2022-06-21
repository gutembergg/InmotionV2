import useTranslation from "next-translate/useTranslation";
import Image from "next/image";
import { useRouter } from "next/router";
import Notiflix from "notiflix";
import useCart from "../../../hooks/useCart";
import { IProduct } from "../../../interfaces/IProducts";
import StockStatuts from "../../StockStatus";
import { Container, Name, BtnProductDetail } from "./styles";

interface Props {
  product: IProduct;
}

const ProductSmallCardB2B = ({ product }: Props) => {
  const router = useRouter();
  const { cartItem, addToCart } = useCart();
  const { t } = useTranslation();
  const showVariationTradution = t("b2b:showVariationTradution");
  const sale = t("productDetail:Promotion");
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
      .push(`/inmotion-mobility/b2b/produit/${slug}`)
      .then((res) => handleStop());
  };

  return (
    <Container>
      <div onClick={() => handleShowDetails(product.slug)}>
        <a>
          {Array.isArray(product.images) && (
            <div className="imgBlock">
              <Image
                layout="fill"
                objectFit="contain"
                src={product.images[0].src}
                placeholder="blur"
                blurDataURL={product?.images[0].src}
                alt={product.name}
              />
            </div>
          )}

          {product.on_sale && <p className="onsale">{sale} </p>}

          <Name>{product.name}</Name>
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
      <BtnProductDetail onClick={() => handleShowDetails(product.slug)}>
        {showVariationTradution}
      </BtnProductDetail>
    </Container>
  );
};

export default ProductSmallCardB2B;
