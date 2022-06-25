import { GetStaticPaths, GetStaticProps } from "next";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import { ReactElement, useEffect, useRef, useState } from "react";

import { b2bPaths } from "../../../utils/b2bPaths";
import HeaderSeo from "../../../components/HeaderSeo";
import {
  wc_getCategoriesBySlug,
  wc_getSub_categories,
} from "../../../services/woocommerceApi/Categories";
import { getProduitsByCategoriesSlug } from "../../../services/woocommerceApi/Products";
import { IProduct } from "../../../interfaces/IProducts";
import { ICategories } from "../../../interfaces/ICategories";
import ButtonSkew from "../../../components/ButtonSkew";
import { IoIosArrowDown } from "react-icons/io";
import { addEuroPriceInProducts } from "../../../utils/addEuroPriceInProducts";

import {
  Container,
  Content,
  FiltersBar,
  ProductsSection,
  Products,
  ButtonSelect,
  PaginateBar,
  ProductsMobile,
  MenuSubCategoriesB2B,
  MenuSubCategoriesMobilieB2B,
} from "../../../styles/EquipmentsStyles";
import LayoutB2B from "../../../Layout/LayoutB2B";
import ProductSmallCardB2B from "../../../components/ProductCard/ProductSmallCardB2B";
import MobileCardB2B from "../../../components/ProductCard/MobileCardB2B";
import useUser from "../../../hooks/useUser";
import Notiflix from "notiflix";
import router from "next/router";

interface Props {
  productsByCategory: IProduct[];
  currentyCategory: ICategories;
  subCategories: Partial<ICategories[]>;
  mainCategories: Partial<ICategories[]>;
  equipementsubCategories: Partial<ICategories[]>;
  detachedPiecesSubCategories: Partial<ICategories[]>;
}

