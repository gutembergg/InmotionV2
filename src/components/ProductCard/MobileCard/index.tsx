import useTranslation from "next-translate/useTranslation";
import Image from "next/image";
import Link from "next/link";
import useCart from "../../../hooks/useCart";
import useCurrency from "../../../hooks/useCurrency";
import { IProduct } from "../../../interfaces/IProducts";
import StockStatuts from "../../StockStatus";

import { Container, ProductBlock, ProductInfo, BtnAddToCart } from "./styles";

interface Props {
  product: IProduct;
  isEquipement?: boolean;
}

const MobileCard = ({ product, isEquipement = false }: Props) => {
  const { cartItem, addToCart } = useCart();
  const { currency } = useCurrency();
  const { t } = useTranslation();
  const btnAddToCart = t("productDetail:addToCart");
  const showDetails = t("productDetail:showDetails");
  const showVariationTradution = t("productDetail:showVariationTradution");
  const Promotion = t("productDetail:Promotion");
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
  console.log(product);
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
            {product.variations.length > 0 ? (
              
               <>
               <div className={product?.on_sale ? "regular_price" : ""}>
                {priceFrom}{" "} 
              {currency === "CHF"
                   ? !!product?.price &&
                     product?.price + " " + currency
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
               <div>
                 {product?.on_sale && <p className="promo">{Promotion}</p>}
               </div>
             </>
            ) : (
              <>
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
                <div>
                  {product?.on_sale && <p className="promo">{Promotion}</p>}
                </div>
              </>
            )}
            {product.acf.precommande === true && (<>
            <div className="Preorder">{preorder}{" "}<br />{preorderDate}{" "}{product.acf.date_de_sortie}</div>
            </>)}
            <StockStatuts
              stock_quantity={product.stock_quantity}
              stock_status={product.stock_status}
            />
          </div>
          {Array.isArray(product.variations) &&
          product.variations.length > 0 ? (
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
                <a className="detail_view">{showDetails}</a>
              </Link>
            </>
          )}
        </ProductInfo>
      </ProductBlock>
    </Container>
  );
};

export default MobileCard;
