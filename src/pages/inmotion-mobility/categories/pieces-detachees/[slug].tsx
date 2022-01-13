import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactElement, useEffect, useState } from "react";
import LayoutMobility from "../../../../Layout/LayoutMobility";
import { wc_getSub_categories } from "../../../../services/woocommerceApi/Categories";
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
  slug: string;
}

export default function PiecesDetacheesSubCat({
  productsByCategory,
  subCategories,
  productsUpSells,
  slug,
}: Props) {
  const router = useRouter();
  const [upSellFilter, setUpSellFilter] = useState(false);
  const [products, setProducts] = useState<IProduct[]>(productsByCategory);
  const [upSellName, setUpSellName] = useState("");

  useEffect(() => {
    setUpSellName("");
    setProducts(productsByCategory);
  }, [router.query, productsByCategory]);

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

  return (
    <Container>
      <h1>{slug}</h1>

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
                        router.query.slug === category?.slug ? "active" : ""
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
  );
}

PiecesDetacheesSubCat.getLayout = function getLayout(page: ReactElement) {
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

  const productsWithEuroDevise = await addEuroPriceInProducts(
    _productsByCategory
  );

  const subCategories = await wc_getSub_categories(lang as string, 237);

  const mobilityProducts = await getProductByCategory(80, "fr");

  const productsUpSells = getProductsUpSells(
    _productsByCategory,
    mobilityProducts,
    slug as string
  );

  return {
    props: {
      productsByCategory: productsWithEuroDevise,
      subCategories,
      productsUpSells,
      slug,
    },
    revalidate: 60 * 2,
  };
};
