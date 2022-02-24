import React, { ReactElement, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { GetStaticPaths, GetStaticProps } from "next";
import { ICategories } from "../../../interfaces/ICategories";
import { IProduct } from "../../../interfaces/IProducts";
import RoadIcon from "../../../../public/images/icons/road.svg";
import SpeedIcon from "../../../../public/images/icons/speed.svg";
import AutonomieIcon from "../../../../public/images/icons/autonomie-icon.svg";

import { wc_getCategoriesBySlug } from "../../../services/woocommerceApi/Categories";
import { getProduitsByCategoriesSlug } from "../../../services/woocommerceApi/Products";

import placeholder from "../../../../public/images/placeholder_woocommerce.webp";

import useCart from "../../../hooks/useCart";
import ButtonSkew from "../../../components/ButtonSkew";
import useTranslation from "next-translate/useTranslation";
import LayoutMobility from "../../../Layout/LayoutMobility";
import HeaderSeo from "../../../components/HeaderSeo";
import SliderModels from "../../../components/Sliders/SliderModels";
import { addEuroPriceInProducts } from "../../../utils/addEuroPriceInProducts";

import {
  Container,
  ProductInfos,
  ProductImage,
  ProductMenuModel,
  Content,
  LogoProduct,
  AddToCartSession,
  ProductMenuResponsive,
  BtnProductDetail,
} from "../../../styles/CategoryDetail";
import useCurrency from "../../../hooks/useCurrency";

interface Props {
  category: ICategories;
  productsByCategory: IProduct[];
}

export default function Category({ category, productsByCategory }: Props) {
  const router = useRouter();
  const { cartItem, addToCart } = useCart();
  const { currency } = useCurrency();

  // Traductions texts ///////////////////////////////////
  const { t } = useTranslation();
  const btnAddToCart = t("productDetail:addToCart");
  const linkShowDetails = t("productDetail:showDetails");
  const showVariationTradution = t("productDetail:showVariationTradution");

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
  const autorisationRouler = products[productIndex]?.attributes.find(
    (item) => item.name === "autorisation circulation"
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
  const colorizeTitle = () =>{
    const titleColorized = products[productIndex]?.name.replace(/^\s*\w+/, '<span style="color:var(--Red)">$&</span>');
    return(
      titleColorized
    )
  }
console.log(products[productIndex])
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
        <h1>{category.name}</h1>
        <Content>
          <ProductImage>
            <Image
              objectFit="contain"
              layout="fill"
              objectPosition="right"
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
          <div>
            <LogoProduct>

              <div className="logo_box">
                <h2 className="first_title" dangerouslySetInnerHTML={{__html: colorizeTitle()}}>
                </h2>
                <div className="price">
                  <div
                    className={
                      products[productIndex]?.on_sale ? "regular_price" : ""
                    }
                  >
                    {currency === "CHF"
                      ? !!products[productIndex]?.regular_price &&
                        products[productIndex]?.regular_price + " " + currency
                      : !!products[productIndex]?.euroRegularPrice &&
                        products[productIndex]?.euroRegularPrice +
                          " " +
                          currency}
                  </div>

                  <div className="sale_price">
                    {currency === "CHF"
                      ? !!products[productIndex]?.sale_price &&
                        products[productIndex]?.sale_price + " " + currency
                      : !!products[productIndex]?.sale_price &&
                        products[productIndex]?.euroPrice + " " + currency}
                  </div>
                  <div>
                {products[productIndex]?.on_sale && (
                  <p>Promotion !</p>
                )}
              </div>
                </div>
              </div>
            </LogoProduct>
            <ProductInfos>
            <div className="weight">
            <div className="iconBox">
                <Image 
                src={SpeedIcon} 
                alt="poids" 
                layout="fill"
                objectFit="contain"
                />
              </div>
              <div
                dangerouslySetInnerHTML={{
                  __html: vitesse?.options[0] as string,
                }}
              ></div>
            </div>
            <div className="weight autonomie">
            <div className="iconBox">
                <Image 
                src={AutonomieIcon} 
                alt="poids" 
                layout="fill"
                objectFit="contain"
                />
              </div>
              <div
                dangerouslySetInnerHTML={{
                  __html: autonomie?.options[0] as string,
                }}
              ></div>
            </div>
            {autorisationRouler !== undefined && autorisationRouler.options[0].length > 0 && (

              <div className="politic_text autonomie">
              <div className="iconBox">
                <Image
                  layout="fill"
                  objectFit="contain"
                  src={RoadIcon}
                  alt="poids"
                  className="image"
                  />
              </div>
              <div>
                {autorisationRouler?.options.map((autorisation, key) => {
                  return (
                    <div
                    key={key}
                    dangerouslySetInnerHTML={{ __html: autorisation }}
                    ></div>
                    );
                  })}
              </div>
            </div>
                  )}
          </ProductInfos>
            {products[productIndex]?.variations.length > 0 ? (
              <BtnProductDetail>
                <Link
                  href={`/inmotion-mobility/produit/${products[productIndex]?.slug}`}
                >
                  {showVariationTradution}
                </Link>
              </BtnProductDetail>
            ) : (
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
            )}
          </div>
        </Content>
        <h2 className="squared sliderTitle">Choisissez votre modèle</h2>
        <ProductMenuResponsive className="productMenuResponsive">
          <SliderModels
            products={products}
            handleModelMarque={handleModelMarque}
            activedModelIndex={activedModelIndex}
          />
        </ProductMenuResponsive>
      </Container>
    </>
  );
}

Category.getLayout = function getLayout(page: ReactElement) {
  return <LayoutMobility>{page}</LayoutMobility>;
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

  const productsWithEuroDevise = await addEuroPriceInProducts(
    productsByCategory
  );

  return {
    props: {
      category,
      productsByCategory: productsWithEuroDevise,
    },
    revalidate: 60 * 2,
  };
};
