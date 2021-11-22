import { IImage } from "./IImages";

export interface ICategories {
  id: number;
  name: string;
  slug: string;
  parent?: number;
  description?: string;
  display?: string;
  image: IImage;
  menu_order: number;
  count?: number;
  _links?: {
    self: [
      {
        href: string;
      }
    ];
    collection: [
      {
        href: string;
      }
    ];
    up: [
      {
        href: string;
      }
    ];
  };
  yoast_head_json: {
    canonical: string;
    og_locale: string;
    og_site_name: string;
    og_title: string;
    og_type: string;
    og_url: string;
    twitter_card: string;
  };
}
