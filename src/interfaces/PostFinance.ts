export interface PostFinanceLineItems {
  name: string;
  uniqueId: string;
  sku: string;
  quantity: number;
  amountIncludingTax: number;
}

export interface PostFinancePaymentMethods {
  dataCollectionType: string;
  id: number;
  imageResourcePath: { id: 1310; path: string; state: string; version: number };
  linkedSpaceId: number;
  name: string;
  oneClickPaymentMode: string;
  paymentMethod: number;
  resolvedDescription: {
    deDE: string;
    enUS: string;
    frFR: string;
    itIT: string;
  };
  resolvedImageUrl: string;
  sortOrder: number;
  spaceId: number;
  state: string;
  version: number;
}
