import { IProduct } from "../interfaces/IProducts";
import { getProductsByUpSellIds } from "../services/woocommerceApi/Products";
import { swicthCategoriesSlug } from "./swicthCategoriesSlug";

export const getProductsUpSells = async (
  productsList: IProduct[],
  lang: string,
  categorySlug: string
) => {
  let upSell: number[] = [];

  productsList.filter((product: IProduct) =>
    product.upsell_ids.filter((id) => upSell.push(id))
  );

  const uniquesUpSells = upSell.filter(
    (item, index) => upSell.indexOf(item) === index
  );

  const __uniquesUpSells = uniquesUpSells.map((item) => String(item));
  const listModels = await getProductsByUpSellIds(__uniquesUpSells, lang);

  const productsByCat = listModels.filter((item: any) =>
    item.categories.find(
      (cat: any) => cat.slug === swicthCategoriesSlug(categorySlug)
    )
  );

  return productsByCat;
};
