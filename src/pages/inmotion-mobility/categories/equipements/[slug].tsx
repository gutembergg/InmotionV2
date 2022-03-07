import { GetStaticPaths, GetStaticProps } from "next";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import { ReactElement, useEffect, useRef, useState } from "react";
import { equipementPaths } from "../../../../utils/equipementPaths";
import HeaderSeo from "../../../../components/HeaderSeo";
import LayoutMobility from "../../../../Layout/LayoutMobility";
import {
  wc_getCategoriesBySlug,
  wc_getSub_categories,
} from "../../../../services/woocommerceApi/Categories";
import { getProduitsByCategoriesSlug } from "../../../../services/woocommerceApi/Products";
import { IProduct } from "../../../../interfaces/IProducts";
import { ICategories } from "../../../../interfaces/ICategories";
import ButtonSkew from "../../../../components/ButtonSkew";
import { IoIosArrowDown } from "react-icons/io";
import ProductSmallCard from "../../../../components/ProductCard/ProductSmallCard";
import { addEuroPriceInProducts } from "../../../../utils/addEuroPriceInProducts";
import MobileCard from "../../../../components/ProductCard/MobileCard";
import { motion } from "framer-motion";

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
  ProductsMobile,
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
  const menuCategoriesRef = useRef<HTMLDivElement>(null);
  const [openMenuCategories, setOpenMenuCategories] = useState(false);
  const { t } = useTranslation();
  const menuCategories = t("equipmentsPage:categories");
  const resultats = t("equipmentsPage:resultats");
  const equipements = t("equipmentsPage:equipements");

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
              <MenuSubCategoriesMobilie ref={menuCategoriesRef}>
                <ButtonSelect onClick={handleOpenSubCatMenu}>
                  <p>{menuCategories}</p> <IoIosArrowDown />
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
                <span>{productsByCategory.length} {resultats}</span>
              </PaginateBar>
            </FiltersBar>
            <ProductsMobile>
              {productsByCategory.map((product) => {
                return (
                  <div key={product.id}>
                    <MobileCard product={product} isEquipement={true} />
                  </div>
                );
              })}
            </ProductsMobile>

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
                <ButtonSkew text={equipements} />
              </div>
              {subCategories.map((category) => {
                return (
                  <li key={category?.slug} className="category_name">
                    <Link
                      href={`/inmotion-mobility/categories/equipements/${category?.slug}`}
                    >
                      <motion.a 
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.05 },
                color: "#414141" 
              }}
              style={{ originX: 0.5 }}
              whileTap={{ scale: 0.98, transition: { duration: 0.01 },}}
                        className={
                          currentyCategory.slug === category?.slug
                            ? "active"
                            : ""
                        }
                      >
                        {category?.name}
                      </motion.a>
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
