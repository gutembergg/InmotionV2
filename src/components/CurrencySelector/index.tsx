import Image from "next/image";
import { useEffect, useState } from "react";
import currencyIcon from "../../../public/images/icons/devise.svg";
import useCart from "../../hooks/useCart";
import useCurrency from "../../hooks/useCurrency";

const CurrencySelector = () => {
  const { setCurrency, currency } = useCurrency();
  const { cart } = useCart();

  const [isCart, setIsCart] = useState(false);

  const isCurrencyCHF = currency === "CHF";

  useEffect(() => {
    if (cart.products?.length > 0) {
      setIsCart(true);
    } else {
      setIsCart(false);
    }
  }, [cart.products?.length, cart]);

  const handleChange = (currency: string) => {
    setCurrency(currency);
  };

  return (
    <div>
      <div className="ImgBox">
        <Image width={30} height={30} src={currencyIcon} alt="currency" />
      </div>
      <select
        onChange={(e) => handleChange(e.target.value)}
        value={isCurrencyCHF ? "CHF" : "EUR"}
        disabled={isCart}
      >
        <option value="CHF">CHF</option>
        <option value="EUR">EUR</option>
      </select>
    </div>
  );
};
export default CurrencySelector;
