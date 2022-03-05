import useTranslation from "next-translate/useTranslation";
import Image from "next/image";
import Notiflix from "notiflix";
import { useEffect, useState } from "react";
import currencyIcon from "../../../public/images/icons/devise.svg";
import useCart from "../../hooks/useCart";
import useCurrency from "../../hooks/useCurrency";
import { CurrencySelectorStyle } from "./styles";
import{ useRouter } from "next/router";

interface Props{
closeMobileMenu?:() => void;
}

const CurrencySelector = ({closeMobileMenu}:Props) => {
  const { setCurrency, currency } = useCurrency();
  const { cart } = useCart();
  const router = useRouter();
  const [isCart, setIsCart] = useState(false);

  const isCurrencyCHF = currency === "CHF";

  const { t } = useTranslation();
  const CurrencyBlocked = t("common:CurrencyBlocked");
  const notavailable = t("common:notavailable");


  useEffect(() => {
      if ( router?.pathname === "/inmotion-mobility/checkout-mobility") {
          setIsCart(true)
      }else{
         setIsCart(false)
      }
  }, [router.pathname]);

  const handleChange = (currency: string) => {
    setCurrency(currency);
    closeMobileMenu && closeMobileMenu()
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
        <p className="" onClick={()=> Notiflix.Report.failure(
         `${notavailable}`,
         `${CurrencyBlocked}`,
          'Ok',
          )}>{currency}</p>
      )
      }

    </CurrencySelectorStyle>
  );
};
export default CurrencySelector;
