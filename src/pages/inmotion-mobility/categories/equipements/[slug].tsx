import { GetStaticPaths, GetStaticProps } from "next";
import { ReactElement } from "react";
import LayoutMobility from "../../../../Layout/LayoutMobility";
import {
  wc_getCategoriesBySlug,
  wc_getSub_categories,
} from "../../../../services/woocommerceApi/Categories";
import { getProduitsByCategoriesSlug } from "../../../../services/woocommerceApi/Products";
import conditionIcon from "../../../../../public/images/icons/conditionsgen.svg";
import { IProduct } from "../../../../interfaces/IProducts";
import product from "next-seo/lib/jsonld/product";
import { MainContent } from "../../../../styles/Boutique";
import { Container } from "../../../../components/AccessoriesTemplate/AccessorieDetail/styles";

interface Props {
  _productsByCategory: IProduct[];
  _slug: string;
}

export default function EquipementsSubCat({
  _productsByCategory,
  _slug,
}: Props) {
  console.log(_productsByCategory);
  console.log(_slug);
  return (
    <Container>
      <h1>{_slug}</h1>
  <MainContent>
      <ul>
        {_productsByCategory.map((product, key) => {
          return (
            <li key={key}>
              <h3>{product.name}</h3>
            </li>
          );
        })}
      </ul>
    </MainContent>
    </Container>
  );
}

EquipementsSubCat.getLayout = function getLayout(page: ReactElement) {
  return <LayoutMobility icon={conditionIcon}>{page}</LayoutMobility>;
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

  const productsByCategory = await getProduitsByCategoriesSlug(
    slug as string,
    lang as string
  );

  return {
    props: {
      _productsByCategory: productsByCategory,
      _slug: slug,
    },
    revalidate: 60 * 2,
  };
};
