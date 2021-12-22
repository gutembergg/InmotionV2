import React, { ReactElement, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { GetStaticPaths, GetStaticProps } from "next";
import { ICategories } from "../../../interfaces/ICategories";
import { IProduct } from "../../../interfaces/IProducts";
import HomeIcon from "../../../../public/images/icons/house.svg";
import WeigthIcon from "../../../../public/images/icons/weight-product.png";
import SpeedIcon from "../../../../public/images/icons/speed.svg";
import AutonomieIcon from "../../../../public/images/icons/autonomie-icon.svg";
import CheckIcon from "../../../../public/images/icons/draw-check-mark.svg";

import { wc_getCategoriesBySlug } from "../../../services/woocommerceApi/Categories";
import { getProduitsByCategoriesSlug } from "../../../services/woocommerceApi/Products";

import getAcfContent from "../../../utils/getAcfContent";
import placeholder from "../../../../public/images/placeholder_woocommerce.png";

import useCart from "../../../hooks/useCart";
import ButtonSkew from "../../../components/ButtonSkew";
import useTranslation from "next-translate/useTranslation";
import LayoutMobility from "../../../Layout/LayoutMobility";
import HeaderSeo from "../../../components/HeaderSeo";
import SliderModels from "../../../components/Sliders/SliderModels";

import {
  Container,
  ProductInfos,
  ProductImage,
  ProductMenuModel,
  Content,
  LogoProduct,
  AddToCartSession,
  ProductMenuResponsive,
} from "../../../styles/CategoryDetail";

interface Props {
  category: ICategories;
  productsByCategory: IProduct[];
}

export default function Category({ category, productsByCategory }: Props) {
  const router = useRouter();
  const { cartItem, addToCart } = useCart();

  // Traductions texts ///////////////////////////////////
  const { t } = useTranslation();
  const btnAddToCart = t("productDetail:addToCart");
  const linkShowDetails = t("productDetail:showDetails");

  const [productIndex, setProductIndex] = useState(0);
  const [products, _setProducts] = useState<IProduct[]>(productsByCategory);
  const [activedModelIndex, setActivedModelIndex] = useState(0);

  useEffect(() => {
    _setProducts(productsByCategory);
  }, [productsByCategory]);

  useEffect(() => {
    setProductIndex(0);
  }, [router.query.slug]);

  const handleModelMarque = (id: number, index: number) => {
    setActivedModelIndex(index);
    products.find((prod, index) => {
      setProductIndex(index);

      return prod.id === id;
    });
  };

  const autonomie = products[productIndex]?.attributes.find(
    (item) => item.name === "Autonomie"
  );

  const vitesse = products[productIndex]?.attributes.find(
    (item) => item.name === "Vitesse"
  );

  const handleAddToCart = (product: IProduct) => {
    const productExist = cartItem.find((item) => item.id === product.id);

    if (productExist) {
      const newCart = [...cartItem];

      const cart = newCart.map((item) =>
        item.id === product.id
          ? { ...productExist, qty: productExist.qty + 1 }
          : item
      );

      addToCart(cart);
    } else {
      addToCart([...cartItem, { ...product, qty: 1 }]);
    }
  };

  return (
    <>
      <HeaderSeo
        description="Mobility eletrique produits"
        title={category.yoast_head_json.og_title}
        canonical={category.yoast_head_json.canonical}
        og_locale={category.yoast_head_json.og_locale}
        og_title={category.yoast_head_json.og_title}
      />
      <Container>
        <Content>
          <ProductInfos>
            <div className="weight">
              <span>
                <Image src={WeigthIcon} alt="poids" />
              </span>
              <span>17 KM</span>
            </div>
            <div className="weight">
              <span>
                <Image src={SpeedIcon} alt="poids" />
              </span>
              <span>{vitesse?.options[0]}</span>
            </div>
            <div className="weight autonomie">
              <span>
                <Image src={AutonomieIcon} alt="poids" />
              </span>
              <span>{autonomie?.options[0]}</span>
            </div>
            <div className="politic_text autonomie">
              <span>
                <Image
                  width={52}
                  height={55}
                  src={CheckIcon}
                  alt="poids"
                  className="image"
                />
              </span>
              <span>
                {" "}
                Autorisé en Suisse à circuler sur voie publique : piste cyclable
                et route
              </span>
            </div>
          </ProductInfos>
          <ProductImage>
            <Image
              objectFit="contain"
              layout="fill"
              src={
                products[productIndex]?.images[0]
                  ? products[productIndex]?.images[0].src
                  : placeholder.src
              }
              alt={products[productIndex]?.name}
              placeholder="blur"
              blurDataURL={
                products[productIndex]?.images[0]
                  ? products[productIndex]?.images[0].src
                  : placeholder.src
              }
            />
          </ProductImage>

          <ProductMenuResponsive className="responsive">
            <SliderModels
              products={products}
              handleModelMarque={handleModelMarque}
              activedModelIndex={activedModelIndex}
            />
          </ProductMenuResponsive>
          <ProductMenuModel>
            <span className="skew">
              <ButtonSkew text={category.name} />
            </span>

            <ul className="prod_model-marque">
              {products.map((product, index) => {
                return (
                  <li
                    className="prod_model_item"
                    key={product.id}
                    onClick={() => handleModelMarque(product.id, index)}
                  >
                    {getAcfContent(product, "marque_du_produit")}{" "}
                    <span>{getAcfContent(product, "modele_du_produit")}</span>
                  </li>
                );
              })}
            </ul>
          </ProductMenuModel>
        </Content>

        <LogoProduct>
          <div>
            {products[productIndex]?.on_sale && (
              <ButtonSkew text="Promotion!" />
            )}
          </div>
          <div className="logo_box">
            <h2 className="first_title">
              {products[productIndex] &&
                getAcfContent(products[productIndex], "marque_du_produit")}{" "}
              <span>
                {products[productIndex] &&
                  getAcfContent(products[productIndex], "modele_du_produit")}
              </span>
            </h2>
            <div className="price">
              <div
                className={
                  products[productIndex]?.on_sale ? "regular_price" : ""
                }
              >
                {!!products[productIndex]?.regular_price &&
                  products[productIndex]?.regular_price}
              </div>
              <div className="sale_price">
                {!!products[productIndex]?.sale_price &&
                  products[productIndex]?.sale_price}
              </div>
            </div>
          </div>
        </LogoProduct>
        <AddToCartSession>
          <button
            className="addToCart_button"
            onClick={() => handleAddToCart(products[productIndex])}
          >
            {btnAddToCart}
          </button>
          <Link
            href={`/inmotion-mobility/produit/${products[productIndex]?.slug}`}
          >
            <a className="link">{linkShowDetails}</a>
          </Link>
        </AddToCartSession>
        <div className="decouvrez_model">
          Decovrez le{" "}
          {products[productIndex] &&
            getAcfContent(products[productIndex], "modele_du_produit")}{" "}
          en détail
        </div>
      </Container>
    </>
  );
}

Category.getLayout = function getLayout(page: ReactElement) {
  return <LayoutMobility icon={HomeIcon}>{page}</LayoutMobility>;
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: { slug: "velos-electriques" }, locale: "en" },
      { params: { slug: "velos-electriques" }, locale: "fr" },
      { params: { slug: "velos-electriques" }, locale: "de" },
      { params: { slug: "trottinettes" }, locale: "en" },
      { params: { slug: "trottinettes" }, locale: "fr" },
      { params: { slug: "trottinettes" }, locale: "de" },
      { params: { slug: "gyroroues" }, locale: "en" },
      { params: { slug: "gyroroues" }, locale: "fr" },
      { params: { slug: "gyroroues" }, locale: "de" },
    ],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const slug: any = ctx.params?.slug;
  const lang = ctx.locale;

  const category = await wc_getCategoriesBySlug(slug as string, lang as string);

  if (!category) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const productsByCategory = await getProduitsByCategoriesSlug(
    slug as string,
    lang as string
  );

  return {
    props: {
      category,
      productsByCategory: productsByCategory,
    },
    revalidate: 60 * 2,
  };
};
