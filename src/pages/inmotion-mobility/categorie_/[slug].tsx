import { GetStaticPaths, GetStaticProps } from "next";
import React, { ReactElement, useCallback, useEffect, useState } from "react";
import { ICategories } from "../../../interfaces/ICategories";
import {
  wc_getCategoriesBySlug,
  wc_getSub_categories,
} from "../../../services/woocommerceApi/Categories";
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
import LayoutMobility from "../../../Layout/LayoutMobility";
import EquipSliderCategory from "../../../components/AccessoriesTemplate/EquipmentPage/equipSliderCategory";
import HeaderSeo from "../../../components/HeaderSeo";

interface Props {
  subCategories: ICategories[];
  equipements: ICategories;
  _productsByCategory: IProduct[];
}

export default function Equipements({
  subCategories,
  equipements,
  _productsByCategory,
}: Props) {
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
    <HeaderSeo
      description="Equipement pour les pilotes velos eletriques"
      title={equipements.yoast_head_json.og_title}
      canonical={`https://dx7l6anesh.preview.infomaniak.website/inmotion-mobility/categorie_/equipements`}
      og_locale={equipements.yoast_head_json.og_locale}
      og_title={equipements.yoast_head_json.og_title}
    >
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
              <EquipSliderCategory
                activedAllProductMenu={activedAllProductMenu}
                activedMenuIndex={activedMenuIndex}
                subCategories={subCategories}
                selectCategory={selectCategory}
              />
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
    </HeaderSeo>
  );
}

Equipements.getLayout = function getLayout(page: ReactElement) {
  return <LayoutMobility icon={HomeIcon}>{page}</LayoutMobility>;
};

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
    revalidate: 60,
  };
};
