import { createContext, ReactNode, useCallback, useState } from "react";

interface ICurrencyContext {
  currency: string;
  setCurrency: (currency: string) => void;
}

interface Children {
  children: ReactNode;
}

export const CurrencyContext = createContext<ICurrencyContext>(
  {} as ICurrencyContext
);

const CurrencyProvider = ({ children }: Children) => {
  const [data, setData] = useState<string>("CHF");

  const setCurrency = useCallback((currency: string) => {
    setData(currency);
  }, []);

  //console.log("devise", data);

  return (
    <CurrencyContext.Provider value={{ setCurrency, currency: data }}>
      {children}
    </CurrencyContext.Provider>
  );
};
export default CurrencyProvider;
