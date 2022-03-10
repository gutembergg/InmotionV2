import React, { ReactElement } from "react";
import {
  Container,
  GuidItem,
  MainContent,
} from "../../../../styles/guidesUser";
import LayoutMobility from "../../../../Layout/LayoutMobility";
import useTranslation from "next-translate/useTranslation";
import { GetStaticProps } from "next";
import { getUserGuides } from "../../../../services/wordpressApi/userGuides";
import Image from "next/image";
import Link from "next/link";
import { IWPPage } from "../../../../interfaces/IWPPage";
import {useRouter} from "next/router";
import HeaderSeo from "../../../../components/HeaderSeo";
interface Props {
  guides: IWPPage[];
}
export default function GuidesUtilisateur({ guides }: Props) {
  const { t } = useTranslation();
  const Title = t("guide-user:Title");
  const router = useRouter();
  
  return (
    <>
     <HeaderSeo
    description="inmotion.suisse condition générales de ventes en détail"
    title="Guides utilisateurs - Inmotion-suisse.ch"
    canonical={`https://inmotion-suisse.ch/services/guides-utilisateur`}
    og_locale={router.locale ||""}
    og_title="condition générales de ventes"
    />
    <Container>
      <MainContent>
        <h1>{Title}</h1>
        <ul>
          {guides.length > 0 &&
            guides.map((guide, index) => {
              return (
                <GuidItem key={index}>
                  <div className="imgBox">
                    {guide.acf.image && (
                      <Image
                      src={guide.acf.image.url}
                      alt="acf-images"
                      layout="fill"
                      objectFit="contain"
                      />
                      )}
                  </div>
                  <h2>{guide.title.rendered}</h2>
                  <ul>
                    {guide?.acf?.fichiers?.map((_fichier) => {
                      return (
                        <li key={_fichier.fichier.ID}>
                          <Link href={_fichier.fichier.url}>
                            <a target="_blank" download>
                              <div>{_fichier.nom_du_fichier}</div>
                            </a>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </GuidItem>
              );
            })}
        </ul>
      </MainContent>
    </Container>
</>
  );
}

GuidesUtilisateur.getLayout = function getLayout(page: ReactElement) {
  return <LayoutMobility>{page}</LayoutMobility>;
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const lang = ctx.locale;
  const guides = await getUserGuides(lang as string);
  
  return {
    props: {
      guides,
    },
    revalidate: 60,
  };
};
