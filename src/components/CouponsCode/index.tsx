import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useState,
} from "react";
import { Report } from "notiflix";
import { searchCoupons } from "../../services/woocommerceApi/Coupons";
import { ICoupons } from "../../interfaces/ICoupons";
import useTranslation from "next-translate/useTranslation";
import { motion } from "framer-motion";

import { Container } from "./styles";

interface IProps {
  usedCoupons: ICoupons[];
  setusedCoupons: Dispatch<SetStateAction<ICoupons[]>>;
  codePromoSteps: () => void;
}

const CouponsCode = ({
  setusedCoupons,
  usedCoupons,
  codePromoSteps,
}: IProps) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [inputDisabledStatus, setInputDisabledStatus] =
    useState<boolean>(false);

  const { t } = useTranslation();
  const doYouHaveCodePromo = t("checkout-mobility:doYouHaveCodePromo");
  const verifier = t("checkout-mobility:verifier");
  const InputHasntValue = t("couponsErrors:InputHasntValue");
  const couponNotValable = t("couponsErrors:couponNotValable");
  const validCoupon = t("couponsErrors:validCoupon");
  const singleCouponUsed = t("couponsErrors:singleCouponUsed");
  const alreadyUsedCoupon = t("couponsErrors:alreadyUsedCoupon");
  const errorCoupon = t("couponsErrors:errorCoupon");
  const goodCoupon = t("couponsErrors:goodCoupon");

  //HANDLE INPUT CHANGES
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputTxt = event.target.value;

    setInputValue(inputTxt);
  };

  //HANDLE INPUT SUBMIT
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    //if disabled because single use code   tested
    if (inputDisabledStatus === true) {
      Report.failure(`${errorCoupon}`, `${singleCouponUsed}`, "Okay");
      return;
    }
    //if no code in value   tested
    if (inputValue.length === 0) {
      Report.failure(`${errorCoupon}`, `${InputHasntValue}`, "Okay");
      return;
    }
    setInputValue("");
    checkCoupons();
  };

  const checkCoupons = async () => {
    const { data } = await searchCoupons(inputValue);
    const coupon: ICoupons = data[0];

    //CHECK CODE AVAILABILITY  tested
    if (!coupon) {
      Report.failure(`${errorCoupon}`, `${couponNotValable}`, "Okay");
      return;
    }

    // CHECK CODE DUPLICATION tested
    const couponID = coupon.id;
    const couponDescr = coupon.description;
    const checkUsedCoupon = usedCoupons.find((item) => item.id === couponID);
    if (checkUsedCoupon) {
      Report.failure(
        `${errorCoupon}`,
        `${couponDescr} ${alreadyUsedCoupon}`,
        "Okay"
      );
      return;
    }

    //---------------------- CASE COUPON IS AVAILABLE ------------------------------//
    Report.success(`${goodCoupon}`, `${validCoupon}`, "Okay");
    setusedCoupons((usedCoupons) => [...usedCoupons, coupon]);
    codePromoSteps();
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <p>{doYouHaveCodePromo}</p>
        <div className="input_block">
          <input
            id="promoInput"
            type="text"
            placeholder="code Promo"
            onChange={handleChange}
            value={inputValue}
            disabled={inputDisabledStatus}
          />
          <motion.button
            type="submit"
            disabled={inputDisabledStatus === true && true}
            initial={{ background: "#0570A6" }}
            whileHover={{
              scale: 1.02,
              transition: { duration: 0.01 },
              background: "#03486b",
            }}
            style={{ originX: 0.5 }}
            whileTap={{ scale: 0.98, transition: { duration: 0.01 } }}
          >
            {verifier}
          </motion.button>
        </div>
      </form>
    </Container>
  );
};
export default CouponsCode;
