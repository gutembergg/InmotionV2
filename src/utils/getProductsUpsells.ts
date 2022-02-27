import { IProduct } from "../interfaces/IProducts";
import { swicthCategoriesSlug } from "./swicthCategoriesSlug";

export const getProductsUpSells = (
  productsList: IProduct[],
  modelsList: Pick<IProduct, "name" | "slug" | "id" | "categories">[],
  categorySlug: string
) => {
  let upSell: number[] = [];

  productsList.filter((product: IProduct) =>
    product.upsell_ids.filter((id) => upSell.push(id))
  );

  const uniquesUpSells = upSell.filter(
    (item, index) => upSell.indexOf(item) === index
  );

  const productsModelsByDefault = uniquesUpSells.map((productId) => {
    const productsMobility = modelsList.filter(
      (product) => product.id === productId
    );

    const productsByCat = productsMobility.filter((item) =>
      item.categories.find(
        (cat) => cat.slug === swicthCategoriesSlug(categorySlug)
      )
    );

    return productsByCat;
  });

  return productsModelsByDefault.flat();
};
