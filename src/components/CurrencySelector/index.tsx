import useTranslation from "next-translate/useTranslation";
import Image from "next/image";
import Notiflix from "notiflix";
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

  const { t } = useTranslation();
  const CurrencyBlocked = t("common:CurrencyBlocked");


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
    <CurrencySelectorStyle>
      <div className="ImgBox">
        <Image width={25} height={25} src={currencyIcon} alt="currency" />
      </div>
      {isCart === false ? (
      <select
      onChange={(e) => handleChange(e.target.value)}
      value={isCurrencyCHF ? "CHF" : "EUR"}
      disabled={isCart}
      
    >
      <option value="CHF">CHF</option>
      <option value="EUR">EUR</option>
    </select>
      )
      :(
        <p className="" onClick={()=> Notiflix.Notify.warning(CurrencyBlocked)}>{currency}</p>
      )
      }

    </CurrencySelectorStyle>
  );
};
export default CurrencySelector;
