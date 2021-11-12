import Image from "next/image";

import { useState } from "react";

import useCart from "../../hooks/useCart";
import { IProduct } from "../../interfaces/IProducts";
import getAcfContent from "../../utils/getAcfContent";
import placeholder from"../../../public/images/placeholder_woocommerce.png"

import {
  Container,
  ImageBlock,
  Button,
  PriceQuantity,
  StockProduct,
} from "./styles";

interface IProps {
  product: IProduct;
}

const ProductCardAdmin = ({ product }: IProps) => {
  const { cartItem, addToCart } = useCart();

  const [productQty, setProductQty] = useState(1);

  const handleAddToCart = (product: IProduct) => {
    const productExist = cartItem.find((item) => item.id === product.id);

    if (productExist) {
      const newCart = [...cartItem];

      const cart = newCart.map((item) =>
        item.id === product.id
          ? { ...productExist, qty: productExist.qty + productQty }
          : item
      );

      addToCart(cart);
    } else {
      addToCart([...cartItem, { ...product, qty: productQty }]);
    }
  };
console.log(product)
  return (
    <div>
      <Container>
        <Button>
          <button type="button" onClick={() => handleAddToCart(product)}>
            <ImageBlock>
              <Image
                width={250}
                height={250}
                src={product.images[0] ? product.images[0].src : placeholder.src}
                alt={product.name}
              />
            </ImageBlock>
            <div>
              <div>
                <h2 className="first_title">
                  {getAcfContent(product, "marque_du_produit")}{" "}
                  <span>{getAcfContent(product, "modele_du_produit")}</span>
                </h2>
                <PriceQuantity>
                  <div className="regularPrice">
                    CHF {product.regular_price}
                  </div>
                  <div className="salePrice">CHF {product.sale_price}</div>
                </PriceQuantity>

                {product.stock_status === "outofstock" && (
                  <StockProduct>
                    <div>indisponible</div>
                  </StockProduct>
                )}
                {product.stock_status === "onbackorder" && (
                  <StockProduct>
                    <div>Sur commande</div>
                  </StockProduct>
                )}
                {product.stock_status === "instock" && (
                  <StockProduct>
                    <div>En stock: {product.stock_quantity} pièces</div>
                  </StockProduct>
                )}
              </div>
            </div>
          </button>
        </Button>
      </Container>
    </div>
  );
};

export default ProductCardAdmin;
