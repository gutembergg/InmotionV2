import useTranslation from "next-translate/useTranslation";
import Image from "next/image";
import Link from "next/link";
import useCart from "../../../hooks/useCart";
import useCurrency from "../../../hooks/useCurrency";
import { IProduct } from "../../../interfaces/IProducts";
import StockStatuts from "../../StockStatus";

import {
  Container,
  ProductBlock,
  ProductInfo,
  IconFleche,
  BtnDetail,
  BtnAddToCart,
} from "./styles";

interface Props {
  product: IProduct;
  isEquipement?: boolean;
}

const MobileCard = ({ product, isEquipement = false }: Props) => {
  const { cartItem, addToCart } = useCart();
  const { currency } = useCurrency();
  const { t } = useTranslation();
  const btnAddToCart = t("productDetail:addToCart");
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
          {isEquipement ? (
            <BtnAddToCart>
              <Link href={`/inmotion-mobility/produit/${product.slug}`}>
                {showVariationTradution}
              </Link>
            </BtnAddToCart>
          ) : (
            <>
              <BtnAddToCart onClick={() => handleAddToCart(product)}>
                {btnAddToCart}
              </BtnAddToCart>
              <Link href={`/inmotion-mobility/produit/${product.slug}`}>
                <a className="detail_view">Afficher le detail</a>
              </Link>
            </>
          )}
        </ProductInfo>
      </ProductBlock>
    </Container>
  );
};

export default MobileCard;
