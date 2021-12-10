import HomeIcon from "../../../public/images/icons/house.svg";
import useUser from "../../hooks/useUser";
import React, { ReactElement, useEffect, useState } from "react";
import LayoutMobility from "../../Layout/LayoutMobility";
import useTranslation from "next-translate/useTranslation";
import {
  Container,
  MainContent,
  MobilitySlider,
  PromotedProducts,
  NewProducts,
  RentalSection,
  PromotedSection,
  HelpSection,
  InfoSection,
} from "../../styles/MobilityIndex";
import Image from "next/dist/client/image";
import imageSecurity from "../../../public/images/homeMobility/trott2.jpg";
import imageLocation from "../../../public/images/homeMobility/trott1.jpg";
import imageHelp from "../../../public/images/homeMobility/contactUs.png";
import Link from "next/dist/client/link";
import SliderMobility from "../../components/Sliders/SliderMobility";
import { getFeaturedProduct, getOnSaleProducts } from "../../services/woocommerceApi/Products";
import { GetStaticProps } from "next";
import { IProduct } from "../../interfaces/IProducts";
import { ProductCard } from "../../styles/ProductDetail";

interface Props {
  featuredProducts: IProduct[];
  onSaleProducts: IProduct[];
}


export default function Home({featuredProducts, onSaleProducts }:Props) {
  const { user } = useUser();
  const [loged] = useState(false);

  //translation
  const { t } = useTranslation();
  const TXT_Welcome = t("home:mobilityWelcomeTitle");
  const slogan = t("home:slogan");
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
  const shopHours = t("home:shopHours");

  const [featuredproducts, _setfeaturedproducts] = useState<IProduct[]>(featuredProducts);
  const [onSaleProduct, _setOnSaleproduct] = useState<IProduct[]>(onSaleProducts);
console.log("featured productzs",featuredproducts)
console.log("onsale products",onSaleProducts)


  useEffect(() => {
    _setfeaturedproducts(featuredProducts);
  }, [featuredProducts]);

  useEffect(() => {
    _setOnSaleproduct(onSaleProduct);
  }, [onSaleProducts]);

  return (
    <Container>
      <MainContent>
        <div className="title">
          <h1>{TXT_Welcome}</h1>
          <p>{slogan}</p>
        </div>
        <MobilitySlider>
          <SliderMobility />
        </MobilitySlider>
        <PromotedProducts>
          <h1 className="squared">{PromotedProductTitle}</h1>
          {/* <ProductCard product={featuredproducts[0]} /> */}
          placer les produits mis en avant ici max 4
        </PromotedProducts>
        <PromotedSection>
          <div className="clipPathShadow">
            <div className="promotedSectionImage">
              <Image
                src={imageSecurity}
                alt="protection rour trottinette,vélo et gyroroues "
                layout="fill"
                objectFit="cover"
              />
            </div>
          </div>
          <div className="content">
            <h2>{TitlePromotedSection}</h2>
            <p>{TextPromotedSection}</p>
            <Link href="/inmotion-mobility/categorie_/equipements">
              <a>{LinkTxtPromotedSection}</a>
            </Link>
          </div>
        </PromotedSection>
        <NewProducts>
          <h1 className="squared">{NewProductTitle}</h1>
          placer les last products ici max 4
        </NewProducts>
        <RentalSection>
          <div className="content">
            <h2>{locationTitle}</h2>
            <p>{locationTxt}</p>
            <Link href="/">
              <a>{LocationLink}</a>
            </Link>
          </div>
          <div className="rentalImg">
            <Image
              src={imageLocation}
              alt="location de trottinettes,vélos et gyroroues "
              layout="fill"
              objectFit="cover"
            />
          </div>
        </RentalSection>
        <HelpSection>
          <div className="content">
            <h2 className="squared">{contactTitle}</h2>
            <p>{contactTxt}</p>
            <Link href="/">
              <a>{contactLink}</a>
            </Link>
          </div>
          <div className="helpImg">
            <Image
              src={imageHelp}
              alt="contact inmotion, service et conseils de professionels "
              height={408}
              width={612}
            />
          </div>
        </HelpSection>
        <InfoSection>
          <h2 className="squared">{shopHours}</h2>
        </InfoSection>
      </MainContent>
    </Container>
  );
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <LayoutMobility icon={HomeIcon}>{page}</LayoutMobility>;
};


export const getStaticProps: GetStaticProps = async (ctx) => {
  const lang = ctx.locale;

  const featuredproducts = await getFeaturedProduct(lang as string);
  const onSaleProducts = await getOnSaleProducts(lang as string);



  return {
    props: {
      featuredProducts: featuredproducts,
      onSaleProducts:onSaleProducts
    },
    revalidate: 60 * 2,
  };
};
