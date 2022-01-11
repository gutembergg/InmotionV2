import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import { ReactElement } from "react";
import LayoutMobility from "../../../../Layout/LayoutMobility";
import { wc_getSub_categories } from "../../../../services/woocommerceApi/Categories";
import { getProduitsByCategoriesSlug } from "../../../../services/woocommerceApi/Products";
import conditionIcon from "../../../../../public/images/icons/conditionsgen.svg";
import { IProduct } from "../../../../interfaces/IProducts";
import { ICategories } from "../../../../interfaces/ICategories";
import ButtonSkew from "../../../../components/ButtonSkew";
import { IoIosArrowDown } from "react-icons/io";

import {
  Container,
  Content,
  FiltersBar,
  ProductsSection,
  Products,
  MenuSubCategories,
  ButtonSelect,
  PaginateBar,
} from "../../../../styles/EquipmentsStyles";
import ProductSmallCard from "../../../../components/ProductCard/ProductSmallCard";
import { addEuroPriceInProducts } from "../../../../utils/addEuroPriceInProducts";

interface Props {
  productsByCategory: IProduct[];
  slug: string;
  subCategories: Partial<ICategories[]>;
}

export default function EquipementsSubCat({
  productsByCategory,
  slug,
  subCategories,
}: Props) {
  return (
    <Container>
      <h1>{slug}</h1>

      <Content>
        <ProductsSection>
          <FiltersBar>
            <ButtonSelect>
              <p> Trier par default</p> <IoIosArrowDown />
            </ButtonSelect>
            <PaginateBar>
              <span>{productsByCategory.length} résultats</span>
            </PaginateBar>
          </FiltersBar>
          <Products>
            {productsByCategory.map((product) => {
              return (
                <div key={product.id}>
                  <ProductSmallCard product={product} />
                </div>
              );
            })}
          </Products>
        </ProductsSection>
        <MenuSubCategories>
          <ul>
            <div className="skew_button">
              <ButtonSkew text="Equipements" />
            </div>
            {subCategories.map((category) => {
              return (
                <li key={category?.slug} className="category_name">
                  <Link
                    href={`/inmotion-mobility/categories/equipements/${category?.slug}`}
                  >
                    <a>{category?.name}</a>
                  </Link>
                </li>
              );
            })}
          </ul>
        </MenuSubCategories>
      </Content>
    </Container>
  );
}

EquipementsSubCat.getLayout = function getLayout(page: ReactElement) {
  return <LayoutMobility icon={conditionIcon}>{page}</LayoutMobility>;
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
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

  const _subCategories = await wc_getSub_categories(lang as string, 241);

  const subCategories = _subCategories.map((category) => {
    const name = category.name;
    const slug = category.slug;

    return { name, slug };
  });

  const productsWithEuroDevise = await addEuroPriceInProducts(
    productsByCategory
  );

  console.log("productsWithEuroDevise: ", productsWithEuroDevise.length);

  return {
    props: {
      productsByCategory: productsWithEuroDevise,
      subCategories,
      slug: slug,
    },
    revalidate: 60 * 2,
  };
};
