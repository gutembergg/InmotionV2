import { IProduct } from "../../interfaces/IProducts";
import wcApi from "./wcAxiosConfig";
import { wooCommerce } from "./woocommerceConfig";

// Get all products////////////////////////////////////////////
export const getProducts = async () => {
  const response = await wooCommerce.get("products");

  return response;
};

// Get All product without limit per_page /////////////////////
export const getAllProductsInDatabase = async () => {
  const response = await wooCommerce.get("products", {
    per_page: 100,
  });

  return response;
};

// Get Product by ID ///////////////////////////////////////////
export const getProductById = async (id: number) => {
  const response = await wooCommerce.get(`products/${id}`);

  return response;
};

// Get Products by categories //////////////////////////////
export const getProductByCategory = async (id: number) => {
  const { data } = await wooCommerce.get(`products?category=${id}`, {
    per_page: 100,
  });

  return data;
};

// Get Products by Category slug /////////////////////////////////////
export const getProductsByCategorySlug = async (slug: string) => {
  const response = await wooCommerce.get("products/categories", {
    slug: slug,
    per_page: 100,
  });

  if (response.data.length === 0) {
    return;
  }

  const data = await getProductByCategory(response.data[0].id);

  const productsCatalogVisibility = data.filter(
    (product: IProduct) => product.catalog_visibility !== "hidden"
  );

  return productsCatalogVisibility;
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
  const { data: variations } = await wooCommerce.get(
    `products/${id}/variations`
  );

  return variations;
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

//Get products by category SLUG ////////////////////////////////////
/* export const wc_getProductsByCategorySlug = async (
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

  const productsCatalogVisibility = products.filter(
    (product: IProduct) => product.catalog_visibility !== "hidden"
  );

  if (productsCatalogVisibility.length > 0) {
    let productWithVariations: IProduct[] = [];

    await Promise.all(
      productsCatalogVisibility.map(async (product: IProduct) => {
        try {
          const variations: IVariation[] = await getVariations(product.id);
          productWithVariations.push({ ...product, variations: variations });
        } catch (error) {
          productWithVariations.push({ ...product });
        }
      })
    );

    return productWithVariations;
  } else {
    return [];
  }
}; */
