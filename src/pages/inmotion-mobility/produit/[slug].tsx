import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Image from "next/image";
import React, { ChangeEvent, ReactElement, useCallback, useState } from "react";
import ReactPlayer from "react-player";

import HouseIcon from "../../../../public/images/icons/house.svg";
import getAcfContent from "../../../utils/getAcfContent";
import useCart from "../../../hooks/useCart";
import { IProduct } from "../../../interfaces/IProducts";
import { wc_getProductBySlug } from "../../../services/woocommerceApi/Products";
import placeholder from "../../../../public/images/placeholder_woocommerce.png";
import ButtonSkew from "../../../components/ButtonSkew";

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
  Section,
} from "../../../styles/ProductDetail";
import useTranslation from "next-translate/useTranslation";
import LayoutMobility from "../../../Layout/LayoutMobility";

interface Props {
  product: IProduct;
}

export default function ProductDetail({ product }: Props) {
  const { cartItem, addToCart } = useCart();

  // Traductions texts ///////////////////////////////////
  const { t } = useTranslation();
  const btnAddToCart = t("productDetail:addToCart");

  const [productQty, setProductQty] = useState(1);

  const videoUrl = product.meta_data?.filter((meta) => {
    if (meta.key === "video_youtube_en_avant") {
      const url = meta.value;

      return url;
    }
  });

  const handleAddToCart = useCallback(
    (product: IProduct) => {
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
    },
    [addToCart, cartItem, productQty]
  );

  const handleChangeQty = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const quantity = parseInt(e.target.value, 10);
    setProductQty(quantity);
  }, []);

  return (
    <>
      {/*   <CurvedBackground>
        <LayoutMobility icon={HouseIcon} yoast_head={product.yoast_head}> */}
      <Container>
        <Main>
          <CardWrapper>
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
                    />

                    {product.on_sale && (
                      <span>
                        <ButtonSkew text="Promotion!" />
                      </span>
                    )}
                  </span>
                </ImageBlock>

                <PriceQuantity>
                  <div className="price">{product.price}</div>

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

            <DescriptionProduct>
              <Sections>
                {product.acf.hasOwnProperty("description_du_produit") &&
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
                  })}
              </Sections>
            </DescriptionProduct>
          </ProductInfos>
        </Main>
      </Container>
    </>
  );
}

ProductDetail.getLayout = function getLayout(page: ReactElement) {
  return <LayoutMobility icon={HouseIcon}>{page}</LayoutMobility>;
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const slug: any = ctx.params?.slug;
  const lang = ctx.locale;

  const _product = await wc_getProductBySlug(slug as string, lang as string);

  if (!_product) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      product: _product,
    },
    revalidate: 60 * 10, // 10min
  };
};
