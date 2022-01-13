import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactElement, useEffect, useState } from "react";
import LayoutMobility from "../../../../Layout/LayoutMobility";
import {
  wc_getCategoriesBySlug,
  wc_getSub_categories,
} from "../../../../services/woocommerceApi/Categories";
import {
  getProductByCategory,
  getProduitsByCategoriesSlug,
} from "../../../../services/woocommerceApi/Products";
import conditionIcon from "../../../../../public/images/icons/conditionsgen.svg";
import { IProduct } from "../../../../interfaces/IProducts";
import { IoIosArrowDown } from "react-icons/io";
import ProductSmallCard from "../../../../components/ProductCard/ProductSmallCard";
import ButtonSkew from "../../../../components/ButtonSkew";
import { addEuroPriceInProducts } from "../../../../utils/addEuroPriceInProducts";
import { ICategories } from "../../../../interfaces/ICategories";
import { getProductsUpSells } from "../../../../utils/getProductsUpsells";

import {
  Container,
  Content,
  FiltersBar,
  ProductsSection,
  Products,
  MenuSubCategoriesMobilie,
  MenuSubCategories,
  ButtonFilterBlock,
  ButtonSelect,
  ModelListWrapper,
  ModelList,
  PaginateBar,
} from "../../../../styles/PieceDetacheeStyles";
import HeaderSeo from "../../../../components/HeaderSeo";

interface Props {
  productsByCategory: IProduct[];
  subCategories: ICategories[];
  productsUpSells: IProduct[];
  currentyCategory: ICategories;
}

export default function PiecesDetacheesSubCat({
  productsByCategory,
  subCategories,
  productsUpSells,
  currentyCategory,
}: Props) {
  const router = useRouter();
  const [upSellFilter, setUpSellFilter] = useState(false);
  const [products, setProducts] = useState<IProduct[]>(productsByCategory);
  const [upSellName, setUpSellName] = useState("");
  const [openMenuCategories, setOpenMenuCategories] = useState(false);

  useEffect(() => {
    setUpSellName("");
    setProducts(productsByCategory);
  }, [router.query, productsByCategory]);

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const handleUpSellFilter = () => {
    setUpSellFilter(!upSellFilter);
  };

  const selectModel = (model: IProduct) => {
    console.log("Model: ", model);
    const productsBySelectedModel = productsByCategory.filter((product) =>
      product.upsell_ids.find((upSellId) => upSellId === model.id)
    );

    console.log("productsBySelectedModel: ", productsBySelectedModel);

    setUpSellName(model.name);
    setProducts(productsBySelectedModel);
    setUpSellFilter(!upSellFilter);
  };

  const handleCategoriesMenu = () => {
    setOpenMenuCategories(!openMenuCategories);
  };

  /*   console.log("products", products);*/
  /*   console.log("productsUpSells", productsUpSells);
   */

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
        <h1>{currentyCategory.name}</h1>

        <Content>
          <ProductsSection>
            <FiltersBar>
              <ButtonFilterBlock>
                <ButtonSelect onClick={handleUpSellFilter}>
                  <p>{!!upSellName ? upSellName : "Trier par Model"} </p>{" "}
                  <IoIosArrowDown />
                </ButtonSelect>
                <ModelListWrapper>
                  {upSellFilter && (
                    <ModelList>
                      {productsUpSells.map((model) => {
                        return (
                          <div
                            key={model.id}
                            className="upsell_name"
                            onClick={() => selectModel(model)}
                          >
                            {model.name}
                          </div>
                        );
                      })}
                    </ModelList>
                  )}
                </ModelListWrapper>
              </ButtonFilterBlock>
              <MenuSubCategoriesMobilie>
                <ButtonSelect onClick={handleCategoriesMenu}>
                  <p>Categories</p> <IoIosArrowDown />
                </ButtonSelect>
                {openMenuCategories && (
                  <div className="menu_subcategories">
                    {subCategories.map((category) => {
                      return (
                        <div
                          key={category?.slug}
                          onClick={handleCategoriesMenu}
                        >
                          <Link
                            href={`/inmotion-mobility/categories/pieces-detachees/${category?.slug}`}
                          >
                            <a>{category?.name}</a>
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                )}
              </MenuSubCategoriesMobilie>
              <PaginateBar>
                <span>{products.length} résultats</span>
              </PaginateBar>
            </FiltersBar>
            <Products>
              {products.map((product) => {
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
                <ButtonSkew text="Pièces Détachée" />
              </div>
              {subCategories.map((category) => {
                return (
                  <li key={category?.slug} className="category_name">
                    <Link
                      href={`/inmotion-mobility/categories/pieces-detachees/${category?.slug}`}
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

PiecesDetacheesSubCat.getLayout = function getLayout(page: ReactElement) {
  return <LayoutMobility icon={conditionIcon}>{page}</LayoutMobility>;
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: { slug: "pieces-velos" }, locale: "en" },
      { params: { slug: "pieces-velos" }, locale: "fr" },
      { params: { slug: "pieces-velos" }, locale: "de" },
      { params: { slug: "pieces-trottinettes" }, locale: "en" },
      { params: { slug: "pieces-trottinettes" }, locale: "fr" },
      { params: { slug: "pieces-trottinettes" }, locale: "de" },
      { params: { slug: "pieces-gyroroues" }, locale: "en" },
      { params: { slug: "pieces-gyroroues" }, locale: "fr" },
      { params: { slug: "pieces-gyroroues" }, locale: "de" },
    ],
    fallback: true,
  };
};
export const getStaticProps: GetStaticProps = async (ctx) => {
  const slug = ctx.params?.slug;
  const lang = ctx.locale;

  const _productsByCategory = await getProduitsByCategoriesSlug(
    slug as string,
    lang as string
  );

  if (!_productsByCategory) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const currentyCategory = await wc_getCategoriesBySlug(
    slug as string,
    lang as string
  );

  const productsWithEuroDevise = await addEuroPriceInProducts(
    _productsByCategory
  );

  const subCategories = await wc_getSub_categories(
    lang as string,
    currentyCategory.parent
  );

  const mobilityProducts = await getProductByCategory(80, lang as string);

  const productsUpSells = getProductsUpSells(
    _productsByCategory,
    mobilityProducts,
    currentyCategory.slug
  );

  return {
    props: {
      productsByCategory: productsWithEuroDevise,
      subCategories,
      productsUpSells,
      currentyCategory,
    },
    revalidate: 60 * 2,
  };
};
