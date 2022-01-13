import Image from "next/image";
import currencyIcon from "../../../public/images/icons/devise.svg";
import useCurrency from "../../hooks/useCurrency";
import { CurrencySelectorStyle } from "./styles";

const CurrencySelector = () => {
    const { setCurrency } = useCurrency();
    const handleChange = (e:string) =>{
    setCurrency(e);
    }
  return (
      <CurrencySelectorStyle>
<div className="ImgBox">
<Image width={25} height={25} src={currencyIcon} alt="currency" />
</div>
    <select onChange={(e)=> handleChange(e.target.value)}>
      <option value="CHF">CHF</option>
      <option value="EUR">EUR</option>
    </select>
      </CurrencySelectorStyle>
  );
};
export default CurrencySelector;
