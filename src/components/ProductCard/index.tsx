import Image from "next/image";
import Link from "next/link";
import { ChangeEvent, useCallback, useState } from "react";

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

const ProductCard = ({ product }: IProps) => {
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

  const handleChangeQty = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const quantity = parseInt(e.target.value, 10);
    setProductQty(quantity);
  }, []);

  return (
    <div>
      <Container>
        <h2 className="first_title">
          {getAcfContent(product, "marque_du_produit")}{" "}
          <span>{getAcfContent(product, "modele_du_produit")}</span>
        </h2>
        <Link href={`/products/${product.name}-${product.id}`}>
          <a>
            <ImageBlock>
              <Image
                width={250}
                height={250}
                src={product.images[0].src && placeholder.src} 
                alt={product.name}
              />
            </ImageBlock>
          </a>
        </Link>
        <PriceQuantity>
          <div className="price">{product.price}</div>

          <input
            type="number"
            onChange={handleChangeQty}
            value={productQty}
            placeholder="1"
          />
        </PriceQuantity>
        <Button>
          <button type="button" onClick={() => handleAddToCart(product)}>
            Ajouter au panier
          </button>
        </Button>

        {product.stock_status === "outofstock" && (
          <StockProduct>
            <div>indisponible</div>
          </StockProduct>
        )}
        {product.stock_status === "onbackorder" && (
          <StockProduct>
            <div>livraison: 8 à 10 jours</div>
          </StockProduct>
        )}
        {product.stock_status === "instock" && (
          <StockProduct>
            <div>En stock: {product.stock_quantity} pièces</div>
          </StockProduct>
        )}
      </Container>
    </div>
  );
};

export default ProductCard;
