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
            whileInView={{ opacity: 1 , x:0}}
            transition={{ duration: 0.5, delay: 0.2}}
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
          <motion.div className="content"             
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1 , x:0}}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            >
            <h1>{TitlePromotedSection}</h1>
            <p>{TextPromotedSection}</p>
            <Link href="/inmotion-mobility/categories/equipements">
              <a>{LinkTxtPromotedSection}</a>
            </Link>
          </motion.div>
        </PromotedSection>
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
        <RentalSection>
          <motion.div
          className="content"
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1 , x:0}}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          >
            <h1>{locationTitle}</h1>
            <p>{locationTxt}</p>
            <Link href="/inmotion-mobility/services/location">
              <a>{LocationLink}</a>
            </Link>
          </motion.div>
          <motion.div 
          className="rentalImg"
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1 , x:0}}
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
              <a>{contactLink}</a>
            </Link>
          </div>
          <div className="helpImg">
            <Image
              src={imageHelp}
              alt="contact inmotion, service et conseils de professionels "
              layout="fill"
              objectFit="contain"
            />
          </div>
        </HelpSection>
      </MainContent>
    </Container>
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
