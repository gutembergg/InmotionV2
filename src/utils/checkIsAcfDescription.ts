import { IProduct } from "../interfaces/IProducts";

// export const checkIsAcfDescription = (product: IProduct) => {
//   const acfKeys = Object.keys(product.acf);
//   let productIsAcf = {};
//   acfKeys.forEach((item) => {
//     if (item === "description_du_produit") {
//       const acf = product.acf.description_du_produit;
//       console.log("acfKeys",acf)
//       if (Array.isArray(acf)) {
//         productIsAcf = { ...product, isAcfDescription: true };
//       }
//     } else {
//       productIsAcf = { ...product, isAcfDescription: false };
//     }
//   });

//   return productIsAcf;
// };

export const checkIsAcfDescription = (product: IProduct) => {
  const acfKeys = Object.keys(product.acf);

  let response = { ...product, isAcfDescription: false };

  acfKeys.forEach((item) => {
    if (item !== "description_du_produit") {
      return;
    }
    if (item.length === 0) {
      return;
    }
    if (item[0].length === 0) {
      return;
    }

    return (response = { ...product, isAcfDescription: true });
  });
  return response;
};
