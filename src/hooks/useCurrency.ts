import { useContext } from "react";
import { CurrencyContext } from "../components/Context/CurrencyContext";

export default function useCurrency() {
  const context = useContext(CurrencyContext);

  return context;
}
