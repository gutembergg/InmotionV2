import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import useCart from "../../hooks/useCart";
import placeholder from "../../../public/images/placeholder_woocommerce.webp";
import useCurrency from "../../hooks/useCurrency";
import { BsCart2 } from "react-icons/bs";
import { StyledCart } from "./styles";
import useTranslation from "next-translate/useTranslation";
import Notiflix from "notiflix";
const Cart = () => {
  const router = useRouter();
  const cartModalRef = useRef<HTMLDivElement>(null);
  const { cart, removeCartItem } = useCart();
  const { currency } = useCurrency();
  const [opencart, setopencart] = useState(false);

  const { t } = useTranslation();
  const noproducts = t("headerMobility:noproducts");
  const voirpanier = t("headerMobility:voirpanier");
  const voirPaiement = t("headerMobility:voirPaiement");
  const subtotal = t("headerMobility:subtotal");
  const cartBlockTitle = t("headerMobility:cartBlockTitle");
  const cartBlockDescr = t("headerMobility:cartBlockDescr");
  const backToCart = t("headerMobility:backToCart");

  const setCartVisibility = () => {
    if (router.pathname === "/inmotion-mobility/checkout-mobility") {
      Notiflix.Confirm.show(
        `${cartBlockTitle}`,
        `${cartBlockDescr}`,
        "Ok",
        `${backToCart}`,
        () => {
          return;
        },
        () => {
          router.push("/inmotion-mobility/panier");
        },
        { width: "500px" }
      );
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
                          {product.qty}x{" "}
                          {currency === "CHF"
                            ? product.price
                            : product.euroPrice}{" "}
                          {currency === "CHF" ? "CHF" : "EUR"}
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
                  <p>{noproducts}</p>
                </li>
              )}
            </ul>
            {Object.keys(cart).length > 0 && cart.totalProductsCount > 0 && (
              <h5 className="sousTotalTxt">
                {subtotal}{" "}
                <span>
                  {cart.totalProductsPrice?.toFixed(2)}{" "}
                  {currency === "CHF" ? "CHF" : "EUR"}
                </span>
              </h5>
            )}
            {Object.keys(cart).length > 0 && cart.totalProductsCount > 0 && (
              <div className="btnVoirPanier">
                <p
                  onClick={() => {
                    goToLink("/inmotion-mobility/panier");
                  }}
                  className="btnVoirPanierText"
                >
                  {voirpanier}
                </p>
                0
              </div>
            )}
          </div>
        </div>
      </div>
    </StyledCart>
  );
};
export default Cart;
