import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import React, { ChangeEvent, ReactElement, useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useRouter } from "next/router";
import Notiflix from "notiflix";

import cityBG from "../../../../public/images/backgrounds/productCity.svg";

import useCart from "../../../hooks/useCart";
import { IProduct } from "../../../interfaces/IProducts";
import {
  getProductByID,
  getVariations,
  wc_getProductBySlug,
} from "../../../services/woocommerceApi/Products";
import placeholder from "../../../../public/images/placeholder_woocommerce.webp";
import useTranslation from "next-translate/useTranslation";
import LayoutMobility from "../../../Layout/LayoutMobility";
import HeaderSeo from "../../../components/HeaderSeo";
import { IVariation } from "../../../interfaces/IVariation";
import {
  addEuroPriceInProducts,
  addEuroPriceInSingleProduct,
} from "../../../utils/addEuroPriceInProducts";
import useCurrency from "../../../hooks/useCurrency";
import CarouselSwiper from "../../../components/Sliders/Carousel";
import { ProductImageCarousel } from "../../../components/Sliders/ProductImageCarousel";

import {
  Container,
  ImageBlock,
  PriceQuantity,
  Button,
  StockProduct,
  Main,
  ProductCard,
  ProductInfos,
  CardWrapper,
  ProductLogo,
  Video,
  DescriptionProduct,
  Sections,
  RelatedProduct,
  Caracteristiques,
  ProductDetaiil,
  VariationProducts,
  Variations,
  VariationImage,
} from "../../../styles/ProductDetail";

interface Props {
  product: IProduct;
  variations: IVariation[];
  crossSellIDS: IProduct[];
}

export default function ProductDetail({
  product,
  variations,
  crossSellIDS,
}: Props) {
  const router = useRouter();
  const { cartItem, addToCart } = useCart();
  const { currency } = useCurrency();
  //creer usestate crossselid avec crossselids initialisé
  /*   const [crossSellsID, setcrossSellsID] = useState(crossSellIDS);

   useEffect(() => {
     setcrossSellsID(crossSellIDS);
   }, [crossSellIDS]); */

  //si marche pas faire useeffect
  // Traductions texts ///////////////////////////////////
  const { t } = useTranslation();
  const btnAddToCart = t("productDetail:addToCart");
  const [productQty, setProductQty] = useState(1);
  const [isDescriptionProduct, setIsDescriptionProduct] = useState(false);

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
      checkDescriptionProduct();
    }

    return () => {
      handleStart();
      handleStop();
    };
    // eslint-disable-next-line
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

  const checkDescriptionProduct = () => {
    const acfKeys = Object.keys(product.acf);

    acfKeys.forEach((item) => {
      if (item === "description_du_produit") {
        setIsDescriptionProduct(true);
      } else {
        setIsDescriptionProduct(false);
      }
    });
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
            <ProductCard>
              {product.images.length === 1 ? (
                <ImageBlock>
                  <Image
                    layout="fill"
                    objectFit="contain"
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
                </ImageBlock>
              ) : (
                <ProductImageCarousel imageList={product.images} />
              )}
            </ProductCard>
            <ProductDetaiil>
              <ProductLogo>
                <span className="product_category">
                  {product.categories[0].name}
                </span>
                <h1 className="first_title">{product.name}</h1>
                <div className="priceBox">
                  {product.on_sale && <p>Promotion !</p>}
                  <div className="price">
                    <div className={product.on_sale ? "regular_price" : ""}>
                      {currency === "CHF"
                        ? !!product.regular_price &&
                          product.regular_price + " " + currency
                        : !!product.euroRegularPrice &&
                          product.euroRegularPrice + " " + currency}
                    </div>

                    <div className="sale_price">
                      {currency === "CHF"
                        ? !!product.sale_price &&
                          product.sale_price + " " + currency
                        : !!product.sale_price &&
                          product.euroPrice + " " + currency}
                    </div>
                  </div>
                </div>
              </ProductLogo>
              <div className="first_description">
                <div
                  dangerouslySetInnerHTML={{
                    __html: product.short_description,
                  }}
                />
              </div>

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

              <VariationProducts>
                <h4>Choisissez une variation</h4>
                <div className="variation">
                  <p>variation1</p>
                  <select name="variation">
                    <option value="1">variation1</option>
                  </select>
                </div>
              </VariationProducts>
              <PriceQuantity>
                <input
                  type="number"
                  onChange={handleChangeQty}
                  value={productQty}
                  placeholder="1"
                />
                <Button type="button" onClick={() => handleAddToCart(product)}>
                  {btnAddToCart}
                </Button>
              </PriceQuantity>

              {product.stock_quantity && (
                <StockProduct>
                  <div>En stock: {product.stock_quantity} pièces</div>
                </StockProduct>
              )}
            </ProductDetaiil>
          </CardWrapper>
          <ProductInfos>
            <div className="bgcity">
              <div className="sectionTitle">
                <p>Informations complémentaires</p>
              </div>
              <Image
                layout="fill"
                objectFit="cover"
                src={cityBG}
                alt="city background"
              />
            </div>
            <DescriptionProduct>
              <Sections>
                {isDescriptionProduct &&
                  product.acf.description_du_produit.map((section, index) => {
                    return (
                      <section key={index}>
                        <div
                          className={index % 2 === 1 ? "section2" : "section1"}
                        >
                          <div className="title_description">
                            <h3> {section.titre_section}</h3>
                            <div
                              dangerouslySetInnerHTML={{
                                __html: section.description_section,
                              }}
                            />
                          </div>
                          <div className="image_section">
                            <Image
                              layout="fill"
                              objectFit="cover"
                              src={section.image_de_la_section}
                              alt={section.titre_section}
                            />
                          </div>
                        </div>
                      </section>
                    );
                  })}
              </Sections>
            </DescriptionProduct>
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
          </ProductInfos>
          <Caracteristiques>
            <table>
              <caption>Caractéristiques</caption>
              <tbody>
                {product.attributes.map((attribute) => {
                  return (
                    <tr key={attribute.id}>
                      <td>{attribute.name}</td>
                      <td>
                        {attribute.options.map((option, id) => {
                          return (
                            <p
                              key={id}
                              dangerouslySetInnerHTML={{
                                __html: option,
                              }}
                            ></p>
                          );
                        })}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Caracteristiques>
          {crossSellIDS && Object.keys(crossSellIDS[0]).length > 0 ? (
            <RelatedProduct>
              <h2 className="squared">Complétez votre équipement</h2>
              <CarouselSwiper products={crossSellIDS} />
            </RelatedProduct>
          ) : null}
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

  if (!product) {
    return {
      redirect: {
        destination: "/inmotion-mobility",
        permanent: false,
      },
    };
  }

  const variations: IVariation[] = await getVariations(product.id);

  //crossSell ids
  const crossSellIDS = await getProductByID(
    product.cross_sell_ids,
    lang as string
  );

  const crossSellProductsWithEuroPrice = await addEuroPriceInProducts(
    crossSellIDS
  );

  const productWithEuro = await addEuroPriceInSingleProduct(product);

  return {
    props: {
      product: productWithEuro,
      crossSellIDS: crossSellProductsWithEuroPrice,
      variations,
    },
    revalidate: 60 * 2, // 2 min
  };
};
