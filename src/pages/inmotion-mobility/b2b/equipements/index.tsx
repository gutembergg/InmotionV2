import { GetStaticProps } from "next";
import React, { ReactElement } from "react";
import useTranslation from "next-translate/useTranslation";
import { ICategories } from "../../../../interfaces/ICategories";
import {
  wc_getCategoriesBySlug,
  wc_getSub_categories,
} from "../../../../services/woocommerceApi/Categories";
import Image from "next/image";
import Link from "next/link";
import { Container, MainContent } from "../../../../styles/Boutique";
import HeaderSeo from "../../../../components/HeaderSeo";
import LayoutB2B from "../../../../Layout/LayoutB2B";

interface IProps {
  subCategories: ICategories[];
  category: ICategories;
}

export default function EquipementsB2B({ subCategories, category }: IProps) {
  const { t } = useTranslation();
  const discoverOurEquipment = t("equipmentsPage:discoverOurEquipment");
  return (
    <>
      <HeaderSeo
        description={"Equipements mobility"}
        title={category.yoast_head_json.og_title}
        canonical={`https://inmotion-suisse.ch/inmotion-mobility/b2b/equipements`}
        og_locale={category.yoast_head_json.og_locale}
        og_title={category.yoast_head_json.og_title}
      />

      <Container>
        <h1>{discoverOurEquipment}</h1>
        <MainContent>
          {subCategories.map((category) => {
            return (
              <div key={category.id} className="catItem">
                <Link href={`/inmotion-mobility/b2b/${category.slug}`}>
                  <a className="link">
                    <div className="category_card">
                      <div className="care_blue_hover"></div>
                      {category.image?.src && (
                        <div className="imgBox">
                          <Image
                            src={category.image?.src}
                            alt={category.name}
                            objectFit="contain"
                            layout="fill"
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
    </>
  );
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const slug = "equipements";
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

EquipementsB2B.getLayout = function getLayout(page: ReactElement) {
  return <LayoutB2B>{page}</LayoutB2B>;
};
