import {
  ChangeEvent,
  FormEvent,
  FormEventHandler,
  useEffect,
  useState,
} from "react";
import { searchCoupons } from "../../services/woocommerceApi/Coupons";
import { CouponsMessages } from "../../enums/coupon";
import { ICoupons } from "../../interfaces/ICoupons";
import Notiflix from "notiflix";
import useCart from "../../hooks/useCart";
import { IProduct } from "../../interfaces/IProducts";
import useTranslation from "next-translate/useTranslation";

const CouponsCode = () => {
  const { t } = useTranslation();
  const doYouHaveCodePromo = t("checkout-mobility:doYouHaveCodePromo");
  const btnSend = t("checkout-mobility:btnSend");

  const [inputValue, setInputValue] = useState<string>("");
  const [inputDisabledStatus, setInputDisabledStatus] =
    useState<boolean>(false);
  const [usedCouponsList, setUsedCouponsList] = useState<ICoupons[]>([]);
  const { cart, removeCartItem } = useCart();
  const cartContent = cart.products;
  const cartValue = cart.totalProductsPrice;

  //HANDLE INPUT CHANGES
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputTxt = event.target.value.trim();
    setInputValue(inputTxt);
  };

  //HANDLE INPUT SUBMIT
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    //if disabled because single use code
    if (inputDisabledStatus === true) {
      Notiflix.Notify.failure(CouponsMessages.singleCouponUsed);
      return;
    }
    //if no code in value
    if (inputValue.length === 0) {
      Notiflix.Notify.failure(CouponsMessages.InputHasntValue);
      return;
    }
    setInputValue("");
    checkCoupons();
  };

  //--------FUNCTION CHECK COUPONS--------//
  const checkCoupons = async () => {
    console.log("you entered code---->", inputValue);
    //Get coupon data
    const { data } = await searchCoupons(inputValue);
    const coupon: ICoupons = data[0];
    //GENERAL CHECK ------------------------------//

    //CHECK CODE AVAILABILITY
    if (!coupon) {
      Notiflix.Notify.failure(CouponsMessages.couponNotValable);
      return;
    }

    // CHECK CODE DUPLICATION
    console.log("dans la fonction", usedCouponsList);
    const couponID = coupon.id;
    const checkUsedCoupon = usedCouponsList.find(
      (item) => item.id === couponID
    );
    console.log("checkUsedCoupon", checkUsedCoupon);
    if (checkUsedCoupon) {
      Notiflix.Notify.failure(`${couponID} à déja été utilisé`);
      return;
    }

    //COUPONS RESTRICTIONS ----------------------//

    //CHECK DATE EXPIRATION
    const couponExpDate = coupon.date_expires;
    const date = Date.now();
    if (couponExpDate) {
      const ExpDateMs = Date.parse(couponExpDate);
      console.log("date in ms", ExpDateMs);

      if (ExpDateMs < date) {
        Notiflix.Notify.failure(CouponsMessages.couponDateExpired);
        return;
      }
    }

    //CHECK COUPON USAGE LIMIT
    const usageLimit = coupon.usage_limit;
    const usageCount = coupon.usage_count;

    if (usageLimit && usageCount >= usageLimit) {
      Notiflix.Notify.failure(CouponsMessages.couponLimitReached);
      return;
    }

    //CHECK INDIVIDUAL USE ----TODO!!!!!
    if (coupon.individual_use) {
      console.log("individual");

      if (usedCouponsList.length === 0) {
        setInputDisabledStatus(true);
        console.log("no coupon in liste");
        Notiflix.Notify.warning(CouponsMessages.warningNoMoreAvailableCoupon);
      } else {
        Notiflix.Notify.failure(CouponsMessages.singleCouponOnly);
        console.log("coupon in liste");
        return;
      }
    }

    //USERS RESTRICTIONS----------------------//
    const userEmail = "fatih@fat-e.ch";
    //get user email

    //CHECK EMAIL RESTRICTION
    const AuthorizedEmails = coupon.email_restrictions;
    const AuthorizedEmailsLenght = coupon.email_restrictions.length;
    console.log("authorized email lenght", AuthorizedEmailsLenght);

    if (AuthorizedEmails.length !== 0) {
      const searchAuthorizedEmail = AuthorizedEmails.filter(
        (key) => key === userEmail
      );

      if (searchAuthorizedEmail.length === 0) {
        Notiflix.Notify.failure(CouponsMessages.couponWrongUser);
        return;
      }
    }

    //CHECK  USAGE LIMIT PER USER | EMAIL----------  ---> a revoir avec les clients id!!!!!!!!!!//
    const usageLimitPerUser = coupon.usage_limit_per_user;
    const usedBy = coupon.used_by;
    const usedByVisitor = usedBy.filter((key) => key.includes("@"));
    const usedByClient = usedBy.filter((key) => !key.includes("@"));

    if (usageLimitPerUser) {
      const visitor = usedByVisitor.filter((key) => key === userEmail);

      if (visitor && visitor.length >= usageLimitPerUser) {
        Notiflix.Notify.failure(CouponsMessages.couponLimitReached);
        return;
      }
      // console.log("used by (all list)", usedBy);
      // console.log("visitor list", usedByVisitor);
      // console.log("registred client list", usedByClient);
      // console.log("userlimitperuser", usageLimitPerUser);
      // console.log("visitor in used coupon", visitor);
      // console.log("visitor in used coupon length", visitor.length);
    }

    //CHECK GROUP RESTRICTION ----TODO!!!!!

    //CART RESTRICTIONS ----------------------//

    //CHECK CART LENGTH
    // console.log("cartcontent", cartContent);
    // if (!cartContent) {
    //   Notiflix.Notify.failure(CouponsMessages.CartIsEmpty);
    //   return;
    // }

    //CHECK CART MIN / MAX VALUE
    console.log("cartvalue", cartValue);
    const minCartAmount = parseFloat(coupon.minimum_amount);
    const maxCartAmount = parseFloat(coupon.maximum_amount);

    if (minCartAmount && cartValue < minCartAmount) {
      Notiflix.Notify.failure(CouponsMessages.minCartAmount);
      return;
    }

    if (maxCartAmount && cartValue > maxCartAmount) {
      Notiflix.Notify.failure(CouponsMessages.maxCartAmount);
      return;
    }

    //PRODUCT RESTRICTION----------------------------//
    //AVAILABLE PRODUCT
    const availableProducts = coupon.product_ids;

    availableProducts.map((availableProduct) => {
      console.log(availableProduct);
      const cartAvailableContent = cartContent.filter(
        (product) => product.id === availableProduct
      );
      console.log(cartAvailableContent);
    });

    //EXCLUDED PRODUCT
    //AVAILABLE CATEGORY
    //EXCLUDED CATEGORY

    //----------- SOLDED PRODUCTS RESTRICTIONS ----------------------//
    const discountType = coupon.discount_type;
    const couponSaleStatut = coupon.exclude_sale_items;
    console.log("discouttype", discountType);

    if (couponSaleStatut && cartContent) {
      console.log("[info]satut on sale and cart content ok ");
      //when fixed product coupon
      if (discountType === "fixed_product") {
        const onsaleProductsIDs = coupon.product_ids;
        console.log("ID of items on sale ", onsaleProductsIDs);
        onsaleProductsIDs.map((product) => {
          console.log(product);
        });
      }

      //when fixed cart
      if (discountType === "fixed_cart") {
        const listCartOnSaleStatut = cartContent.filter(
          (product) => product.on_sale === true
        );

        if (listCartOnSaleStatut.length > 0) {
          console.log("test");
          Notiflix.Notify.failure(CouponsMessages.soldedItemInCart);
          return;
        }
      }
    }
    //

    //---------------------- CASE COUPON IS AVAILABLE ------------------------------//

    setUsedCouponsList((usedCouponsList) => [...usedCouponsList, coupon]);
    Notiflix.Notify.success(CouponsMessages.validCoupon);
    console.log("list of all coupons", usedCouponsList);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>{doYouHaveCodePromo}</label>
        <input
          id="promoInput"
          type="text"
          placeholder="code Promo"
          onChange={handleChange}
          value={inputValue}
          disabled={inputDisabledStatus}
        />
        <button type="submit">{btnSend}</button>
      </form>
    </div>
  );
};
export default CouponsCode;
