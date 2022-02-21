import { IProduct } from "../interfaces/IProducts";

export const checkIsAcfDescription = (product: IProduct) => {
  const acfKeys = Object.keys(product.acf);
  let productIsAcf = {};
  acfKeys.forEach((item) => {
    if (item === "description_du_produit") {
      const acf = product.acf.description_du_produit;
      if (Array.isArray(acf)) {
        productIsAcf = { ...product, isAcfDescription: true };
      }
    } else {
      productIsAcf = { ...product, isAcfDescription: false };
    }
  });

  return productIsAcf;
};
