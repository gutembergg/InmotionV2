import { IImage } from "./IImages";
import { IVariation } from "./IVariation";

interface ProductCategory {
  id: number;
  name: string;
  slug: string;
}

interface IProductMetaData {
  id: number;
  key: string;
  value: string | Array<string>;
}

interface IProductAttributes {
  id: number;
  name: string;
  options: string[];
  position: number;
  variation: boolean;
  visible: boolean;
}

interface AcfDescriptionProduct {
  description_section: string;
  image_de_la_section: string;
  titre_section: string;
}

interface Acf {
  choixvideoImage: string;
  description_du_produit: AcfDescriptionProduct[];
  marque_du_produit: string;
  modele_du_produit: string;
  precommande: boolean;
  video_youtube_en_avant: string;
}

export interface IProduct {
  id: number;
  name: string;
  images: IImage[];
  price: string;
  euroPrice: number;
  regular_price: string;
  euroRegularPrice: number;
  sale_price: string;
  on_sale: boolean;
  description?: string;
  slug: string;
  qty: number;
  categories: ProductCategory[];
  catalog_visibility: string;
  stock_quantity?: number;
  stock_status?: string;
  lang: string;
  meta_data: IProductMetaData[];
  yoast_head?: string;
  yoast_head_json: {
    canonical: string;
    og_locale: string;
    og_site_name: string;
    og_title: string;
    og_type: string;
    og_url: string;
    twitter_card: string;
    og_image: [
      {
        width: number;
        height: number;
        url: string;
        type: string;
      }
    ];
  };
  upsell_ids: number[];
  attributes: IProductAttributes[];
  sku: string;
  acf: Acf;
  variations: IVariation[];
  subtotal_tax: string;
  weight: string;
}

export interface ProductWithVariations {
  product: IProduct;
  variations: IVariation[];
}
