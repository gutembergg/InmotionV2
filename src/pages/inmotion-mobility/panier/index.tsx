import React, { ChangeEvent, ReactElement, useCallback, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import router from "next/router";
import { IProduct } from "../../../interfaces/IProducts";
import useCart from "../../../hooks/useCart";
import ButtonSkew from "../../../components/ButtonSkew";
import placeholder from "../../../../public/images/placeholder_woocommerce.webp";

import { Container, StyledCart } from "../../../styles/PanierStyle";
import useTranslation from "next-translate/useTranslation";
import LayoutMobility from "../../../Layout/LayoutMobility";
import useCurrency from "../../../hooks/useCurrency";

export default function Panier() {
  const { cart, cartItem, addToCart, removeCartItem } = useCart();
  const { currency } = useCurrency();

  const currencyCHF = currency === "CHF";

  const { t } = useTranslation();
  const titleText = t("common:cartTitle");
  const noproducts = t("headerMobility:noproducts");
  const voirPaiement = t("headerMobility:voirPaiement");
  const subtotal = t("headerMobility:subtotal");

  useEffect(() => {
    if (Object.keys(cart).length === 0) {
      if (typeof window !== "undefined") {
        router.push("/inmotion-mobility");
      }
    }
  }, [cart]);

  const handleAddToCart = useCallback(
    (product: IProduct, productQty: number) => {
      const productExist = cartItem.find((item) => item.id === product.id);

      if (productExist) {
        const newCart = [...cartItem];

        if (productQty <= 0) {
          const cart = newCart.filter((item) => item.id !== product.id);

          addToCart(cart);
        } else {
          const cart = newCart.map((item) =>
            item.id === product.id ? { ...productExist, qty: productQty } : item
          );

          addToCart(cart);
        }
      } else {
        addToCart([...cartItem, { ...product, qty: productQty }]);
      }
    },
    [addToCart, cartItem]
  );

  const handleChangeQty = useCallback(
    (e: ChangeEvent<HTMLInputElement>, product) => {
      if (e.target.value.trim() !== "") {
        handleAddToCart(product, parseInt(e.target.value));
      }
    },
    [handleAddToCart]
  );

  return (
    <Container>
      <StyledCart>
        <ButtonSkew text={titleText} />
        <div className="cartPreview">
          <div className="cartContainer">
            <ul>
              {cart.totalProductsCount > 0 ? (
                cart.products.map((product: IProduct) => {
                  return (
                    <li key={product.id}>
                      <button
                        className="closeButton"
                        onClick={() => removeCartItem(product.id)}
                      ></button>
                      <div className="contentLeft">

                      <div className="cartProductThmbnail">
                        {product.isVariation ? (
                          <Image
                          src={
                              product.image
                              ? product.image.src
                              : placeholder.src
                            }
                            alt={product.name}
                            height={60}
                            width={60}
                            />
                            ) : (
                              <Image
                              src={
                                product.images[0]
                                ? product.images[0].src
                                : placeholder.src
                              }
                              alt={product.name}
                              height={60}
                              width={60}
                              />
                              )}
                      </div>
                      <h5>{product.name}</h5>
                      </div>
                      <div className="rightContent">
                      {product.on_sale && (
                        <>
                          <p className="onSalePrice">
                            <span className="product_prices">
                              {currencyCHF ? "CHF" : "EUR"}
                            </span>

                            <strong>
                              {currencyCHF
                                ? product.regular_price
                                : product.euroRegularPrice}
                            </strong>
                          </p>
                          <p className="productPrice">
                            <span className="product_prices">
                              {currencyCHF ? "CHF" : "EUR"}
                            </span>
                            <strong>
                              {currencyCHF
                                ? product.sale_price
                                : product.euroPrice}
                            </strong>
                          </p>
                        </>
                      )}
                      {!product.on_sale && (
                        <p className="productPrice">
                          <span className="product_prices">
                            {currencyCHF ? "CHF" : "EUR"}
                          </span>
                          <strong>
                            {currencyCHF
                              ? product.regular_price
                              : product.euroRegularPrice}{" "}
                          </strong>
                        </p>
                      )}
                      <div className="qtyInput">
                        {"x "}
                        <input
                          type="number"
                          value={product.qty}
                          onChange={(e) => handleChangeQty(e, product)}
                          min="0"
                          />
                      </div>
              </div>
                    </li>
                  );
                })
              ) : (
                <li>
                  <p>{noproducts}</p>
                </li>
              )}
            </ul>
            <h5 className="sousTotalTxt">
              {subtotal} {cart.totalProductsPrice?.toFixed(2)} <span>{currencyCHF ? "CHF" : "EUR"} </span>
              
            </h5>
            <button className="btnCommander">
              <Link href="/inmotion-mobility/checkout-mobility">
                <a>{voirPaiement}</a>
              </Link>
            </button>
          </div>
        </div>
      </StyledCart>
    </Container>
  );
}

Panier.getLayout = function getLayout(page: ReactElement) {
  return <LayoutMobility>{page}</LayoutMobility>;
};
