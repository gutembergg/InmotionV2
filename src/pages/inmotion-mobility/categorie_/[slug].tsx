import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import React, { useCallback, useEffect, useState } from "react";
import { ICategories } from "../../../interfaces/ICategories";
import LayoutMobility from "../../../Layout/LayoutMobility";
import {
  wc_getCategoriesBySlug,
  wc_getSub_categories,
} from "../../../services/woocommerceApi/Categories";
import { CurvedBackground } from "../../../styles/BackgroundStyle";
import HomeIcon from "../../../../public/images/icons/house.svg";
import ButtonSkew from "../../../components/ButtonSkew";
import { getProduitsByCategoriesSlug } from "../../../services/woocommerceApi/Products";
import { IProduct } from "../../../interfaces/IProducts";
import AccessoriesDetail from "../../../components/AccessoriesTemplate/AccessorieDetail";

import {
  Container,
  Content,
  ProductArea,
  ProductsFooter,
  ProductInfo,
  MenuCategories,
  ProductMenuResponsive,
} from "../../../styles/EquipementPage";
import useTranslation from "next-translate/useTranslation";
import SliderCustom from "../../../components/SliderCustom";

interface Props {
  subCategories: ICategories[];
  equipements: ICategories;
  _productsByCategory: IProduct[];
}

const Equipements: NextPage<Props> = ({
  subCategories,
  equipements,
  _productsByCategory,
}) => {
  const { t } = useTranslation();
  const allArticles = t("equipmentsPage:allArticles");

  const [activedMenuIndex, setActivedMenuIndex] = useState(0);
  const [selectedProductsCategory, setSelectedProductsCategory] =
    useState<IProduct[]>(_productsByCategory);

  const [productIndex, setProductIndex] = useState(0);
  const [activedAllProductMenu, setActivedAllProductMenu] = useState(true);
  const [subCategoryActived, setSubCategoryActived] = useState<ICategories>(
    {} as ICategories
  );

  useEffect(() => {
    setSelectedProductsCategory(_productsByCategory);
  }, [_productsByCategory]);

  const selectProduct = useCallback((index: number) => {
    setProductIndex(index);
  }, []);

  const selectCategory = useCallback(
    (categorySlug: string, categoryIndex: number) => {
      setActivedMenuIndex(categoryIndex);
      setProductIndex(0);
      setActivedAllProductMenu(false);

      const selectedCategoryProducts = _productsByCategory.filter((product) =>
        product.categories.find((category) => category.slug === categorySlug)
      );

      const productCategory = subCategories.filter(
        (item) => item.slug === categorySlug
      );

      setSubCategoryActived(productCategory[0]);

      setSelectedProductsCategory(selectedCategoryProducts);
    },
    [_productsByCategory, subCategories]
  );

  const selectAllProducts = useCallback(() => {
    setSelectedProductsCategory(_productsByCategory);
    setActivedAllProductMenu(true);
    setSubCategoryActived({} as ICategories);
  }, [_productsByCategory]);

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
              <ProductMenuResponsive className="responsive">
                <ul className="prod_model_marque">
                  <li
                    className={
                      activedAllProductMenu
                        ? "prod_model_item menu_buttons active_menu"
                        : "prod_model_item menu_buttons"
                    }
                    onClick={selectAllProducts}
                  >
                    {allArticles}
                  </li>
                  {subCategories.length > 0 &&
                    subCategories.map((subCat, index) => {
                      return (
                        <li
                          className={
                            activedMenuIndex === index &&
                            activedAllProductMenu === false
                              ? "prod_model_item menu_buttons active_menu"
                              : "prod_model_item menu_buttons"
                          }
                          key={subCat.id}
                          onClick={() => selectCategory(subCat.slug, index)}
                        >
                          {subCat.name}
                        </li>
                      );
                    })}
                </ul>
              </ProductMenuResponsive>
              <MenuCategories>
                <span className="skew">
                  <ButtonSkew text={equipements?.name} />
                </span>

                <div className="prod_model_marque">
                  <p
                    className={
                      activedAllProductMenu
                        ? "prod_model_item active_menu"
                        : "prod_model_item"
                    }
                    onClick={selectAllProducts}
                  >
                    {allArticles}
                  </p>
                  <ul>
                    {subCategories.map((category, index) => {
                      return (
                        <li
                          className={
                            activedMenuIndex === index &&
                            activedAllProductMenu === false
                              ? "prod_model_item active_menu"
                              : "prod_model_item"
                          }
                          key={category.id}
                          onClick={() => selectCategory(category.slug, index)}
                        >
                          {category.name}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </MenuCategories>
            </ProductArea>
            <ProductsFooter>
              <SliderCustom
                products={selectedProductsCategory}
                selectProduct={selectProduct}
              />
            </ProductsFooter>
          </Content>
        </Container>
      </LayoutMobility>
    </CurvedBackground>
  );
};

export default Equipements;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: { slug: "equipements" }, locale: "en" },
      { params: { slug: "equipements" }, locale: "fr" },
      { params: { slug: "equipements" }, locale: "de" },
    ],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const slug = ctx.params?.slug;
  const lang = ctx.locale;

  const wc_equipements = await wc_getCategoriesBySlug(
    slug as string,
    lang as string
  );

  const wc_subCategories = await wc_getSub_categories(
    lang as string,
    wc_equipements.id
  );

  if (wc_subCategories.length === 0) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const productsByCategory = await getProduitsByCategoriesSlug(
    slug as string,
    lang as string
  );

  return {
    props: {
      subCategories: wc_subCategories,
      equipements: wc_equipements,
      _productsByCategory: productsByCategory,
    },
  };
};
