import React, { ReactElement, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { ICategories } from "../../../interfaces/ICategories";
import { IProduct } from "../../../interfaces/IProducts";
import HomeIcon from "../../../../public/images/icons/house.svg";
import WeigthIcon from "../../../../public/images/icons/weight-product.png";
import SpeedIcon from "../../../../public/images/icons/speed.svg";
import AutonomieIcon from "../../../../public/images/icons/autonomie-icon.svg";
import CheckIcon from "../../../../public/images/icons/draw-check-mark.svg";

import { wc_getCategoriesBySlug } from "../../../services/woocommerceApi/Categories";
import { getProduitsByCategoriesSlug } from "../../../services/woocommerceApi/Products";
import { CurvedBackground } from "../../../styles/BackgroundStyle";

import getAcfContent from "../../../utils/getAcfContent";
import placeholder from "../../../../public/images/placeholder_woocommerce.png";

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
import useCart from "../../../hooks/useCart";
import ButtonSkew from "../../../components/ButtonSkew";
import useTranslation from "next-translate/useTranslation";
import LayoutMobility from "../../../Layout/LayoutMobility";

interface Props {
  category: ICategories;
  productsByCategory: IProduct[];
}

export default function Category({ category, productsByCategory }: Props) {
  const { cartItem, addToCart } = useCart();

  // Traductions texts ///////////////////////////////////
  const { t } = useTranslation();
  const btnAddToCart = t("productDetail:addToCart");
  const linkShowDetails = t("productDetail:showDetails");

  const [productIndex, setProductIndex] = useState(0);
  const [_accessories, _setAccessories] = useState<IProduct[]>([]);
  const [activedModelIndex, setActivedModelIndex] = useState(0);

  const handleModelMarque = (id: number, index: number) => {
    _setAccessories([]);
    setActivedModelIndex(index);
    productsByCategory.find((prod, index) => {
      setProductIndex(index);

      return prod.id === id;
    });
  };

  const autonomie = productsByCategory[productIndex]?.attributes.find(
    (item) => item.name === "Autonomie"
  );

  const vitesse = productsByCategory[productIndex]?.attributes.find(
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
            width={250}
            height={260}
            src={
              productsByCategory[productIndex].images[0]
                ? productsByCategory[productIndex].images[0].src
                : placeholder.src
            }
            alt={productsByCategory[productIndex].name}
          />
        </ProductImage>

        <ProductMenuResponsive className="responsive">
          <ul className="prod_model-marque">
            {productsByCategory.map((product, index) => {
              return (
                <li
                  className={
                    activedModelIndex === index
                      ? "model_buttons model_actived"
                      : "model_buttons"
                  }
                  key={product.id}
                  onClick={() => handleModelMarque(product.id, index)}
                >
                  {getAcfContent(product, "marque_du_produit")}{" "}
                  <span>{getAcfContent(product, "modele_du_produit")}</span>
                </li>
              );
            })}
          </ul>
        </ProductMenuResponsive>
        <ProductMenuModel>
          <span className="skew">
            <ButtonSkew text={category.name} />
          </span>

          <ul className="prod_model-marque">
            {productsByCategory.map((product, index) => {
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
          {!!productsByCategory[productIndex].regular_price &&
            "Promotion! produit category"}
        </div>
        <div className="logo_box">
          <h2 className="first_title">
            {getAcfContent(
              productsByCategory[productIndex],
              "marque_du_produit"
            )}{" "}
            <span>
              {getAcfContent(
                productsByCategory[productIndex],
                "modele_du_produit"
              )}
            </span>
          </h2>
          <div className="price">
            <div className="regular_price">
              {!!productsByCategory[productIndex].regular_price &&
                productsByCategory[productIndex].regular_price}
            </div>
            <div>
              {!!productsByCategory[productIndex].sale_price &&
                productsByCategory[productIndex].sale_price}
            </div>
          </div>
        </div>
      </LogoProduct>
      <AddToCartSession>
        <button
          className="addToCart_button"
          onClick={() => handleAddToCart(productsByCategory[productIndex])}
        >
          {btnAddToCart}
        </button>
        <Link
          href={`/inmotion-mobility/produit/${productsByCategory[productIndex].slug}`}
        >
          <a className="link">{linkShowDetails}</a>
        </Link>
      </AddToCartSession>
      <div className="decouvrez_model">
        Decovrez le{" "}
        {getAcfContent(productsByCategory[productIndex], "modele_du_produit")}{" "}
        en détail
      </div>
    </Container>
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
    revalidate: 60, // 1h
  };
};
