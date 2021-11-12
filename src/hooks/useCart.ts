import { useContext } from "react";
import { CartContext } from "../components/Context/CartContext";

export default function useCart() {
  const context = useContext(CartContext);

  return context;
}
