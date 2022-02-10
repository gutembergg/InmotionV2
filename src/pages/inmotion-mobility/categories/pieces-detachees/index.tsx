import { GetStaticProps } from "next";
import React, { ReactElement } from "react";
import Image from "next/image";
import Link from "next/link";
import confidentialiteIcon from "../../../../../public/images/icons/confidentialite.svg";
import HeaderSeo from "../../../../components/HeaderSeo";
import { ICategories } from "../../../../interfaces/ICategories";
import LayoutMobility from "../../../../Layout/LayoutMobility";
import {
  wc_getCategoriesBySlug,
  wc_getSub_categories,
} from "../../../../services/woocommerceApi/Categories";
import { Container, MainContent } from "../../../../styles/Boutique";
import { Wrapper } from "../../../../styles/PiecesDetacheeIndex";
import useTranslation from "next-translate/useTranslation";

interface IProps {
  subCategories: ICategories[];
  category: ICategories;
}

export default function PiecesDetachees({ subCategories, category }: IProps) {
  const { t } = useTranslation();
  const titleDetachedPieces = t("equipmentsPage:titledtachedPieces");
  return (
    <>
      <HeaderSeo
        description={category.yoast_head_json.og_title}
        title={category.yoast_head_json.og_title}
        canonical={category.yoast_head_json.canonical}
        og_locale={category.yoast_head_json.og_locale}
        og_title={category.yoast_head_json.og_title}
      />

      <Wrapper>
        <Container>
          <h1>{titleDetachedPieces}</h1>
          <MainContent>
            {subCategories.map((category) => {
              return (
                <div key={category.id} className="catItem">
                  <Link
                    href={`/inmotion-mobility/categories/pieces-detachees/${category.slug}`}
                  >
                    <a className="link">
                      <div className="category_card">
                        <div className="care_blue_hover"></div>
                        {category.image?.src && (
                          <div className="imgBox">
                            <Image
                              src={category.image?.src}
                              alt={category.name}
                              width={300}
                              height={300}
                              placeholder="blur"
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
      </Wrapper>
    </>
  );
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const slug = "pieces-detachees-mobility";
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

  return {
    props: {
      subCategories: subCategories,
      category,
    },
    revalidate: 60,
  };
};

PiecesDetachees.getLayout = function getLayout(page: ReactElement) {
  return <LayoutMobility>{page}</LayoutMobility>;
};
