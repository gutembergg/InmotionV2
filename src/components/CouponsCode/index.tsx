import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useState,
} from "react";
import { Notify, Report } from "notiflix";
import { searchCoupons } from "../../services/woocommerceApi/Coupons";
import { CouponsMessages } from "../../enums/coupon";
import { ICoupons } from "../../interfaces/ICoupons";
import useCart from "../../hooks/useCart";
import useTranslation from "next-translate/useTranslation";
import { motion } from "framer-motion";
import { Container } from "./styles";
import Notiflix from "notiflix";

interface IProps {
  userMail: string;
  userID: number | null;
  userGrp: string;
  usedCoupons: ICoupons[];
  setusedCoupons: Dispatch<SetStateAction<ICoupons[]>>;
  codePromoSteps: () => void;
}

const CouponsCode = ({
  userMail,
  userID,
  userGrp,
  setusedCoupons,
  usedCoupons,
  codePromoSteps,
}: IProps) => {
  const { cart } = useCart();
  const [inputValue, setInputValue] = useState<string>("");
  const [inputDisabledStatus, setInputDisabledStatus] =
    useState<boolean>(false);

  const { t } = useTranslation();
  const doYouHaveCodePromo = t("checkout-mobility:doYouHaveCodePromo");
  const verifier = t("checkout-mobility:verifier");
  const InputHasntValue = t("couponsErrors:InputHasntValue");
  const CartIsEmpty = t("couponsErrors:CartIsEmpty");
  const couponNotValable = t("couponsErrors:couponNotValable");
  const couponDateExpired = t("couponsErrors:couponDateExpired");
  const couponWrongUser = t("couponsErrors:couponWrongUser");
  const couponLimitReached = t("couponsErrors:couponLimitReached");
  const soldedItemInCart = t("couponsErrors:soldedItemInCart");
  const minCartAmount = t("couponsErrors:minCartAmount");
  const maxCartAmount = t("couponsErrors:maxCartAmount");
  const validCoupon = t("couponsErrors:validCoupon");
  const singleCouponOnly = t("couponsErrors:singleCouponOnly");
  const singleCouponUsed = t("couponsErrors:singleCouponUsed");
  const warningNoMoreAvailableCoupon = t(
    "couponsErrors:warningNoMoreAvailableCoupon"
  );
  const alreadyUsedCoupon = t("couponsErrors:alreadyUsedCoupon");
  const groupNotValid = t("couponsErrors:groupNotValid");
  const noAvaillableProduct = t("couponsErrors:noAvaillableProduct");
  const unhautorizedProduct = t("couponsErrors:unhautorizedProduct");
  const availableCatInCart = t("couponsErrors:availableCatInCart");
  const excludedCatInCart = t("couponsErrors:excludedCatInCart");
  const soldedProduct = t("couponsErrors:soldedProduct");
  const errorCoupon = t("couponsErrors:errorCoupon");
  const goodCoupon = t("couponsErrors:goodCoupon");

  const cartContent = cart.products;
  const cartValue = cart.totalProductsPrice;
  const cartProducts = cart.products;
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
    console.log("coupons: ", coupon);
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
