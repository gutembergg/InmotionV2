import { IImage } from "./IImages";

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
    description_location:string,
    image_location:{
      ID: number;
      id: number;
      url: string;
      link: string;
      alt: string;
    };
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
      ID: number;
      id: number;
      url: string;
      link: string;
      alt: string;
    };
  };
}
