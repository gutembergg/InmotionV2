import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import React, { useState } from "react";
import LayoutMobility from "../../../Layout/LayoutMobility";
import { LightBackground } from "../../../styles/BackgroundStyle";
import HouseIcon from "../../../../public/images/icons/house.svg";
import { wc_getProductsByCategorySlug } from "../../../services/woocommerceApi/Products";
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

interface Props {
  products: IProduct[];
  category: ICategories;
}

const Occasions: NextPage<Props> = ({ products, category }) => {
  const { t } = useTranslation();
  const title = t("common:ourOccasions");

  const [_products, _setProducts] = useState<IProduct[]>(products);
  const [productIndex, setProductIndex] = useState(0);

  const selectProduct = (index: number) => {
    setProductIndex(index);
  };
  return (
    <LightBackground>
      <LayoutMobility icon={HouseIcon}>
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
      </LayoutMobility>
    </LightBackground>
  );
};

export default Occasions;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const slug: any = ctx.params?.slug;
  const lang = ctx.locale;

  const category = await wc_getCategoriesBySlug(slug as string, lang as string);
  const products = await wc_getProductsByCategorySlug(
    slug as string,
    lang as string
  );

  return {
    props: {
      products,
      category,
    },
    revalidate: 60 * 10, // 10min
  };
};
