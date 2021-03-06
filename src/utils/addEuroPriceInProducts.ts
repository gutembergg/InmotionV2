import { IProduct } from "../interfaces/IProducts";
import { getRatesChange } from "../services/wordpressApi/ratesChange";

export const addEuroPriceInProducts = async (products: IProduct[]) => {
  const currentyRate = await getRatesChange();

  const productsWithEuroDevise = products.reduce(
    (acc, product) => {
      let productsList = [];
      const priceWithoutTVA = Number(product.price) / 1.077;
      const regularPriceWithoutTVA = Number(product.regular_price) / 1.077;

      const euroPriceNotFormated = priceWithoutTVA * currentyRate;
      const euroPriceString = euroPriceNotFormated.toFixed(2);
      const euroPrice = Number(euroPriceString);

      const euroRegulerPriceNotFormated = regularPriceWithoutTVA * currentyRate;
      const euroRegularPriceString = euroRegulerPriceNotFormated.toFixed(2);
      const euroRegularPrice = Number(euroRegularPriceString);

      productsList.push({ ...product, euroPrice, euroRegularPrice });
      const _productsList = [...acc, ...productsList];

      const productObjectFiltered = _productsList.filter(
        (prod) => Object.keys(prod).length > 0 && prod
      );

      return productObjectFiltered;
    },
    [{} as IProduct]
  );

  return productsWithEuroDevise;
};

export const addEuroPriceInSingleProduct = async (product: IProduct) => {
  const currentyRate = await getRatesChange();

  const priceWithoutTVA = Number(product.price) / 1.077;
  const regularPriceWithoutTVA = Number(product.regular_price) / 1.077;

  const euroPriceNotFormated = priceWithoutTVA * currentyRate;
  const euroPriceString = euroPriceNotFormated.toFixed(2);
  const euroPrice = Number(euroPriceString);

  const euroRegulerPriceNotFormated = regularPriceWithoutTVA * currentyRate;
  const euroRegularPriceString = euroRegulerPriceNotFormated.toFixed(2);
  const euroRegularPrice = Number(euroRegularPriceString);

  const productWithEuro = { ...product, euroPrice, euroRegularPrice };

  return productWithEuro;
};

export const convertSingleNumber = async (valueCHF: number) => {
  const currentyRate = await getRatesChange();
  const valueEUR = valueCHF * currentyRate;
  const fixedValue = valueEUR.toFixed(2);
  const result = Number(fixedValue);

  return result;
};
