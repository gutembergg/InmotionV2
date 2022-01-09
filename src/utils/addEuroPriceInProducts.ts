import { IProduct } from "../interfaces/IProducts";
import { currencyRates } from "../services/currencyConvert/CurrencyRates";

const tva = 7.7;

export const addEuroPriceInProducts = async (products: IProduct[]) => {
  const ratesCurrency = await currencyRates();

  const productsWithEuroDevise = products.reduce(
    (acc, product) => {
      let productsList = [];
      const priceWithoutTVA = Number(product.price) / 1.077;
      const regularPriceWithoutTVA = Number(product.regular_price) / 1.077;

      const euroPriceNotFormated = priceWithoutTVA / ratesCurrency.rates.CHF;
      const euroPriceString = euroPriceNotFormated.toFixed(2);
      const euroPrice = Number(euroPriceString);

      const euroRegulerPriceNotFormated =
        regularPriceWithoutTVA / ratesCurrency.rates.CHF;
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
  const ratesCurrency = await currencyRates();

  const euroPriceNotFormated = Number(product.price) / ratesCurrency.rates.CHF;
  const euroPriceString = euroPriceNotFormated.toFixed(2);
  const euroPrice = Number(euroPriceString);

  const priceWithoutTVA = Number(product.price) / 1.077;

  const euroRegulerPriceNotFormated = priceWithoutTVA / ratesCurrency.rates.CHF;
  const euroRegularPriceString = euroRegulerPriceNotFormated.toFixed(2);
  const euroRegularPrice = Number(euroRegularPriceString);

  const productWithEuro = { ...product, euroPrice, euroRegularPrice };

  return productWithEuro;
};

export const convertSingleNumber = async (valueCHF: number) => {
  const ratesCurrency = await currencyRates();

  const valueEUR = valueCHF / ratesCurrency.rates.CHF;
  const fixedValue = valueEUR.toFixed(2);
  const result = Number(fixedValue);

  return result;
};
