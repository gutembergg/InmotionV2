import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import React, { ReactElement } from "react";
import useTranslation from "next-translate/useTranslation";

import {
  wc_getCategoriesBySlug,
  wc_getSub_categories,
} from "../../services/woocommerceApi/Categories";
import { ICategories } from "../../interfaces/ICategories";
import LayoutMobility from "../../Layout/LayoutMobility";
import HeaderSeo from "../../components/HeaderSeo";

import { Container, MainContent } from "../../styles/Boutique";

interface IProps {
  subCategories: ICategories[];
  category: ICategories;
}

export default function MobiliteEletrique({ subCategories, category }: IProps) {
  //translation
  const { t } = useTranslation();
  const shopTitle = t("common:shopTitle");

  return (
    <>
      <HeaderSeo
        description={category.yoast_head_json.og_title}
        title={category.yoast_head_json.og_title}
        canonical={category.yoast_head_json.canonical}
        og_locale={category.yoast_head_json.og_locale}
        og_title={category.yoast_head_json.og_title}
      />
      <Container>
        <h1>{shopTitle}</h1>
        <MainContent>
          {subCategories.map((category) => {
            return (
              <div key={category.id} className="catItem">
                <Link
                  href={
                    category.slug === "pieces-detachees-mobility" ||
                    category.slug === "detached-pieces-3" ||
                    category.slug === "abgeloeste-teile"
                      ? `/inmotion-mobility/categories/pieces-detachees`
                      : category.slug === "equipements" ||
                        category.slug === "equipments" ||
                        category.slug === "ausruestungen"
                      ? `/inmotion-mobility/categories/equipements`
                      : `/inmotion-mobility/categories/${category.slug}`
                  }
                >
                  <a className="link">
                    <div className="category_card">
                      <div className="care_blue_hover"></div>
                      {category.image?.src && (
                        <div className="imgBox">
                          <Image
                            src={category.image?.src}
                            alt={category.name}
                            layout="fill"
                            objectFit="contain"
                            placeholder="blur"
                            sizes="30vw"
                            blurDataURL={category.image?.src}
                          />
                        </div>
                      )}
                      <div className="category_name">{category.name}</div>
                    </div>
                  </a>
                </Link>
              </div>
            );
          })}
        </MainContent>
      </Container>
    </>
  );
}

MobiliteEletrique.getLayout = function getLayout(page: ReactElement) {
  return <LayoutMobility>{page}</LayoutMobility>;
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: { slug: "boutique" }, locale: "en" },
      { params: { slug: "boutique" }, locale: "fr" },
      { params: { slug: "boutique" }, locale: "de" },
    ],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const slug: any = ctx.params?.slug;
  const lang = ctx.locale;

  const category = await wc_getCategoriesBySlug(slug, lang as string);

  if (!category) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const subCategories = await wc_getSub_categories(lang as string, category.id);

  const mainCategories = subCategories.filter(
    (category: ICategories) =>
      category.slug !== "non-classe" &&
      category.slug !== "occasions" &&
      category.slug !== "occasions-en" &&
      category.slug !== "gelegenheiten"
  );

  mainCategories.sort((a: any, b: any) => {
    return a.menu_order - b.menu_order;
  });

  return {
    props: {
      subCategories: mainCategories,
      category,
    },
    revalidate: 60,
  };
};
