interface Image {
  id: number;
  src: string;
  name: string;
}

export interface IVariation {
  id: number;
  description: string;
  permalink: string;
  sku: string;
  price: string;
  regular_price: string;
  euroPrice: number;
  euroRegularPrice: number;
  sale_price: string;
  on_sale: boolean;
  status: string;
  purchasable: boolean;
  virtual: boolean;
  tax_status: string;
  tax_class: string;
  stock_quantity: number;
  stock_status: string;
  weight: string;
  dimensions: {
    length: string;
    width: string;
    height: string;
  };
  image: Image;
  attributes: [
    {
      id: number;
      name: string;
      option: string;
    }
  ];
}
