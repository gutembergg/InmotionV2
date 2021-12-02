import Image from "next/image";
import Link from "next/link";
import cartIcon from "../../../public/images/icons/cart.svg";
import useCart from "../../hooks/useCart";
import { StyledCart } from "./styles";
import placeholder from "../../../public/images/placeholder_woocommerce.png";
import { useState } from "react";
import { useRouter } from "next/router";

const Cart = () => {
  const { cart, removeCartItem } = useCart();
  const [opencart, setopencart] = useState(false)

  const setCartVisibility =()=>{
    setopencart(!opencart)
  }
  const router = useRouter();

  const goToLink = (linkUrl: string) => {
    router.push(linkUrl);
    setopencart(false);
  };


  return (
    <StyledCart>
      <div className="cartIconElement">
        <div className="cartIcon" onClick={setCartVisibility}>
          <Image src={cartIcon} width={30} height={30} alt="search icon" />
        </div>

        {Object.keys(cart).length > 0 && cart.totalProductsCount ? (
          <div id="cartItemsNumber">{cart.totalProductsCount}</div>
        ) : (
          <div id="cartItemsNumber">0</div>
        )}
        <div className={opencart === true ? "cartPreview open":"cartPreview"}>
          <div className="cartContainer">
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
                          {product.qty}x CHF {product.price}
                        </p>
                      </div>
                      <div className="cartProductThmbnail">
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
            {Object.keys(cart).length > 0 && cart.totalProductsCount > 0 ? (
              <div className="btnVoirPanier">
                <p onClick={()=>{goToLink("/inmotion-mobility/panier")}} className="btnVoirPanierText">Voir le panier</p>0
              </div>
            ) : (
              <div className="btnVoirPanier disabled">
                <p>panier non disponible</p>
              </div>
            )}
            {Object.keys(cart).length > 0 && cart.totalProductsCount > 0 ? (
              <div className="btnCommander">
                <p onClick={()=>{goToLink("/inmotion-mobility/checkout-mobility")}} className="btnVoirCheckoutText">Checkout</p>
              </div>
            ) : (
              <div className="btnCommander disabled">
                <p>checkout non disponible</p>
              </div>
            )}
            <p className="closeCartButton" onClick={setCartVisibility}>Fermer</p>
          </div>
        </div>
      </div>
    </StyledCart>
  );
};
export default Cart;
