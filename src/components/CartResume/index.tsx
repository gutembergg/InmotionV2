import Image from "next/image";
import useCart from "../../hooks/useCart";
import ButtonSkew from "../ButtonSkew";
import { StyledCart } from "./styles";
import Link from "next/link";
import placeholder from "../../../public/images/placeholder_woocommerce.webp";

const CartResume = () => {
  const { cart, removeCartItem } = useCart();

  return (
    <StyledCart>
      <ButtonSkew text="Votre panier en détail" />
      <div className="cartPreview">
        <div className="cartContainer">
          <ul>
            {cart.totalProductsCount > 0 ? (
              cart.products.map((product) => {
                return (
                  <li key={product.id}>
                    <button
                      className="closeButton"
                      onClick={() => removeCartItem(product.id)}
                    ></button>
                    <div className="cartProductThmbnail">
                      <Image
                        src={product.images[0] ? product.images[0].src : placeholder.src}
                        alt={product.name}
                        height={60}
                        width={60}
                      />
                    </div>
                    <h5>{product.name}</h5>
                    {product.on_sale &&(
                      <p className="onSaleBadge">Promotion</p>
                    )}
                    {product.on_sale && (
                      <>
                        <p className="onSalePrice">CHF <strong>{product.regular_price}</strong></p>
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
                      Qty : <input type="number" defaultValue={product.qty.toString()} min="0" />
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
            <Link href="/admin/checkout">
              <a>Checkout</a>
            </Link>
          </button>
        </div>
      </div>
    </StyledCart>
  );
};
export default CartResume;
