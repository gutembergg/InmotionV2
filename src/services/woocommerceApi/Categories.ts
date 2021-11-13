import axios from "axios";
import { ICategories } from "../../interfaces/ICategories";
import wcApi from "./wcAxiosConfig";
import { wooCommerce } from "./woocommerceConfig";

// Get all categories////////////////////////////////////////////
export const getCategories = async () => {
  const { data } = await wooCommerce.get("products/categories", {
    per_page: 50,
  });

  return data;
};

// Get categories by slug /////////////////////////////////////////
export const getCategoriesBySlug = async (slug: string) => {
  const { data } = await wooCommerce.get("products/categories", {
    slug: slug,
  });

  return data[0];
};

// Get category by ID /////////////////////////////////////////
export const getCategoryById = async (id: string) => {
  const response = await wooCommerce.get(`products/categories/${id}`);

  return response;
};

/* export const getSubCategories = async (slug: string) => {
  const category = await getCategoriesBySlug(slug);
  const categoryId = category.id;

  const { data } = await wooCommerce.get("products/categories", {
    parent: categoryId,
  });

  return data;
};
 */
// Get accessoires sub categories///////////////////////////////
/* export const getAccessorySubCategories = async () => {
  const accessoriesCategory = await getCategoriesBySlug(
    "pieces-detachees-mobility"
  );
  const accessoiresId = accessoriesCategory[0].id;

  const response = await wooCommerce.get("products/categories", {
    parent: accessoiresId,
  });

  return response;
}; */

// Get mobility menu categories for Header component///////////////
/* export const getMobilityCategoriesMenu = async () => {
  const mobilityCategory = await getCategoriesBySlug("boutique");
  const mobilityId = mobilityCategory.id;

  const { data } = await wooCommerce.get("products/categories", {
    parent: mobilityId,
  });

  const response: ICategories[] = data;
  const mobilityCategories = response.filter(
    (category) => category.slug !== "occasions"
  );

  return mobilityCategories;
}; */

/* export const getSubCategoriesEquipimentPilote = async () => {
  const response = await getCategoriesBySlug("equipements");

  const { data } = await wooCommerce.get("products/categories", {
    parent: response.id,
  });

  return data;
}; */

// Functions with woocommerce rest api without library ///////////////////////

export const wc_getCategoriesBySlug = async (
  slug: string,
  lang: string
): Promise<ICategories> => {
  const { data } = await wcApi.get("products/categories", {
    params: {
      lang: lang,
      slug: slug,
    },
  });

  return data[0];
};

/* export const wc_getSubCategories = async (
  slug: string,
  lang = "fr"
): Promise<ICategories[]> => {
  const category = await wc_getCategoriesBySlug(slug, lang);

  const { data: subCat } = await wcApi.get("products/categories", {
    params: {
      lang: lang,
      parent: category.id,
    },
  });

  return subCat;
}; */

export const wc_getSub_categories = async (
  lang: string,
  parentId: number
): Promise<ICategories[]> => {
  const { data: subCat } = await wcApi.get("products/categories", {
    params: {
      lang: lang,
      parent: parentId,
    },
  });

  return subCat;
};
