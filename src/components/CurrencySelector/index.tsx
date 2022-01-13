import Image from "next/image";
import { useEffect, useState } from "react";
import currencyIcon from "../../../public/images/icons/devise.svg";
import useCart from "../../hooks/useCart";
import useCurrency from "../../hooks/useCurrency";
import { CurrencySelectorStyle } from "./styles";

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
<<<<<<< HEAD
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
=======
      <CurrencySelectorStyle>
<div className="ImgBox">
<Image width={25} height={25} src={currencyIcon} alt="currency" />
</div>
    <select onChange={(e)=> handleChange(e.target.value)}>
      <option value="CHF">CHF</option>
      <option value="EUR">EUR</option>
    </select>
      </CurrencySelectorStyle>
>>>>>>> 7fd5ab73ca706def3fcea35e216938a3333149ec
  );
};
export default CurrencySelector;
