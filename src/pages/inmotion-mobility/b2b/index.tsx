import React, { ReactElement, useEffect, useState } from "react";
import useTranslation from "next-translate/useTranslation";
import { GetStaticProps } from "next";
import Notiflix from "notiflix";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
//functions
import { wc_getSub_categories } from "../../../services/woocommerceApi/Categories";
import { getUserById } from "../../../services/wordpressApi/users";
import useUser from "../../../hooks/useUser";
//Components
import HeaderSeo from "../../../components/HeaderSeo";
//layout
import LayoutB2B from "../../../Layout/LayoutB2B";
//Styles
import { B2BAccueil, Container, MainContent } from "../../../styles/B2BHome";
//imgs
import b2bLogo from "../../../../public/images/b2bLogo.png";
//interfaces
import { ICategories } from "../../../interfaces/ICategories";
import { User } from "../../../interfaces/User";
interface Props {
  mainCategories: ICategories[];
}

export default function B2BHome({ mainCategories }: Props) {
  //translations
  const { t } = useTranslation();
  const welcomeTXT = t("b2b:welcome");
  const router = useRouter();
  const { user, logout } = useUser();
  const [currentyUser, setCurrentyUser] = useState<User>({} as User);
  const [mounted, setMounted] = useState(false);

  console.log(user);

  //B2B ROUTING VERIFICATION
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
      getUserById(user.profile.id).then((_user) => setCurrentyUser(_user));
    }
  }, [user, router]);

  return (
    mounted && (
      <>
        <HeaderSeo
          description={
            "Inmotion B2B, pour les entreprises. Spécialiste en Trottinettes électrique, vélos électriques et gyroroue. Location de véhicules flexible. Cours gyroroue."
          }
          title={
            "Inmotion-suisse B2B, vélos électriques, trottinettes, gyroroues"
          }
          canonical={"https://inmotion-suisse.ch/inmotion-mobility/b2b"}
          og_locale={"fr_FR"}
          og_title={"article"}
        />

        <Container>
          <B2BAccueil>
            <div className="logoBox">
              <Image
                src={b2bLogo.src}
                alt="Inmotion B2B"
                layout="fill"
                objectFit="contain"
                placeholder="blur"
                sizes="10vw"
                blurDataURL={b2bLogo.src}
              />
            </div>
            {currentyUser.first_name && (
              <h1>
                {welcomeTXT} {currentyUser.first_name}
              </h1>
            )}
          </B2BAccueil>
          <MainContent>
            {mainCategories.map((category) => {
              return (
                <div key={category.id} className="catItem">
                  <Link
                    href={
                      category.slug === "pieces-detachees-mobility" ||
                      category.slug === "detached-pieces-3" ||
                      category.slug === "abgeloeste-teile"
                        ? `/inmotion-mobility/b2b/pieces-detachees`
                        : category.slug === "equipements" ||
                          category.slug === "equipments" ||
                          category.slug === "ausruestungen"
                        ? `/inmotion-mobility/b2b/equipements`
                        : `/inmotion-mobility/b2b/${category.slug}`
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
    )
  );
}

B2BHome.getLayout = function getLayout(page: ReactElement) {
  return <LayoutB2B>{page}</LayoutB2B>;
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const lang = ctx.locale;
  const subCategories = await wc_getSub_categories(lang as string, 80);

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
    props: { mainCategories },
    revalidate: 60 * 2,
  };
};
