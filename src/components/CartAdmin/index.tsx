import Image from "next/image";
import useCart from "../../hooks/useCart";
import ButtonSkew from "../ButtonSkew";
import { StyledCart } from "./styles";
import Link from "next/link";
import placeholder from "../../../public/images/placeholder_woocommerce.webp";

const CartAdmin = () => {
  const { cart, removeCartItem } = useCart();

  return (
    <StyledCart>
      <ButtonSkew text="Panier"/>
        <div className="cartPreview">
          <div className="cartContainer">
            <ul>
              {cart.totalProductsCount > 0 
                ? cart.products.map((product) => {
                    return (
                      <li key={product.id}>
                        <button className="closeButton" onClick={() => removeCartItem(product.id)}>
                        </button>
                        <div className="cartProductInfos">
                          <h5>{product.name}</h5>
                          <p>
                            {product.qty}x CHF {product.price}
                          </p>
                        </div>
                        <div className="cartProductThmbnail">
                          <Image
                            src={product.images[0] ? product.images[0].src : placeholder.src}
                            alt={product.name}
                            height={50}
                            width={50}
                          />
                        </div>
                      </li>
                    );
                  })
                : (<li><p>aucun produit</p></li>)}
            </ul>
            <h5 className="sousTotalTxt">
              Sous total: <span>CHF {cart.totalProductsPrice?.toFixed(2)}</span>
            </h5>
            <button className="btnVoirPanier">
            <Link href="/admin/panier">
            <a>
            Voir le panier
            </a>
          </Link>
              </button>
            <button className="btnCommander">Commander</button>
          </div>
        </div>
    </StyledCart>
  );
};
export default CartAdmin;
