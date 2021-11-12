import React from "react";
import { IProduct } from "../../interfaces/IProducts";
import ProductCard from "../ProductCard";
import ProductCardAdmin from "../ProductCardAdmin";

import { ProductsCards } from "./styles";

export interface IProps {
  products: IProduct[];
  productByCategory: IProduct[];
  showAllProducts: boolean;
}

const CaisseProductList = ({
  products,
  productByCategory,
  showAllProducts,
}: IProps) => {
  return (
    <ProductsCards>
      {showAllProducts ? (
        products.map((product) => {
          return (
            <div className="product_card" key={product.id}>
              <ProductCardAdmin product={product} />
            </div>
          );
        })
      ) : (
        <>
          {productByCategory.map((item) => (
            <div className="product_card" key={item.id}>
              <ProductCardAdmin product={item} />
            </div>
          ))}
        </>
      )}
    </ProductsCards>
  );
};

export default CaisseProductList;
