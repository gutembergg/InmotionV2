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
