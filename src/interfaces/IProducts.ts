import { IImage } from "./IImages";
import { IVariation } from "./IVariation";

export interface ProductCategory {
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
  date_de_sortie: string;
  choixvideoImage: string;
  description_du_produit: AcfDescriptionProduct[];
  marque_du_produit: string;
  modele_du_produit: string;
  precommande: boolean;
  video_youtube_en_avant: string;
  variation_minimal_price: string;
}

export interface IProduct {
  dimensions: {
    height: string;
    width: string;
    length: string;
  };
  id: number;
  name: string;
  images: IImage[];
  image: IImage;
  price: string;
  euroPrice: number;
  regular_price: string;
  related_ids: string[];
  euroRegularPrice: number;
  sale_price: string;
  status: string;
  on_sale: boolean;
  title: string;
  description?: string;
  slug: string;
  qty: number;
  categories: ProductCategory[];
  catalog_visibility: string;
  stock_quantity?: number;
  stock_status?: string;
  lang: string;
  cross_sell_ids: string[];
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
  variations: number[];
  isVariation?: boolean;
  selectedVariations: IVariation[];
  subtotal_tax: string;
  weight: string;
  short_description: string;
  isAcfDescription?: boolean;
  wcb2b_barcode: string[];
  wcb2b_group_prices: IGroupPrice[];
  wcb2b_group_tier_prices: string[];
  wcb2b_max_quantity: string[];
  wcb2b_min_quantity: string[];
  wcb2b_package_quantity: string[];
}

export interface ProductWithVariations {
  product: IProduct;
  variations: IVariation[];
}
export interface IGroupPrice {
  regular_price: string;
  sale_price: string;
}
