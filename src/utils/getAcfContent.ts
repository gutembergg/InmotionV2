import { IProduct } from "../interfaces/IProducts";

export default function getAcfContent(product: IProduct, fieldName: string) {
  return product.meta_data?.find((i) => i.key === fieldName)?.value;
}
