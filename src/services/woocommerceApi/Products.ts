import { IProduct } from "../../interfaces/IProducts";
import wcApi from "./wcAxiosConfig";
import { wooCommerce } from "./woocommerceConfig";

// Get all products////////////////////////////////////////////
export const getProducts = async () => {
  const response = await wooCommerce.get("products", {
    per_page: 100,
  });

  return response;
};

// Get Products by categories //////////////////////////////
export const getProductByCategory = async (id: number, lang: string) => {
  const { data } = await wooCommerce.get(`products`, {
    id,
    lang: lang,
    per_page: 100,
  });

  return data;
};

// Get Product by slug //////////////////////////////////////////////
export const getProductBySlug = async (slug: string) => {
  const { data } = await wooCommerce.get("products", {
    slug: slug,
  });

  const product = data[0];

  return product;
};

// Get variations products //////////////////////////////////////////
export const getVariations = async (id: number) => {
  console.log("id", id);
  const { data } = await wooCommerce.get(`products/${id}/variations`);
  console.log("data==>", data);
  return data;
};

//  Get Product by slug /////////////////////////////////////////
export const wc_getProductBySlug = async (
  slug: string,
  lang: string
): Promise<IProduct> => {
  const { data } = await wcApi.get("products", {
    params: {
      slug,
      lang,
    },
  });

  return data[0];
};

//Get products by category ID ////////////////////////////////////
export const wc_getProductsByCategory = async (
  id: number,
  lang: string
): Promise<IProduct[]> => {
  const { data } = await wcApi.get("products", {
    params: {
      category: id,
      per_page: 100,
      lang: lang,
    },
  });

  return data;
};

//Get products by category SLUG ////////////////////////////////////

export const getProduitsByCategoriesSlug = async (
  slug: string,
  lang: string
): Promise<IProduct[]> => {
  const { data } = await wcApi.get("products/categories", {
    params: {
      slug,
      lang: lang,
      per_page: 100,
    },
  });

  const products = await wc_getProductsByCategory(data[0].id, lang);

  return products;
};

// Get FEATURED Products //////////////////////////////////////////////
export const getFeaturedProduct = async (lang: string): Promise<IProduct[]> => {
  const { data } = await wooCommerce.get("products", {
    featured: true,
    per_page: 8,
    lang: lang,
  });
  const product = data;
  return product;
};

// Get OnSale Products //////////////////////////////////////////////
export const getOnSaleProducts = async (lang: string): Promise<IProduct[]> => {
  const { data } = await wooCommerce.get("products", {
    on_sale: true,
    per_page: 8,
    lang: lang,
  });
  const product = data;
  return product;
};
