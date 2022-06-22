import { GetStaticProps } from "next";
import React, { ReactElement, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import HeaderSeo from "../../../../components/HeaderSeo";
import { ICategories } from "../../../../interfaces/ICategories";
import {
  wc_getCategoriesBySlug,
  wc_getSub_categories,
} from "../../../../services/woocommerceApi/Categories";
import { Container, MainContent } from "../../../../styles/Boutique";
import { Wrapper } from "../../../../styles/PiecesDetacheeIndex";
import useTranslation from "next-translate/useTranslation";
import LayoutB2B from "../../../../Layout/LayoutB2B";
import { User } from "../../../../interfaces/User";
import useUser from "../../../../hooks/useUser";
import Notiflix from "notiflix";
import router from "next/router";
import { getUserById } from "../../../../services/wordpressApi/users";

interface IProps {
  subCategories: ICategories[];
  category: ICategories;
}

export default function PiecesDetacheesB2B({
  subCategories,
  category,
}: IProps) {
  const { t } = useTranslation();
  const titleDetachedPieces = t("equipmentsPage:titledtachedPieces");
  const [mounted, setMounted] = useState(false);

  const { user } = useUser();

  //--------------B2B ROUTING VERIFICATION-----------------
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
    //if NO ACCOUNT
    if (Object.keys(user).length === 0) {
      Notiflix.Report.failure(
        "Erreure",
        "Vous devez posséder un compte b2b pour accéder a cette section",
        "Ok",
        function cb() {
          handleStart();
          router.push("/inmotion-mobility").then((res) => handleStop());
        }
      );
    }
    //if NO VALID B2B account
    else if (
      user.profile.wcb2b_group === "0" ||
      user.profile.wcb2b_group === ""
    ) {
      Notiflix.Report.failure(
        "Erreure",
        "Vous devez posséder un compte b2b pour accéder a cette section",
        "Ok",
        function cb() {
          handleStart();
          router.push("/inmotion-mobility").then((res) => handleStop());
        }
      );
    }
    //if NO ACTIVATED B2B account
    else if (
      user.profile.wcb2b_status === "0" ||
      user.profile.wcb2b_status === ""
    ) {
      Notiflix.Report.warning(
        "Validation Requise",
        "Votre compte est actuelement en vérification, vous pouvez nous contacter si cela est urgent pour valider votre compte",
        "Ok",
        function cb() {
          handleStart();
          router.push("/inmotion-mobility").then((res) => handleStop());
        }
      );
    } else {
      setMounted(true);
    }
  }, [user]);

  return (
    mounted && (
      <>
        <HeaderSeo
          description={category.yoast_head_json.og_title}
          title={category.yoast_head_json.og_title}
          canonical={`https://inmotion-suisse.ch/inmotion-mobility/b2b/pieces-detachees`}
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
                    <Link href={`/inmotion-mobility/b2b/${category.slug}`}>
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
    )
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

PiecesDetacheesB2B.getLayout = function getLayout(page: ReactElement) {
  return <LayoutB2B>{page}</LayoutB2B>;
};
