import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactElement, useEffect, useState } from "react";
import { paths as detachedPiecesPaths } from "../../../../utils/piecesDetacheesPaths";
import HeaderSeo from "../../../../components/HeaderSeo";
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
import Notiflix from "notiflix";

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

  useEffect(() => {
    Notiflix.Loading.init({
      svgColor: "var(--Blue)",
      svgSize: "100px",
      messageColor: "var(--Red)",
      messageFontSize: "17px",
      backgroundColor: "rgba(234, 234, 234, 0.856)",
    });

    const handleStart = () => {
      Notiflix.Loading.standard("Loading...");
    };
    const handleStop = () => {
      Notiflix.Loading.remove();
    };

    if (router.isFallback) {
      handleStart();
    } else {
      handleStop();
    }

    return () => {
      handleStart();
      handleStop();
    };
  }, [router]);

  const handleUpSellFilter = () => {
    setUpSellFilter(!upSellFilter);
  };

  const selectModel = (model: IProduct) => {
    const productsBySelectedModel = productsByCategory.filter((product) =>
      product.upsell_ids.find((upSellId) => upSellId === model.id)
    );

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

  console.log("currentyCategory", currentyCategory);

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
                          <li
                            key={model.id}
                            className="upsell_name"
                            onClick={() => selectModel(model)}
                          >
                            {model.name}
                          </li>
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
                  <ul className="menu_subcategories">
                    {subCategories.map((category) => {
                      return (
                        <li key={category?.slug} onClick={handleCategoriesMenu}>
                          <Link
                            href={`/inmotion-mobility/categories/pieces-detachees/${category?.slug}`}
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
    paths: detachedPiecesPaths,
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

  const _productsByCategory = await getProduitsByCategoriesSlug(
    slug as string,
    lang as string
  );

  const productsWithEuroDevise = await addEuroPriceInProducts(
    _productsByCategory
  );

  const _subCategories = await wc_getSub_categories(
    lang as string,
    currentyCategory.parent
  );

  const subCategories = _subCategories.map((category) => {
    const name = category.name;
    const slug = category.slug;

    return { name, slug };
  });

  const _mobilityProducts = await getProductByCategory(80, lang as string);

  const mobilityProducts: Pick<
    IProduct,
    "name" | "slug" | "id" | "categories"
  >[] = _mobilityProducts.map((category) => {
    const name = category.name;
    const slug = category.slug;
    const id = category.id;
    const categories = category.categories;

    return { name, slug, id, categories };
  });

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
