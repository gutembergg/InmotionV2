import Image from "next/image";
import currencyIcon from "../../../public/images/icons/devise.svg";
import useCurrency from "../../hooks/useCurrency";

const CurrencySelector = () => {
    const { setCurrency } = useCurrency();
    const handleChange = (e:string) =>{
    setCurrency(e);
    }
  return (
      <div>
<div className="ImgBox">
<Image width={30} height={30} src={currencyIcon} alt="currency" />
</div>
    <select onChange={(e)=> handleChange(e.target.value)}>
      <option value="CHF">CHF</option>
      <option value="EUR">EUR</option>
    </select>
      </div>
  );
};
export default CurrencySelector;
