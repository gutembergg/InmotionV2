import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import useCart from "../../hooks/useCart";
import placeholder from "../../../public/images/placeholder_woocommerce.webp";
import useCurrency from "../../hooks/useCurrency";
import { BsCart2 } from "react-icons/bs";

import { StyledCart } from "./styles";

const Cart = () => {
  const router = useRouter();
  const cartModalRef = useRef<HTMLDivElement>(null);
  const { cart, removeCartItem } = useCart();
  const { currency } = useCurrency();
  const [opencart, setopencart] = useState(false);

  const setCartVisibility = () => {
    if (router.pathname === "/inmotion-mobility/checkout-mobility") {
      return;
    }
    setopencart(!opencart);
  };

  const goToLink = (linkUrl: string) => {
    setopencart(false);
    router.push(linkUrl);
  };

  useEffect(() => {
    const checkIfClickedOutside = (e: any) => {
      if (
        opencart &&
        cartModalRef.current &&
        !cartModalRef.current.contains(e.target)
      ) {
        setopencart(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [opencart]);

  return (
    <StyledCart>
      <div className="cartIconElement" onClick={setCartVisibility}>
        <div className="cartIcon">
          <BsCart2 size={23} color={"#0570A6"} />
        </div>

        {Object.keys(cart).length > 0 && cart.totalProductsCount ? (
          <div id="cartItemsNumber">{cart.totalProductsCount}</div>
        ) : (
          <div id="cartItemsNumber">0</div>
        )}
        <div className={opencart === true ? "cartPreview open" : "cartPreview"}>
          <div ref={cartModalRef} className="cartContainer">
            <ul>
              {Object.keys(cart).length > 0 && cart.totalProductsCount > 0 ? (
                cart.products.map((product) => {
                  return (
                    <li key={product.id}>
                      <button
                        className="closeButton"
                        onClick={() => removeCartItem(product.id)}
                      ></button>
                      <div className="cartProductInfos">
                        <h5>{product.name}</h5>
                        <p>
                          {product.qty}x {currency === "CHF" ? "CHF" : "EUR"}{" "}
                          {currency === "CHF"
                            ? product.price
                            : product.euroPrice}
                        </p>
                      </div>
                      <div className="cartProductThmbnail">
                        {product.isVariation ? (
                          <Image
                            src={
                              Object.keys(product.image).length > 0
                                ? product.image.src
                                : placeholder.src
                            }
                            alt={product.name}
                            height={50}
                            width={50}
                          />
                        ) : (
                          <Image
                            src={
                              product.images[0]
                                ? product.images[0].src
                                : placeholder.src
                            }
                            alt={product.name}
                            height={50}
                            width={50}
                          />
                        )}
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
              Sous total:{" "}
              <span>
                {currency === "CHF" ? "CHF" : "EUR"}{" "}
                {cart.totalProductsPrice?.toFixed(2)}
              </span>
            </h5>
            {Object.keys(cart).length > 0 && cart.totalProductsCount > 0 ? (
              <div className="btnVoirPanier">
                <p
                  onClick={() => {
                    goToLink("/inmotion-mobility/panier");
                  }}
                  className="btnVoirPanierText"
                >
                  Voir le panier
                </p>
                0
              </div>
            ) : (
              <div className="btnVoirPanier disabled">
                <p>panier non disponible</p>
              </div>
            )}
            {Object.keys(cart).length > 0 && cart.totalProductsCount > 0 ? (
              <div className="btnCommander">
                <p
                  onClick={() => {
                    goToLink("/inmotion-mobility/checkout-mobility");
                  }}
                  className="btnVoirCheckoutText"
                >
                  Checkout
                </p>
              </div>
            ) : (
              <div className="btnCommander disabled">
                <p>checkout non disponible</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </StyledCart>
  );
};
export default Cart;
