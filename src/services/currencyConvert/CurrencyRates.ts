import axios from "axios";

interface RatesCurrency {
  success: boolean;
  timestamp: number;
  base: string;
  date: string;
  rates: { CHF: number };
}

export const currencyRates = async (): Promise<number> => {
  const { data: currencyConvert } = await axios.get<RatesCurrency>(
    "http://api.exchangeratesapi.io/v1/latest?access_key=3b7eb3bf84ed6f1b9ff3c2f99cd1ffaa&symbols=CHF,EUR"
  );

  let currencyRate;

  if (!currencyConvert) {
    currencyRate = 1.043494;
  } else {
    currencyRate = currencyConvert.rates.CHF;
  }

  return currencyRate;
};
