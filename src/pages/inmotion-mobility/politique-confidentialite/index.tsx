import { Container } from "../../../styles/politiqueConfident";
import { MainContent } from "../../../styles/politiqueConfident";
import React, { ReactElement } from "react";
import LayoutMobility from "../../../Layout/LayoutMobility";
import Link from "next/link";
import HeaderSeo from "../../../components/HeaderSeo";
import {useRouter} from "next/router";

export default function PolitiqueConfidentialite() {
  const router= useRouter();
  return (
    <>
    <HeaderSeo
    description="inmotion.suisse politique de confidentialité"
    title="politique de confidentialités"
    canonical={`https://inmotion-suisse.ch/inmotion-mobility/politique-confidentialite`}
    og_locale={router.locale ||""}
    og_title="politique de confidentialité"
    />
    <Container>
      <MainContent>
        <h1>Politique de confidentialité</h1>
        <div className="section">

        <h2>Qui sommes-nous ?</h2>
        <p>
          L’adresse de notre site Web est :{" "}
          <Link href="https://www.inmotion-suisse.ch/">
            <a>https://www.inmotion-suisse.ch</a>
          </Link>
        </p>
        </div>
        <div className="section">

        <h2>Utilisation des données personnelles collectées</h2>
        <h3>Commentaires</h3>
        <p>
          Quand vous laissez un commentaire sur notre site web, les données
          inscrites dans le formulaire de commentaire, mais aussi votre adresse
          IP et l’agent utilisateur de votre navigateur sont collectés pour nous
          aider à la détection des commentaires indésirables.
        </p>
        <h3>Médias</h3>
        <p>
          Si vous êtes un utilisateur ou une utilisatrice enregistré·e et que
          vous téléversez des images sur le site web, nous vous conseillons
          d’éviter de téléverser des images contenant des données EXIF de
          coordonnées GPS. Les visiteurs de votre site web peuvent télécharger
          et extraire des données de localisation depuis ces images.
        </p>
        <h3>Formulaires de contact</h3>
        <h3>Cookies</h3>
        <p>
          Si vous avez un compte et que vous vous connectez sur ce site, un
          cookie temporaire sera créé afin de déterminer si votre navigateur
          accepte les cookies. Il ne contient pas de données personnelles et
          sera supprimé automatiquement à la fermeture de votre navigateur.
        </p>
        <p>
          Lorsque vous vous connecterez, nous mettrons en place un certain
          nombre de cookies pour enregistrer vos informations de connexion et
          vos préférences d’écran. La durée de vie d’un cookie de connexion est
          de deux jours, celle d’un cookie d’option d’écran est d’un an. Si vous
          cochez « Se souvenir de moi », votre cookie de connexion sera conservé
          pendant deux semaines. Si vous vous déconnectez de votre compte, le
          cookie de connexion sera effacé.
        </p>
        <p>
          En modifiant ou en publiant une publication, un cookie supplémentaire
          sera enregistré dans votre navigateur. Ce cookie ne comprend aucune
          donnée personnelle. Il indique simplement l’ID de la publication que
          vous venez de modifier. Il expire au bout d’un jour.
        </p>
        <h3>Contenu embarqué depuis d’autres sites</h3>
        <p>
          Les articles de ce site peuvent inclure des contenus intégrés (par
          exemple des vidéos, images, articles…). Le contenu intégré depuis
          d’autres sites se comporte de la même manière que si le visiteur se
          rendait sur cet autre site.
        </p>
        <p>
          Ces sites web pourraient collecter des données sur vous, utiliser des
          cookies, embarquer des outils de suivis tiers, suivre vos interactions
          avec ces contenus embarqués si vous disposez d’un compte connecté sur
          leur site web.
        </p>
        </div>
        <div className="section">

        <h2>Utilisation et transmission de vos données personnelles</h2>
        <h3>Durées de stockage de vos données</h3>
        <p>
          Si vous laissez un commentaire, le commentaire et ses métadonnées sont
          conservés indéfiniment. Cela permet de reconnaître et approuver
          automatiquement les commentaires suivants au lieu de les laisser dans
          la file de modération.
        </p>
        <p>
          Pour les utilisateurs et utilisatrices qui s’enregistrent sur notre
          site (si cela est possible), nous stockons également les données
          personnelles indiquées dans leur profil. Tous les utilisateurs et
          utilisatrices peuvent voir, modifier ou supprimer leurs informations
          personnelles à tout moment (à l’exception de leur nom
          d’utilisateur·ice). Les gestionnaires du site peuvent aussi voir et
          modifier ces informations.
        </p>
        <h3>Les droits que vous avez sur vos données</h3>
        <p>
          Si vous avez un compte ou si vous avez laissé des commentaires sur le
          site, vous pouvez demander à recevoir un fichier contenant toutes les
          données personnelles que nous possédons à votre sujet, incluant celles
          que vous nous avez fournies. Vous pouvez également demander la
          suppression des données personnelles vous concernant. Cela ne prend
          pas en compte les données stockées à des fins administratives, légales
          ou pour des raisons de sécurité.
        </p>

        <h3>Transmission de vos données personnelles</h3>
        <p>
          Les commentaires des visiteurs peuvent être vérifiés à l’aide d’un
          service automatisé de détection des commentaires indésirables.
        </p>
</div>
      </MainContent>
    </Container>
</>
  );
}

PolitiqueConfidentialite.getLayout = function getLayout(page: ReactElement) {
  return <LayoutMobility>{page}</LayoutMobility>;
};
