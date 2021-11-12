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
}
