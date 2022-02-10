import { NextPage } from "next";
import React, { ChangeEvent, ReactElement, useCallback, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import thankIcon from "../../../../public/images/icons/thank-you.svg";
import { IProduct } from "../../../interfaces/IProducts";
import useCart from "../../../hooks/useCart";
import ButtonSkew from "../../../components/ButtonSkew";
import placeholder from "../../../../public/images/placeholder_woocommerce.webp";

import { Container, StyledCart } from "../../../styles/PanierStyle";
import useTranslation from "next-translate/useTranslation";
import LayoutMobility from "../../../Layout/LayoutMobility";

export default function Panier() {
  const { cart, cartItem, addToCart, removeCartItem } = useCart();

  const { t } = useTranslation();
  const titleText = t("common:cartTitle");

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
                      <div className="cartProductThmbnail">
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
                      </div>
                      <h5>{product.name}</h5>
                      {product.on_sale && (
                        <p className="onSaleBadge">Promotion</p>
                      )}
                      {product.on_sale && (
                        <>
                          <p className="onSalePrice">
                            CHF <strong>{product.regular_price}</strong>
                          </p>
                          <p className="productPrice">
                            CHF <strong>{product.sale_price}</strong>
                          </p>
                        </>
                      )}
                      {!product.on_sale && (
                        <p className="productPrice">
                          CHF <strong>{product.regular_price} </strong>
                        </p>
                      )}
                      <div className="qtyInput">
                        Qty :{" "}
                        <input
                          type="number"
                          value={product.qty}
                          onChange={(e) => handleChangeQty(e, product)}
                          min="0"
                        />
                      </div>
                    </li>
                  );
                })
              ) : (
                <li>
                  <p>aucun produit</p>
                </li>
              )}
            </ul>
            <h5 className="sousTotalTxt">
              Sous total: <span>CHF {cart.totalProductsPrice?.toFixed(2)}</span>
            </h5>
            <button className="btnCommander">
              <Link href="/inmotion-mobility/checkout-mobility">
                <a>Checkout</a>
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
