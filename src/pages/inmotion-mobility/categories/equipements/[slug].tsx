import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import { ReactElement, useState } from "react";
import { equipementPaths } from "../../../../utils/equipementPaths";
import HeaderSeo from "../../../../components/HeaderSeo";
import LayoutMobility from "../../../../Layout/LayoutMobility";
import {
  wc_getCategoriesBySlug,
  wc_getSub_categories,
} from "../../../../services/woocommerceApi/Categories";
import { getProduitsByCategoriesSlug } from "../../../../services/woocommerceApi/Products";
import conditionIcon from "../../../../../public/images/icons/conditionsgen.svg";
import { IProduct } from "../../../../interfaces/IProducts";
import { ICategories } from "../../../../interfaces/ICategories";
import ButtonSkew from "../../../../components/ButtonSkew";
import { IoIosArrowDown } from "react-icons/io";
import ProductSmallCard from "../../../../components/ProductCard/ProductSmallCard";
import { addEuroPriceInProducts } from "../../../../utils/addEuroPriceInProducts";

import {
  Container,
  Content,
  FiltersBar,
  ProductsSection,
  Products,
  MenuSubCategoriesMobilie,
  MenuSubCategories,
  ButtonSelect,
  PaginateBar,
} from "../../../../styles/EquipmentsStyles";

interface Props {
  productsByCategory: IProduct[];
  currentyCategory: ICategories;
  subCategories: Partial<ICategories[]>;
}

export default function EquipementsSubCat({
  productsByCategory,
  currentyCategory,
  subCategories,
}: Props) {
  const [openMenuCategories, setOpenMenuCategories] = useState(false);

  const handleOpenSubCatMenu = () => {
    setOpenMenuCategories(!openMenuCategories);
  };

  console.log("currentyCategory: ", currentyCategory);
  return (
    <>
      <HeaderSeo
        description={currentyCategory.yoast_head_json.og_title}
        title={currentyCategory.yoast_head_json.og_title}
        canonical={currentyCategory.yoast_head_json.canonical}
        og_locale={currentyCategory.yoast_head_json.og_locale}
        og_title={currentyCategory.yoast_head_json.og_title}
      />

      <Container>
        <h1>{currentyCategory.slug}</h1>
        <Content>
          <ProductsSection>
            <FiltersBar>
              <MenuSubCategoriesMobilie>
                <ButtonSelect onClick={handleOpenSubCatMenu}>
                  <p>Categories</p> <IoIosArrowDown />
                </ButtonSelect>
                {openMenuCategories && (
                  <ul className="menu_subcategories">
                    {subCategories.map((category) => {
                      return (
                        <li
                          key={category?.slug}
                          className="categoiry_item"
                          onClick={handleOpenSubCatMenu}
                        >
                          <Link
                            href={`/inmotion-mobility/categories/equipements/${category?.slug}`}
                          >
                            <a>{category?.name}</a>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </MenuSubCategoriesMobilie>
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
                      <a
                        className={
                          currentyCategory.slug === category?.slug
                            ? "active"
                            : ""
                        }
                      >
                        {category?.name}
                      </a>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </MenuSubCategories>
        </Content>
      </Container>
    </>
  );
}

EquipementsSubCat.getLayout = function getLayout(page: ReactElement) {
  return <LayoutMobility>{page}</LayoutMobility>;
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: equipementPaths,
    fallback: "blocking",
  };
};
export const getStaticProps: GetStaticProps = async (ctx) => {
  const slug = ctx.params?.slug;
  const lang = ctx.locale;

  const currentyCategory = await wc_getCategoriesBySlug(
    slug as string,
    lang as string
  );

  if (!currentyCategory) {
    return {
      redirect: {
        destination: "/inmotion-mobility",
        permanent: false,
      },
    };
  }

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

  return {
    props: {
      productsByCategory: productsWithEuroDevise,
      subCategories,
      currentyCategory,
    },
    revalidate: 60 * 2,
  };
};
