import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import React, {
  ChangeEvent,
  FormEventHandler,
  ReactElement,
  useEffect,
  useState,
} from "react";
import ReactPlayer from "react-player";
import router, { useRouter } from "next/router";
import Notiflix from "notiflix";
import useTranslation from "next-translate/useTranslation";

import cityBG from "../../../../public/images/backgrounds/productCity.svg";

import useCart from "../../../hooks/useCart";
import { IProduct } from "../../../interfaces/IProducts";
import {
  getProductByID,
  getVariations,
  wc_getProductBySlug,
} from "../../../services/woocommerceApi/Products";
import placeholder from "../../../../public/images/placeholder_woocommerce.webp";
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
  VariationData,
  VariationDisplay,
  SelectedVariation,
} from "../../../styles/ProductDetail";
import StockStatuts from "../../../components/StockStatus";
import { switchAttributesToEN } from "../../../utils/switchAttributeToEN";
import { switchAttributesToDE } from "../../../utils/switchAttributeToDE";

interface Props {
  product: IProduct;
  variations: IVariation[];
  crossSellIDS: IProduct[];
  onChange: () => void;
}

export default function ProductDetail({
  product,
  variations,
  crossSellIDS,
}: Props) {
  const router = useRouter();
  const { cartItem, addToCart } = useCart();
  const { currency } = useCurrency();

  // Traductions texts ///////////////////////////////////
  const { t } = useTranslation();
  const btnAddToCart = t("productDetail:addToCart");
  const InfoComplementaires = t("productDetail:InfoComplementaires");
  const ChooseVariation = t("productDetail:ChooseVariation");
  const txtCaracteristiques = t("productDetail:Caracteristiques");

  const [productQty, setProductQty] = useState(1);
  const [isDescriptionProduct, setIsDescriptionProduct] = useState(false);

  //----------------------variations--------------------------------

  //check if product is variable or not
  const isVariable = product?.variations.length > 0 ? true : false;
  const [selectedVariation, setSelectedVariation] = useState({} as IVariation);

  //
  const VariationButtons = () => {
    console.log("selected Variation-->", selectedVariation);
    return (
      <>
        {variations.map((variation) => (
          <VariationDisplay
            className={selectedVariation === variation ? "active" : ""}
            onClick={() => setSelectedVariation(variation)}
            key={variation.id}
          >
            <VariationData>
              <h3>{variation.attributes[0].option}</h3>
            </VariationData>
          </VariationDisplay>
        ))}
      </>
    );
  };

  // console.log("produit---->", product);
  // console.log("isvariable", isVariable);
  // console.log("variations", variations);

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
{ !isVariable ? (
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
                </div>):(<></>)
                }
              </ProductLogo>
              <div className="first_description">
                <div
                  dangerouslySetInnerHTML={{
                    __html: product.short_description,
                  }}
                />
              </div>
              {isVariable &&
              <VariationProducts>
                <h2>{ChooseVariation}</h2>
                <p>
                  {router.locale === "fr"
                    ? variations[0]?.attributes[0]?.name
                    : router.locale === "de"
                    ? switchAttributesToDE(variations[0]?.attributes[0]?.name)
                    : switchAttributesToEN(variations[0]?.attributes[0]?.name)}
                </p>
                <Variations>
                  <VariationButtons />
                </Variations>
                {selectedVariation.id && (
                  <>
                    <SelectedVariation>
                      <VariationImage>
                        <div>
                          <Image
                            src={selectedVariation.image.src}
                            layout="fill"
                            objectFit="contain"
                            alt={selectedVariation.image.name}
                          />
                        </div>
                      </VariationImage>
                      <div>
                        <h4>
                          {product.name}
                          {" - "}
                          {selectedVariation.attributes[0].option}
                        </h4>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: selectedVariation.description,
                          }}
                        />
                        <div className="price">
                        {selectedVariation.on_sale && <p>Promotion !</p>}
                          <div
                            className={
                              selectedVariation.on_sale ? "regular_price" : ""
                            }
                          >
                            {currency === "CHF"
                              ? !!selectedVariation.regular_price &&
                                selectedVariation.regular_price + " " + currency
                              : !!selectedVariation.euroRegularPrice &&
                                selectedVariation.euroRegularPrice +
                                  " " +
                                  currency}
                          </div>

                          <div className="sale_price">
                            {currency === "CHF"
                              ? !!selectedVariation.sale_price &&
                                selectedVariation.sale_price + " " + currency
                              : !!selectedVariation.sale_price &&
                                selectedVariation.euroPrice + " " + currency}
                          </div>
                        </div>
                        <StockStatuts
                          stock_quantity={selectedVariation.stock_quantity}
                          stock_status={selectedVariation.stock_status}
                        />
                      </div>
                    </SelectedVariation>
                  </>
                )}
              </VariationProducts>
              }
              <PriceQuantity>
                <input
                  type="number"
                  onChange={handleChangeQty}
                  value={productQty}
                  placeholder="1"
                />
                {isVariable ? (
selectedVariation.id ? (
  <Button
    type="button"
    onClick={() => handleAddToCart(product)}
  >
    {btnAddToCart}
  </Button>
) : (
  <Button
    type="button"
    onClick={() => Notiflix.Notify.warning("Choisissez une variation avant de l'ajouter au panier")}
    className="disabled"
  >
    {ChooseVariation}
  </Button>
)
                ):(
                  <Button
                  type="button"
                  onClick={() => handleAddToCart(product)}
                >
                  {btnAddToCart}
                </Button>
                )}
                
              </PriceQuantity>
              {!isVariable &&(
                <StockStatuts
                stock_quantity={product.stock_quantity}
                stock_status={product.stock_status}
                />
                )}
            </ProductDetaiil>
          </CardWrapper>
          <ProductInfos>
            <div className="bgcity">
              <div className="sectionTitle">
                <p>{InfoComplementaires}</p>
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
              <caption>{txtCaracteristiques}</caption>
              <tbody>
                {product.attributes.map((attribute) => {
                  return (
                    <tr key={attribute.id}>
                      <td>
                        {router.locale === "fr"
                          ? attribute.name
                          : router.locale === "de"
                          ? switchAttributesToDE(attribute.name)
                          : switchAttributesToEN(attribute.name)}
                      </td>
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

  const variations: IVariation[] = await getVariations(
    product.id,
    lang as string
  );
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
