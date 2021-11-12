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
  regular_price: string;
  sale_price: string;
  on_sale: boolean;
  description?: string;
  slug: string;
  qty: number;
  categories: ProductCategory[];
  catalog_visibility: string;
  stock_quantity?: number;
  stock_status?: string;
  meta_data: IProductMetaData[];
  yoast_head?: string;
  upsell_ids: number[];
  attributes: IProductAttributes[];
  sku: string;
  acf: Acf;
  variations?: IVariation[];
}

export interface ProductWithVariations {
  product: IProduct;
  variations: IVariation[];
}
