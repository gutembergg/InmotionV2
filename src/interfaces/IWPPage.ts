export interface IWPPage {
  id: number;
  date: string;
  date_gmt: string;
  guid: {
    rendered: string;
  };
  modified: string;
  modified_gmt: string;
  slug: string;
  status: string;
  type: string;
  link: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
    protected: boolean;
  };
  template: string;
  meta: {
    inline_featured_image: boolean;
  };
  acf: {
    description: string,
  lien: string,
  texte_du_lien: string,
    fichiers?: [
      {
        fichier: {
          ID: number;
          id: number;
          title: string;
          filename: string;
          filesize: number;
          url: string;
          link: string;
          alt: string;
          author: string;
          description: string;
          caption: string;
          name: string;
          status: string;
          uploaded_to: number;
          date: string;
          modified: string;
          menu_order: number;
          mime_type: string;
          type: string;
          subtype: string;
          icon: string;
          width: number;
          height: number;
        };
        nom_du_fichier: string;
      }
    ];
    image?: {
      ID: 69;
      id: 69;
      url: "https://dx7l6anesh.preview.infomaniak.website/wp-content/uploads/2021/09/Groupe_87-removebg-preview.png";
      link: "https://dx7l6anesh.preview.infomaniak.website/guides_utilisateurs/montage-l9/groupe_87-removebg-preview/";
      alt: "";
    };
  };
}
