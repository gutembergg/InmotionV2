import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import React, { ReactElement, useEffect, useState } from "react";
import HouseIcon from "../../../../public/images/icons/house.svg";
import SliderCustom from "../../../components/SliderCustom";
import { IProduct } from "../../../interfaces/IProducts";

import {
  Container,
  Title,
  ProductDetail,
  ProductsFooter,
} from "../../../styles/OccasionsPage";
import AccessoriesDetail from "../../../components/AccessoriesTemplate/AccessorieDetail";
import { wc_getCategoriesBySlug } from "../../../services/woocommerceApi/Categories";
import { ICategories } from "../../../interfaces/ICategories";
import useTranslation from "next-translate/useTranslation";
import { wc_getProductsByCategory } from "../../../services/woocommerceApi/Products";
import LayoutMobility from "../../../Layout/LayoutMobility";

interface Props {
  products: IProduct[];
  category: ICategories;
}

export default function Occasions({ products, category }: Props) {
  const { t } = useTranslation();
  const title = t("common:ourOccasions");

  const [_products, _setProducts] = useState<IProduct[]>(products);
  const [productIndex, setProductIndex] = useState(0);

  useEffect(() => {
    _setProducts(products);
  }, [products]);

  const selectProduct = (index: number) => {
    setProductIndex(index);
  };
  return (
    <Container>
      <Title>{title}</Title>
      <ProductDetail>
        <AccessoriesDetail
          products={_products}
          productIndex={productIndex}
          subCategoryActived={category}
        />
      </ProductDetail>
      <ProductsFooter>
        <SliderCustom products={_products} selectProduct={selectProduct} />
      </ProductsFooter>
    </Container>
  );
}

Occasions.getLayout = function getLayout(page: ReactElement) {
  return <LayoutMobility icon={HouseIcon}>{page}</LayoutMobility>;
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: { slug: "occasions" }, locale: "en" },
      { params: { slug: "occasions" }, locale: "fr" },
      { params: { slug: "occasions" }, locale: "de" },
    ],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const slug: any = ctx.params?.slug;
  const lang = ctx.locale;

  const category = await wc_getCategoriesBySlug(slug as string, lang as string);

  const products = await wc_getProductsByCategory(category.id, lang as string);

  return {
    props: {
      products,
      category,
    },
    revalidate: 60,
  };
};
