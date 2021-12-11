import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useState,
} from "react";
import { searchCoupons } from "../../services/woocommerceApi/Coupons";
import { CouponsMessages } from "../../enums/coupon";
import { ICoupons } from "../../interfaces/ICoupons";
import Notiflix from "notiflix";
import useCart from "../../hooks/useCart";
import useTranslation from "next-translate/useTranslation";

interface IProps {
  userMail: string;
  userID: number | null;
  userGrp: string;
  usedCoupons: ICoupons[];
  setusedCoupons: Dispatch<SetStateAction<ICoupons[]>>;
}

const CouponsCode = ({
  userMail,
  userID,
  userGrp,
  setusedCoupons,
  usedCoupons,
}: IProps) => {
  const { cart } = useCart();
  const [inputValue, setInputValue] = useState<string>("");
  const [inputDisabledStatus, setInputDisabledStatus] =
    useState<boolean>(false);

  const { t } = useTranslation();
  const doYouHaveCodePromo = t("checkout-mobility:doYouHaveCodePromo");
  const btnSend = t("checkout-mobility:btnSend");

  const cartContent = cart.products;
  const cartValue = cart.totalProductsPrice;
  const cartProducts = cart.products;

  //HANDLE INPUT CHANGES
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputTxt = event.target.value.trim();
    setInputValue(inputTxt);
  };

  //HANDLE INPUT SUBMIT
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    //if disabled because single use code   tested
    if (inputDisabledStatus === true) {
      Notiflix.Notify.failure(CouponsMessages.singleCouponUsed);
      return;
    }
    //if no code in value   tested
    if (inputValue.length === 0) {
      Notiflix.Notify.failure(CouponsMessages.InputHasntValue);
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
      Notiflix.Notify.failure(CouponsMessages.couponNotValable);
      return;
    }

    // CHECK CODE DUPLICATION tested
    const couponID = coupon.id;
    const checkUsedCoupon = usedCoupons.find((item) => item.id === couponID);
    if (checkUsedCoupon) {
      Notiflix.Notify.failure(`${couponID} à déja été utilisé`);
      return;
    }

    //--------------COUPONS RESTRICTIONS ----------------------//

    //CHECK DATE EXPIRATION tested
    const couponExpDate = coupon.date_expires;
    const date = Date.now();
    if (couponExpDate) {
      const ExpDateMs = Date.parse(couponExpDate);

      if (ExpDateMs < date) {
        Notiflix.Notify.failure(CouponsMessages.couponDateExpired);
        return;
      }
    }

    //CHECK COUPON USAGE LIMIT tested
    const usageLimit = coupon.usage_limit;
    const usageCount = coupon.usage_count;

    if (usageLimit && usageCount >= usageLimit) {
      Notiflix.Notify.failure(CouponsMessages.couponLimitReached);
      return;
    }

    //CHECK INDIVIDUAL USE ----tested
    if (coupon.individual_use) {
      if (usedCoupons.length === 0) {
        setInputDisabledStatus(true);
        Notiflix.Notify.info(CouponsMessages.warningNoMoreAvailableCoupon);
      } else {
        Notiflix.Notify.failure(CouponsMessages.singleCouponOnly);
        return;
      }
    }

    //----------------------USERS RESTRICTIONS----------------------//

    //CHECK EMAIL RESTRICTION tested
    const AuthorizedEmails = coupon.email_restrictions;

    if (AuthorizedEmails.length !== 0) {
      const searchAuthorizedEmail = AuthorizedEmails.filter(
        (key) => key === userMail
      );

      if (searchAuthorizedEmail.length === 0) {
        Notiflix.Notify.failure(CouponsMessages.couponWrongUser);
        return;
      }
    }

    //CHECK  USAGE LIMIT PER USER | EMAIL  tested
    const usageLimitPerUser = coupon.usage_limit_per_user;
    const usedBy = coupon.used_by;
    const usedByVisitor = usedBy.filter((key) => key.includes("@"));
    const usedByClient = usedBy.filter((key) => !key.includes("@"));

    if (usageLimitPerUser) {
      const visitor = usedByVisitor.filter((key) => key === userMail);

      // with email
      if (visitor && visitor.length >= usageLimitPerUser) {
        Notiflix.Notify.failure(CouponsMessages.couponLimitReached);
        return;
      }
      // with userID
      const client = usedByClient.filter((key) => key === userID?.toString());
      if (client && client.length >= usageLimitPerUser) {
        Notiflix.Notify.failure(CouponsMessages.couponLimitReached);
        return;
      }
    }

    //CHECK GROUP RESTRICTION ----TODO!!!!!
    const groupRestriction = coupon.meta_data[0].value.toString();
    if (groupRestriction) {
      if (groupRestriction !== userGrp) {
        Notiflix.Notify.failure(CouponsMessages.groupNotValid);
        return;
      }
    }
    //CART RESTRICTIONS ----------------------//

    // CHECK CART LENGTH
    if (!cartContent) {
      Notiflix.Notify.failure(CouponsMessages.CartIsEmpty);
      return;
    }

    //CHECK CART MIN / MAX VALUE
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
    //check matching element between 2 array
    const findCommonElements = (arr1: number[], arr2: number[]) => {
      return arr1.some((item) => arr2.includes(item));
    };

    //AVAILABLE PRODUCT  tested
    const availableProducts = coupon.product_ids;
    if (availableProducts.length > 0) {
      const cartProductIDS = cartProducts.map((cartProduct) => {
        return cartProduct.id;
      });

      if (findCommonElements(availableProducts, cartProductIDS) === false) {
        Notiflix.Notify.failure(CouponsMessages.noAvaillableProduct);
        return;
      }
    }

    //EXCLUDED PRODUCT tested
    const excludedProducts = coupon.excluded_product_ids;
    if (excludedProducts.length > 0) {
      const cartProductIDS = cartProducts.map((cartProduct) => {
        return cartProduct.id;
      });
      if (findCommonElements(excludedProducts, cartProductIDS) === true) {
        Notiflix.Notify.failure(CouponsMessages.unhautorizedProduct);
        return;
      }
    }

    //AVAILABLE CATEGORY
    const availableCategory = coupon.product_categories;

    if (availableCategory.length > 0) {
      const cartProductCategory = cartProducts
        .map((cartProduct) => {
          return cartProduct.categories;
        })
        .map((cartProductCat) => {
          return cartProductCat.map((cartProductcatid) => {
            return cartProductcatid.id;
          });
        });
      const flatCatList = cartProductCategory.flat();
      if (findCommonElements(availableCategory, flatCatList) === false) {
        Notiflix.Notify.failure(CouponsMessages.availableCatInCart);
        return;
      }
    }

    //EXCLUDED CATEGORY tested
    const excludedCategory = coupon.excluded_product_categories;
    if (excludedCategory.length > 0) {
      const cartProductCategory = cartProducts
        .map((cartProduct) => {
          return cartProduct.categories;
        })
        .map((cartProductCat) => {
          return cartProductCat.map((cartProductcatid) => {
            return cartProductcatid.id;
          });
        });
      const flatCatList = cartProductCategory.flat();
      if (findCommonElements(excludedCategory, flatCatList) === true) {
        Notiflix.Notify.failure(CouponsMessages.excludedCatInCart);
        return;
      }
    }

    //----------- SOLDED PRODUCTS RESTRICTIONS ----------------------//
    const discountType = coupon.discount_type;
    const couponSaleStatut = coupon.exclude_sale_items;

    if (couponSaleStatut && cartContent) {
      //when fixed product coupon
      if (discountType === "fixed_product") {
        const onsaleProductsIDs = coupon.product_ids;

        const soldedProductInCart = cartContent.filter(
          (product) => product.on_sale === true
        );

        const cartsoldedProductIDS = soldedProductInCart.map((cartProduct) => {
          return cartProduct.id;
        });

        if (
          findCommonElements(cartsoldedProductIDS, onsaleProductsIDs) === true
        ) {
          Notiflix.Notify.failure(CouponsMessages.soldedProduct);
          return;
        }
      }

      //when fixed cart and percent
      if (discountType === "fixed_cart" || discountType === "percent") {
        const listCartOnSaleStatut = cartContent.filter(
          (product) => product.on_sale === true
        );
        if (listCartOnSaleStatut.length > 0) {
          Notiflix.Notify.failure(CouponsMessages.soldedItemInCart);
          return;
        }
      }
    }
    //

    //---------------------- CASE COUPON IS AVAILABLE ------------------------------//

    Notiflix.Notify.success(CouponsMessages.validCoupon);
    setusedCoupons((usedCoupons) => [...usedCoupons, coupon]);
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
        <button type="submit" disabled={inputDisabledStatus === true && true}>
          {btnSend}{" "}
        </button>
      </form>
    </div>
  );
};
export default CouponsCode;