export default function EquipementsSubCat({
  productsByCategory,
  currentyCategory,
  mainCategories,
  equipementsubCategories,
  detachedPiecesSubCategories,
}: Props) {
  const menuCategoriesRef = useRef<HTMLDivElement>(null);
  const [openMenuCategories, setOpenMenuCategories] = useState(false);
  const { t } = useTranslation();
  const menuCategories = t("b2b:categoriesmenuTitle");
  const resultats = t("b2b:resultats");
  const categories = t("b2b:categories");
  const equipementTXT = t("b2b:equipementTXT");
  const piecesDetachTXT = t("b2b:piecesDetachTXT");

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

  const handleOpenSubCatMenu = () => {
    setOpenMenuCategories(!openMenuCategories);
  };

  //--------------B2B ROUTING VERIFICATION-----------------
  const [mounted, setMounted] = useState(false);

  const { user } = useUser();

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
    //if NO ACCOUNT
    if (Object.keys(user).length === 0) {
      Notiflix.Report.failure(
        "Erreure",
        "Vous devez posséder un compte b2b pour accéder a cette section",
        "Ok",
        function cb() {
          handleStart();
          router.push("/inmotion-mobility").then((res) => handleStop());
        }
      );
    }
    //if NO VALID B2B account
    else if (
      user.profile.wcb2b_group === "0" ||
      user.profile.wcb2b_group === ""
    ) {
      Notiflix.Report.failure(
        "Erreure",
        "Vous devez posséder un compte b2b pour accéder a cette section",
        "Ok",
        function cb() {
          handleStart();
          router.push("/inmotion-mobility").then((res) => handleStop());
        }
      );
    }
    //if NO ACTIVATED B2B account
    else if (
      user.profile.wcb2b_status === "0" ||
      user.profile.wcb2b_status === ""
    ) {
      Notiflix.Report.warning(
        "Validation Requise",
        "Votre compte est actuelement en vérification, vous pouvez nous contacter si cela est urgent pour valider votre compte",
        "Ok",
        function cb() {
          handleStart();
          router.push("/inmotion-mobility").then((res) => handleStop());
        }
      );
    } else {
      setMounted(true);
    }
  }, [user]);

  return (
    mounted && (
      <>
        <HeaderSeo
          description={currentyCategory.yoast_head_json.og_title}
          title={currentyCategory.yoast_head_json.og_title}
          canonical={`https://inmotion-suisse.ch/inmotion-mobility/b2b/${currentyCategory.name.toLowerCase()}`}
          og_locale={currentyCategory.yoast_head_json.og_locale}
          og_title={currentyCategory.yoast_head_json.og_title}
        />

        <Container>
          <h1>{currentyCategory.slug}</h1>
          <Content>
            <ProductsSection>
              <FiltersBar>
                <MenuSubCategoriesMobilieB2B ref={menuCategoriesRef}>
                  <ButtonSelect onClick={handleOpenSubCatMenu}>
                    <p>{menuCategories}</p> <IoIosArrowDown />
                  </ButtonSelect>
                  {openMenuCategories && (
                    <ul className="menu_subcategories">
                      {mainCategories.map((category) => {
                        return (
                          <li key={category?.slug} className="category_name">
                            <Link
                              href={`/inmotion-mobility/b2b/${category?.slug}`}
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
                      <div className="subTitleMenu">{equipementTXT}</div>
                      <li className="category_name">
                        <ul>
                          {equipementsubCategories.map((category) => {
                            return (
                              <li
                                key={category?.slug}
                                className="category_name scat"
                              >
                                <Link
                                  href={`/inmotion-mobility/b2b/${category?.slug}`}
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
                      </li>
                      <div className="subTitleMenu">{piecesDetachTXT}</div>
                      <li className="category_name">
                        <ul>
                          {detachedPiecesSubCategories.map((category) => {
                            return (
                              <li
                                key={category?.slug}
                                className="category_name scat"
                              >
                                <Link
                                  href={`/inmotion-mobility/b2b/${category?.slug}`}
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
                      </li>
                    </ul>
                  )}
                </MenuSubCategoriesMobilieB2B>
                <PaginateBar>
                  <span>
                    {productsByCategory.length} {resultats}
                  </span>
                </PaginateBar>
              </FiltersBar>
              <ProductsMobile>
                {productsByCategory.map((product) => {
                  return (
                    <div key={product.id}>
                      <MobileCardB2B product={product} />
                    </div>
                  );
                })}
              </ProductsMobile>

              <Products>
                {productsByCategory.map((product) => {
                  return (
                    <div key={product.id}>
                      <ProductSmallCardB2B product={product} />
                    </div>
                  );
                })}
              </Products>
            </ProductsSection>
            <MenuSubCategoriesB2B>
              <ul className="menu_subcategories">
                <div className="skew_button">
                  <ButtonSkew text={categories} />
                </div>
                {mainCategories.map((category) => {
                  return (
                    <li key={category?.slug} className="category_name">
                      <Link
                        href={`/inmotion-mobility/b2b/${category?.slug}`}
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
                <div className="equipementsTitle">{equipementTXT}</div>
                <li className="category_name">
                  <ul className="menu_subcategories">
                    {equipementsubCategories.map((category) => {
                      return (
                        <li key={category?.slug} className="category_name">
                          <Link
                            href={`/inmotion-mobility/b2b/${category?.slug}`}
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
                </li>
                <div className="equipementsTitle">{piecesDetachTXT}</div>
                <li className="category_name">
                  <ul className="menu_subcategories">
                    {detachedPiecesSubCategories.map((category) => {
                      return (
                        <li key={category?.slug} className="category_name">
                          <Link
                            href={`/inmotion-mobility/b2b/${category?.slug}`}
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
                </li>
              </ul>
            </MenuSubCategoriesB2B>
          </Content>
        </Container>
      </>
    )
  );
}

EquipementsSubCat.getLayout = function getLayout(page: ReactElement) {
  return <LayoutB2B>{page}</LayoutB2B>;
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: b2bPaths,
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

  const _mainCategories = await wc_getSub_categories(lang as string, 80);

  //main Categories
  const mainCategories = _mainCategories.filter(
    (category: ICategories) =>
      category.slug !== "non-classe" &&
      category.slug !== "occasions" &&
      category.slug !== "occasions-en" &&
      category.slug !== "gelegenheiten" &&
      category.slug !== "ausruestungen" &&
      category.slug !== "abgeloeste-teile" &&
      category.slug !== "equipments" &&
      category.slug !== "detached-pieces-3" &&
      category.slug !== "equipements" &&
      category.slug !== "pieces-detachees-mobility"
  );

  mainCategories.sort((a: any, b: any) => {
    return a.menu_order - b.menu_order;
  });
  //equipement Sub Categories
  const _equipementsubCategories = await wc_getSub_categories(
    lang as string,
    241
  );

  const equipementsubCategories = _equipementsubCategories.map(
    (category: ICategories) => {
      const name = category.name;
      const slug = category.slug;

      return { name, slug };
    }
  );
  const _detachedPiecesSubCategories = await wc_getSub_categories(
    lang as string,
    237
  );

  const detachedPiecesSubCategories = _detachedPiecesSubCategories.map(
    (category: ICategories) => {
      const name = category.name;
      const slug = category.slug;

      return { name, slug };
    }
  );

  const productsWithEuroDevise = await addEuroPriceInProducts(
    productsByCategory
  );

  return {
    props: {
      productsByCategory: productsWithEuroDevise,
      mainCategories,
      equipementsubCategories,
      detachedPiecesSubCategories,
      currentyCategory,
    },
    revalidate: 60 * 2,
  };
};
