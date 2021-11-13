import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import React, { useCallback, useEffect, useState } from "react";

import LayoutMobility from "../../../Layout/LayoutMobility";
import { CurvedBackground } from "../../../styles/BackgroundStyle";
import HomeIcon from "../../../../public/images/icons/house.svg";
import { ICategories } from "../../../interfaces/ICategories";
import { IProduct } from "../../../interfaces/IProducts";
import AccessoriesDetail from "../../../components/AccessoriesTemplate/AccessorieDetail";
import { getProduitsByCategoriesSlug } from "../../../services/woocommerceApi/Products";
import {
  wc_getCategoriesBySlug,
  wc_getSub_categories,
} from "../../../services/woocommerceApi/Categories";
import { getProductsUpSells } from "../../../utils/getProductsUpsells";

import {
  Container,
  Content,
  ProductArea,
  ProductsFooter,
  ProductInfo,
} from "../../../styles/PiecesAccessoires";
import useTranslation from "next-translate/useTranslation";
import SliderCustom from "../../../components/SliderCustom";
import SideMenuCategories from "../../../components/AccessoriesTemplate/SideMenuCategories";
import SliderModelsUpsell from "../../../components/SliderModelsUpsell";

interface Props {
  productsWithVariation: IProduct[];
  subCategories: ICategories[];
  _categoryBySlug: ICategories;
  productsByCategoryDefault: IProduct[];
  mobilityProducts: IProduct[];
  _productsUpSellModelsByDefault: IProduct[];
}

const AccessoryPage: NextPage<Props> = ({
  productsWithVariation,
  subCategories,
  productsByCategoryDefault,
  mobilityProducts,
  _productsUpSellModelsByDefault,
  _categoryBySlug,
}) => {
  const { t } = useTranslation();
  const allArticlesTraduction = t("equipmentsPage:allArticles");

  const [activedMenuIndex, setActivedMenuIndex] = useState(0);
  const [selectedProductsCategory, setSelectedProductsCategory] = useState<
    IProduct[]
  >(productsByCategoryDefault);

  const [productIndex, setProductIndex] = useState(0);
  const [subCategoryActived, setSubCategoryActived] = useState<ICategories>(
    subCategories[0]
  );
  const [productsModelsUpSell, setProductsModelsUpSell] = useState<IProduct[]>(
    _productsUpSellModelsByDefault
  );
  const [modelsActivated, setModelsActivated] = useState(
    _productsUpSellModelsByDefault.length
  );

  useEffect(() => {
    setSelectedProductsCategory(productsByCategoryDefault);
    setProductsModelsUpSell(_productsUpSellModelsByDefault);
    setSubCategoryActived(subCategories[0]);
  }, [
    productsByCategoryDefault,
    _productsUpSellModelsByDefault,
    subCategories,
  ]);

  const getUpSellModels = useCallback(
    (productsByCategoryselected: IProduct[], categorySlug?) => {
      const models = getProductsUpSells(
        productsByCategoryselected,
        mobilityProducts,
        categorySlug
      );
      setProductsModelsUpSell(models);
    },
    [mobilityProducts]
  );

  const selectCategory = useCallback(
    (categorySlug: string, categoryIndex: number) => {
      setActivedMenuIndex(categoryIndex);
      setProductIndex(0);

      const selectedCategoryProducts = productsWithVariation.filter((product) =>
        product.categories.find((category) => category.slug === categorySlug)
      );

      getUpSellModels(selectedCategoryProducts, categorySlug);

      const productCategory = subCategories.filter(
        (item) => item.slug === categorySlug
      );

      setSubCategoryActived(productCategory[0]);

      setSelectedProductsCategory(selectedCategoryProducts);
    },
    // eslint-disable-next-line
    [subCategories, productsWithVariation]
  );

  const selectProduct = useCallback((index: number) => {
    setProductIndex(index);
  }, []);

  const selectModelProducts = useCallback(
    (model: IProduct | { id: number; name: string }, modelIndex) => {
      setModelsActivated(modelIndex);

      const productsByModels = productsWithVariation.filter((product) =>
        product.upsell_ids.find((prodId) => prodId === model.id)
      );

      setSelectedProductsCategory(productsByModels);
    },
    [productsWithVariation]
  );

  const displayAllProducts = useCallback(
    (modelIndex: number) => {
      setModelsActivated(modelIndex);

      const allProductsBySubCategory = productsWithVariation.filter((product) =>
        product.categories.find(
          (category) => category.slug === subCategoryActived.slug
        )
      );

      setSelectedProductsCategory(allProductsBySubCategory);
    },
    [productsWithVariation, subCategoryActived]
  );

  return (
    <CurvedBackground>
      <LayoutMobility icon={HomeIcon}>
        <Container>
          <Content>
            <ProductArea>
              <ProductInfo>
                <AccessoriesDetail
                  products={selectedProductsCategory}
                  productIndex={productIndex}
                  subCategoryActived={subCategoryActived}
                />
              </ProductInfo>

              <div className="menu_block">
                <SideMenuCategories
                  subCategories={subCategories}
                  activedMenuIndex={activedMenuIndex}
                  selectCategory={selectCategory}
                  _categoryBySlug={_categoryBySlug}
                />
              </div>
            </ProductArea>
            <ProductsFooter>
              <SliderModelsUpsell
                productsModelsUpSell={productsModelsUpSell}
                modelsActivated={modelsActivated}
                allArticlesTraduction={allArticlesTraduction}
                selectModelProducts={selectModelProducts}
                displayAllProducts={displayAllProducts}
              />
              <div>
                <SliderCustom
                  products={selectedProductsCategory}
                  selectProduct={selectProduct}
                />
              </div>
            </ProductsFooter>
          </Content>
        </Container>
      </LayoutMobility>
    </CurvedBackground>
  );
};

export default AccessoryPage;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      {
        params: { slug: "pieces-detachees-mobility" },
      },
    ],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const slug = ctx.params?.slug;
  const lang = ctx.locale;
  let _productsUpSellModelsByDefault: IProduct[] = [];

  const _categoryBySlug = await wc_getCategoriesBySlug(
    slug as string,
    lang as string
  );

  if (!_categoryBySlug) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const wc_subCategories = await wc_getSub_categories(
    lang as string,
    _categoryBySlug.id
  );

  const _productsByCategory = await getProduitsByCategoriesSlug(
    slug as string,
    lang as string
  );

  const productsByDefault = _productsByCategory.filter((product) =>
    product.categories.find((cat) => cat.slug === wc_subCategories[0].slug)
  );

  const mobilityProducts = await getProduitsByCategoriesSlug("boutique", "fr");

  /// Get upSell_ids products ///////////////////////////////////////
  const productsUpSellResult = getProductsUpSells(
    productsByDefault,
    mobilityProducts,
    wc_subCategories[0].slug,
    wc_subCategories[0].id
  );
  _productsUpSellModelsByDefault = productsUpSellResult;

  return {
    props: {
      productsWithVariation: _productsByCategory,
      subCategories: wc_subCategories,
      productsByCategoryDefault: productsByDefault,
      mobilityProducts,
      _productsUpSellModelsByDefault,
      _categoryBySlug,
    },
    revalidate: 60 * 10, // 10min
  };
};
