import Image from "next/image";
import Link from "next/dist/client/link";
import React, { ReactElement, useEffect, useState } from "react";
import LayoutMobility from "../../Layout/LayoutMobility";
import useTranslation from "next-translate/useTranslation";
import { motion } from "framer-motion";
import imageSecurity from "../../../public/images/homeMobility/trott2.webp";
import imageLocation from "../../../public/images/homeMobility/trott1.webp";
import imageHelp from "../../../public/images/homeMobility/contactUs.webp";
import SliderMobility from "../../components/Sliders/SliderMobility";
import {
  getFeaturedProduct,
  getOnSaleProducts,
} from "../../services/woocommerceApi/Products";
import { GetStaticProps } from "next";
import { IProduct } from "../../interfaces/IProducts";
import CarouselSwiper from "../../components/Sliders/Carousel";
import { addEuroPriceInProducts } from "../../utils/addEuroPriceInProducts";
import { IWPPage } from "../../interfaces/IWPPage";
import { getSliderHome } from "../../services/wordpressApi/sliderHome";

import {
  Container,
  MainContent,
  MobilitySlider,
  PromotedProducts,
  NewProducts,
  RentalSection,
  PromotedSection,
  HelpSection,
} from "../../styles/MobilityIndex";
import HeaderSeo from "../../components/HeaderSeo";

interface Props {
  featuredProducts: IProduct[];
  onSaleProducts: IProduct[];
  sliderHome: IWPPage[];
}

export default function Home({
  featuredProducts,
  onSaleProducts,
  sliderHome,
}: Props) {
  //translation
  const { t } = useTranslation();
  const PromotedProductTitle = t("home:PromotedProductTitle");
  const TitlePromotedSection = t("home:TitlePromotedSection");
  const TextPromotedSection = t("home:TextPromotedSection");
  const LinkTxtPromotedSection = t("home:LinkTxtPromotedSection");
  const locationTitle = t("home:locationTitle");
  const locationTxt = t("home:locationTxt");
  const LocationLink = t("home:locationLink");
  const NewProductTitle = t("home:NewProductTitle");
  const contactTitle = t("home:contactTitle");
  const contactTxt = t("home:contactTxt");
  const contactLink = t("home:contactLink");

  const [featuredproducts, _setfeaturedproducts] =
    useState<IProduct[]>(featuredProducts);
  const [onSaleProduct, _setOnSaleproduct] =
    useState<IProduct[]>(onSaleProducts);

  useEffect(() => {
    _setfeaturedproducts(featuredProducts);
  }, [featuredProducts]);

  useEffect(() => {
    _setOnSaleproduct(onSaleProducts);
  }, [onSaleProducts]);

  return (
    <>
      <HeaderSeo
        description={
          "Spécialiste en Trottinettes électrique, vélos électriques et gyroroue. Location de véhicules flexible. Cours gyroroue."
        }
        title={"Inmotion-suisse, vélos électriques, trottinettes, gyroroues"}
        canonical={"https://inmotion-suisse.ch/inmotion-mobility/"}
        og_locale={"fr_FR"}
        og_title={"article"}
      />

      <Container>
        <MainContent>
          <MobilitySlider>
            <SliderMobility slider={sliderHome} />
          </MobilitySlider>
          <PromotedProducts>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: {
                  scale: 0.8,
                  opacity: 0,
                },
                visible: {
                  scale: 1,
                  opacity: 1,
                  transition: {
                    delay: 0.4,
                  },
                },
              }}
            >
              <h1 className="squared">{PromotedProductTitle}</h1>
            </motion.div>
            <CarouselSwiper products={featuredproducts} />
          </PromotedProducts>
          <PromotedSection>
            <motion.div
              className="clipPathShadow"
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="promotedSectionImage">
                <Image
                  src={imageSecurity}
                  alt="protection rour trottinette,vélo et gyroroues "
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            </motion.div>
            <motion.div
              className="content"
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h1>{TitlePromotedSection}</h1>
              <p>{TextPromotedSection}</p>
              <Link href="/inmotion-mobility/categories/equipements">
                <motion.a
                  initial={{ background: "#0570A6" }}
                  whileHover={{
                    scale: 1.02,
                    transition: { duration: 0.01 },
                    background: "#03486b",
                  }}
                  style={{ originX: 0.5 }}
                  whileTap={{ scale: 0.88, transition: { duration: 0.01 } }}
                >
                  {LinkTxtPromotedSection}
                </motion.a>
              </Link>
            </motion.div>
          </PromotedSection>
          {onSaleProduct[0].image ? (
            <NewProducts>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  hidden: {
                    scale: 0.8,
                    opacity: 0,
                  },
                  visible: {
                    scale: 1,
                    opacity: 1,
                    transition: {
                      delay: 0.4,
                    },
                  },
                }}
              >
                <h1 className="squared">{NewProductTitle}</h1>
              </motion.div>
              <CarouselSwiper products={onSaleProduct} />
            </NewProducts>
          ) : (
            <div>
              <br />
              <br />
              <br />
            </div>
          )}

          <RentalSection>
            <motion.div
              className="content"
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h1>{locationTitle}</h1>
              <p>{locationTxt}</p>
              <Link href="/inmotion-mobility/services/location">
                <motion.a
                  initial={{ background: "#0570A6" }}
                  whileHover={{
                    scale: 1.02,
                    transition: { duration: 0.01 },
                    background: "#03486b",
                  }}
                  style={{ originX: 0.5 }}
                  whileTap={{ scale: 0.88, transition: { duration: 0.01 } }}
                >
                  {LocationLink}
                </motion.a>
              </Link>
            </motion.div>
            <motion.div
              className="rentalImg"
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Image
                src={imageLocation}
                alt="location de trottinettes,vélos et gyroroues "
                layout="fill"
                objectFit="cover"
              />
            </motion.div>
          </RentalSection>
          <HelpSection>
            <div className="content">
              <h1 className="squared">{contactTitle}</h1>
              <p>{contactTxt}</p>
              <Link href="/inmotion-mobility/contact">
                <motion.a
                  initial={{ background: "#0570A6" }}
                  whileHover={{
                    scale: 1.02,
                    transition: { duration: 0.01 },
                    background: "#03486b",
                  }}
                  style={{ originX: 0.5 }}
                  whileTap={{ scale: 0.88, transition: { duration: 0.01 } }}
                >
                  {contactLink}
                </motion.a>
              </Link>
            </div>
            <div className="helpImg">
              <Image
                src={imageHelp}
                alt="contact inmotion, service et conseils de professionels "
                width="280"
                height="412"
              />
            </div>
          </HelpSection>
        </MainContent>
      </Container>
    </>
  );
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <LayoutMobility>{page}</LayoutMobility>;
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const lang = ctx.locale;

  const _sliderHome = await getSliderHome(lang as string);

  const featuredproducts = await getFeaturedProduct(lang as string);
  const featuredproductsWithEuroPrice = await addEuroPriceInProducts(
    featuredproducts
  );

  const onSaleProducts = await getOnSaleProducts(lang as string);
  const onSaleProductsWithEuroPrice = await addEuroPriceInProducts(
    onSaleProducts
  );

  return {
    props: {
      featuredProducts: featuredproductsWithEuroPrice,
      onSaleProducts: onSaleProductsWithEuroPrice,
      sliderHome: _sliderHome,
    },
    revalidate: 60 * 2,
  };
};
