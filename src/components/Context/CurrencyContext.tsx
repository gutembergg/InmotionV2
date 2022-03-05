import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";

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
  const [data, setData] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const clientCurrency = localStorage.getItem("inmotion:currency");

      if (clientCurrency) {
        setData(clientCurrency);
      } else {
        setData("CHF");
      }
    }
  }, []);

  const setCurrency = useCallback((currency: string) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("inmotion:currency", currency);
    }
    setData(currency);
  }, []);

  return (
    <CurrencyContext.Provider value={{ setCurrency, currency: data }}>
      {children}
    </CurrencyContext.Provider>
  );
};
export default CurrencyProvider;
