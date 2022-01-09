import { GetStaticProps } from "next";
import React, { ReactElement } from "react";
import confidentialiteIcon from "../../../../../public/images/icons/confidentialite.svg";
import { ICategories } from "../../../../interfaces/ICategories";
import LayoutMobility from "../../../../Layout/LayoutMobility";
import { wc_getCategoriesBySlug, wc_getSub_categories } from "../../../../services/woocommerceApi/Categories";
import Image from "next/image";
import Link from "next/link";
import { Container, MainContent } from "../../../../styles/Boutique";
interface IProps {
    subCategories: ICategories[];
  }

export default function PiecesDetachees({ subCategories }: IProps) {
    console.log(subCategories)
    return (
        <Container>
            <h1>Catégorie Pièces détachées</h1>
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
      );
}

export const getStaticProps: GetStaticProps = async (ctx) => {
    const slug = "pieces-detachees-mobility"
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
      },
      revalidate: 60,
    };
  };
  

  PiecesDetachees.getLayout = function getLayout(page: ReactElement) {
  return <LayoutMobility icon={confidentialiteIcon}>{page}</LayoutMobility>;
};
