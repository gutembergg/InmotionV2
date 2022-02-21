import { IProduct } from "../../interfaces/IProducts";
import wcApi from "./wcAxiosConfig";
import { wooCommerce } from "./woocommerceConfig";

// Get all products////////////////////////////////////////////  !!!!!!!!!!!!!!FILTER NOT WORK HERE ACTUALY for admin/caisse
export const getProducts = async () => {
  const { data } = await wooCommerce.get("products", {
    per_page: 100,
  });
  return filterCategoryVisibility(data);
};

// Get Products by categories //////////////////////////////
export const getProductByCategory = async (
  id: number,
  lang: string
): Promise<IProduct[]> => {
  const { data } = await wooCommerce.get(`products`, {
    id,
    lang: lang,
    per_page: 100,
  });
  return filterCategoryVisibility(data);
};

// Get Product by slug //////////////////////////////////////////////
export const getProductBySlug = async (slug: string) => {
  const { data } = await wooCommerce.get("products", {
    slug: slug,
  });

  const product = data[0];
  return filterCategoryVisibility(product);
};

// Get variations products //////////////////////////////////////////
export const getVariations = async (id: number) => {
  const { data } = await wooCommerce.get(`products/${id}/variations`);

  return filterCategoryVisibility(data);
};

// Get  products by ID LISTE//////////////////////////////////////////
export const getProductByID = async (idListe: string[], lang: string) => {
  const { data } = await wooCommerce.get(
    `products/?include[cross_sell_ids]=${idListe}&lang=${lang}`
  );

  return data;
};

export const _getProductByID = async (idListe: string[]) => {
  const { data } = await wooCommerce.get(`products`, {
    includes: idListe,
  });

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
  return filterCategoryVisibility(data);
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

  return filterCategoryVisibility(products);
};

// Get FEATURED Products //////////////////////////////////////////////
export const getFeaturedProduct = async (lang: string): Promise<IProduct[]> => {
  const { data } = await wooCommerce.get("products", {
    featured: true,
    per_page: 8,
    lang: lang,
  });
  const product = data;

  return filterCategoryVisibility(product);
};

// Get OnSale Products //////////////////////////////////////////////
export const getOnSaleProducts = async (lang: string): Promise<IProduct[]> => {
  const { data } = await wooCommerce.get("products", {
    on_sale: true,
    per_page: 8,
    lang: lang,
  });
  const product = data;

  return filterCategoryVisibility(product);
};

// catalog Visibility filtering -exclude hidden products///////////////////////////

const filterCategoryVisibility = (productList: IProduct[]) => {
  const filteredProductList = productList.filter(
    (product) => product.catalog_visibility !== "hidden"
  );

  return filteredProductList;
};
