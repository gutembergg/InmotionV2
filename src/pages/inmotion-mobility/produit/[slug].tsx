import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import React, { ChangeEvent, ReactElement, useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useRouter } from "next/router";
import Notiflix from "notiflix";

import getAcfContent from "../../../utils/getAcfContent";
import useCart from "../../../hooks/useCart";
import { IProduct } from "../../../interfaces/IProducts";
import {
  getVariations,
  wc_getProductBySlug,
} from "../../../services/woocommerceApi/Products";
import placeholder from "../../../../public/images/placeholder_woocommerce.png";
import ButtonSkew from "../../../components/ButtonSkew";
import useTranslation from "next-translate/useTranslation";
import LayoutMobility from "../../../Layout/LayoutMobility";
import HeaderSeo from "../../../components/HeaderSeo";
import { IVariation } from "../../../interfaces/IVariation";
import { addEuroPriceInSingleProduct } from "../../../utils/addEuroPriceInProducts";
import useCurrency from "../../../hooks/useCurrency";
import PreviousPageLink from "../../../components/PreviousPageLink";

import {
  Container,
  ImageBlock,
  PriceQuantity,
  Button,
  StockProduct,
  Main,
  ProductCard,
  ProductInfos,
  Card,
  CardWrapper,
  ProductLogo,
  Video,
  DescriptionProduct,
  Sections,
  Variations,
  VariationImage,
} from "../../../styles/ProductDetail";

interface Props {
  product: IProduct;
  variations: IVariation[];
}

export default function ProductDetail({ product, variations }: Props) {
  const router = useRouter();
  const { cartItem, addToCart } = useCart();
  const { currency } = useCurrency();

  // Traductions texts ///////////////////////////////////
  const { t } = useTranslation();
  const btnAddToCart = t("productDetail:addToCart");
  const [productQty, setProductQty] = useState(1);

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

  if (router.isFallback) {
    return <div></div>;
  }

  const videoUrl = product.meta_data?.filter((meta) => {
    if (meta.key === "video_youtube_en_avant") {
      const url = meta.value;

      return url;
    }
  });

  const handleAddToCart = (product: IProduct) => {
    const productExist = cartItem.find((item) => item.id === product.id);

    if (productExist) {
      const newCart = [...cartItem];

      const cart = newCart.map((item) =>
        item.id === product.id
          ? { ...productExist, qty: productExist.qty + productQty }
          : item
      );

      addToCart(cart);
    } else {
      addToCart([...cartItem, { ...product, qty: productQty }]);
    }
  };

  const handleChangeQty = (e: ChangeEvent<HTMLInputElement>) => {
    const quantity = parseInt(e.target.value, 10);
    setProductQty(quantity);
  };

  return (
    <>
      <HeaderSeo
        description="Mobilité eletrique produits"
        title={product.yoast_head_json.og_title}
        canonical={product.yoast_head_json.canonical}
        og_locale={product.yoast_head_json.og_locale}
        og_title={product.yoast_head_json.og_title}
        og_image={product.yoast_head_json.og_image}
      />
      <Container>
        <Main>
          <CardWrapper>
            <PreviousPageLink />
            <ProductCard>
              <Card>
                <h2 className="first_title">
                  {getAcfContent(product, "marque_du_produit")}{" "}
                  <span>{getAcfContent(product, "modele_du_produit")}</span>
                </h2>

                <ImageBlock>
                  <span className="image">
                    <Image
                      width={250}
                      height={250}
                      src={
                        product.images[0]
                          ? product.images[0].src
                          : placeholder.src
                      }
                      alt={product.name}
                      placeholder="blur"
                      blurDataURL={
                        product.images[0]
                          ? product.images[0].src
                          : placeholder.src
                      }
                    />

                    {product.on_sale && (
                      <span>
                        <ButtonSkew text="Promotion!" />
                      </span>
                    )}
                  </span>
                </ImageBlock>

                <PriceQuantity>
                  <div className="price">
                    {currency === "CHF" ? product.price : product.euroPrice}
                  </div>

                  <input
                    type="number"
                    onChange={handleChangeQty}
                    value={productQty}
                    placeholder="1"
                  />
                </PriceQuantity>

                <Button type="button" onClick={() => handleAddToCart(product)}>
                  {btnAddToCart}
                </Button>

                {product.stock_quantity && (
                  <StockProduct>
                    <div>En stock: {product.stock_quantity} pièces</div>
                  </StockProduct>
                )}
              </Card>
            </ProductCard>
            <div style={{ width: "25vw" }}></div>
          </CardWrapper>

          <ProductInfos>
            <ProductLogo>
              <span>
                <div className="product_category">
                  {product.categories[0].name}
                </div>
              </span>
              <h2 className="first_title">
                <span className="marque_product">
                  {getAcfContent(product, "marque_du_produit")}
                </span>
                <span className="product_sku">
                  {getAcfContent(product, "modele_du_produit")}
                </span>
              </h2>
            </ProductLogo>
            <div className="first_description">
              ----Description produit----- Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Dolores, esse. Rerum soluta vitae
              qui? Earum deleniti sapiente, sint facilis architecto saepe fuga
              quibusdam sunt eius, a sequi voluptas corrupti. Veniam?{" "}
              {product.description}
            </div>

            {videoUrl.length > 0 && (
              <Video className="video_product">
                <ReactPlayer
                  width="100%"
                  height="100%"
                  url={videoUrl[0].value}
                  controls
                />
              </Video>
            )}

            <Variations>
              <ul>
                {variations.map((variation) => {
                  return (
                    <li key={variation.id}>
                      <VariationImage>
                        <Image
                          src={variation.image.src}
                          width={60}
                          height={60}
                          alt={variation.image.name}
                        />
                      </VariationImage>
                    </li>
                  );
                })}
              </ul>
            </Variations>

            <DescriptionProduct>
              <Sections>
                {/*  {product.acf.hasOwnProperty("description_du_produit") &&
                  product.acf.description_du_produit.map((section, index) => {
                    return (
                      <Section key={index}>
                        <div
                          className={index % 2 === 1 ? "section2" : "section1"}
                        >
                          <div className="title_description">
                            <div> {section.titre_section}</div>

                            <div
                              dangerouslySetInnerHTML={{
                                __html: section.description_section,
                              }}
                            />
                          </div>

                          <div className="image_section">
                            <Image
                              width={320}
                              height={320}
                              src={section.image_de_la_section}
                              alt={section.titre_section}
                              objectFit="cover"
                            />
                          </div>
                        </div>
                      </Section>
                    );
                  })} */}
              </Sections>
            </DescriptionProduct>
          </ProductInfos>
        </Main>
      </Container>
    </>
  );
}

ProductDetail.getLayout = function getLayout(page: ReactElement) {
  return <LayoutMobility>{page}</LayoutMobility>;
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const slug: any = ctx.params?.slug;
  const lang = ctx.locale;

  const product = await wc_getProductBySlug(slug as string, lang as string);

  const variations: IVariation[] = await getVariations(product.id);

  if (!product) {
    return {
      redirect: {
        destination: "/inmotion-mobility",
        permanent: false,
      },
    };
  }

  const productWithEuro = await addEuroPriceInSingleProduct(product);

  return {
    props: {
      product: productWithEuro,
      variations,
    },
    revalidate: 60 * 2, // 2 min
  };
};
