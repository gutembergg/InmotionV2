import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactElement, useEffect, useRef, useState } from "react";
import useTranslation from "next-translate/useTranslation";
import { motion } from "framer-motion";

import { IoIosArrowDown } from "react-icons/io";
import { paths as detachedPiecesPaths } from "../../../../utils/piecesDetacheesPaths";
import HeaderSeo from "../../../../components/HeaderSeo";
import LayoutMobility from "../../../../Layout/LayoutMobility";
import {
  wc_getCategoriesBySlug,
  wc_getSub_categories,
} from "../../../../services/woocommerceApi/Categories";
import { getProduitsByCategoriesSlug } from "../../../../services/woocommerceApi/Products";
import { IProduct } from "../../../../interfaces/IProducts";
import ProductSmallCard from "../../../../components/ProductCard/ProductSmallCard";
import ButtonSkew from "../../../../components/ButtonSkew";
import { addEuroPriceInProducts } from "../../../../utils/addEuroPriceInProducts";
import { ICategories } from "../../../../interfaces/ICategories";
import { getProductsUpSells } from "../../../../utils/getProductsUpsells";
import MobileCard from "../../../../components/ProductCard/MobileCard";

import {
  Container,
  Content,
  FiltersBar,
  ProductsSection,
  ProductsMobile,
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
  const modelsRef = useRef<HTMLDivElement>(null);
  const menuCategoriesRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();
  const allArticles = t("equipmentsPage:allArticles");
  const toSourtOut = t("equipmentsPage:toSourtOut");
  const piecesdetachee = t("equipmentsPage:piecesdetachee");
  const result = t("equipmentsPage:resultats");
  const categories = t("equipmentsPage:categories");

  const [upSellFilter, setUpSellFilter] = useState(false);
  const [products, setProducts] = useState<IProduct[]>(productsByCategory);
  const [upSellName, setUpSellName] = useState("");
  const [openMenuCategories, setOpenMenuCategories] = useState(false);
  const [openMobileMenu, setOpenMobileMenu] = useState(false);

  useEffect(() => {
    setUpSellName("");
    setProducts(productsByCategory);
  }, [router.query, productsByCategory]);

  useEffect(() => {
    const checkIfClickedOutside = (e: any) => {
      if (
        upSellFilter &&
        modelsRef.current &&
        !modelsRef.current.contains(e.target)
      ) {
        setUpSellFilter(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [upSellFilter]);

  useEffect(() => {
    const checkIfClickedOutside = (e: any) => {
      if (
        openMenuCategories &&
        menuCategoriesRef.current &&
        !menuCategoriesRef.current.contains(e.target)
      ) {
        setOpenMenuCategories(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [openMenuCategories]);

  const handleUpSellFilter = () => {
    setUpSellFilter(!upSellFilter);
  };

  const selectModel = (model: IProduct | { id: number; name: string }) => {
    if (model.id === 123456789) {
      setProducts(productsByCategory);
      setUpSellName(model.name);
      setOpenMobileMenu(false);
      setUpSellFilter(false);
      return;
    }

    const productsBySelectedModel = productsByCategory.filter((product) =>
      product.upsell_ids.find((upSellId) => upSellId === model.id)
    );

    setUpSellName(model.name);
    setProducts(productsBySelectedModel);
    setUpSellFilter(!upSellFilter);
    setOpenMobileMenu(false);
  };

  const handleCategoriesMenu = () => {
    setOpenMenuCategories(!openMenuCategories);
    setOpenMobileMenu(!openMobileMenu);
  };

  const _productsUpSells = [
    ...productsUpSells,
    { id: 123456789, name: allArticles },
  ];

  return (
    <>
      <HeaderSeo
        description={currentyCategory.yoast_head_json.og_title}
        title={currentyCategory.yoast_head_json.og_title}
        canonical={`https://inmotion-suisse.ch/inmotion-mobility/categories/pieces-detachees/${currentyCategory.name.toLowerCase()}`}
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
                  <p>{!!upSellName ? upSellName : toSourtOut} </p>{" "}
                  <IoIosArrowDown />
                </ButtonSelect>
                <ModelListWrapper ref={modelsRef}>
                  {upSellFilter && (
                    <ModelList>
                      {_productsUpSells.map((model) => {
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
              <MenuSubCategoriesMobilie ref={menuCategoriesRef}>
                <ButtonSelect onClick={handleCategoriesMenu}>
                  <p>{categories}</p> <IoIosArrowDown />
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
                <span>
                  {products.length} {result}
                </span>
              </PaginateBar>
            </FiltersBar>
            <ProductsMobile>
              {products.length > 0 &&
                products.map((product) => {
                  return (
                    <div key={product.id}>
                      <MobileCard product={product} />
                    </div>
                  );
                })}
            </ProductsMobile>
            <Products>
              {products.length > 0 &&
                products.map((product) => {
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
                <ButtonSkew text={piecesdetachee} />
              </div>
              {subCategories.map((category) => {
                return (
                  <li key={category?.slug} className="category_name">
                    <Link
                      href={`/inmotion-mobility/categories/pieces-detachees/${category?.slug}`}
                      passHref
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
  return <LayoutMobility>{page}</LayoutMobility>;
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

  const productsUpSells = await getProductsUpSells(
    _productsByCategory,
    lang as string,
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
