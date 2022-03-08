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
  const warningNoMoreAvailableCoupon = t("couponsErrors:warningNoMoreAvailableCoupon");
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
      Report.failure(
        `${errorCoupon}`,
        `${singleCouponUsed}`,
        "Okay"
        );
        return;
      }
      //if no code in value   tested
      if (inputValue.length === 0) {
        Report.failure(
          `${errorCoupon}`,
          `${InputHasntValue}`,
          "Okay"
          );
          return;
        }
        // setInputValue("");
        checkCoupons();
      };
      
      const checkCoupons = async () => {
        const { data } = await searchCoupons(inputValue);
        const coupon: ICoupons = data[0];
        
    //CHECK CODE AVAILABILITY  tested
    if (!coupon) {
      Report.failure(
        `${errorCoupon}`,
        `${couponNotValable}`,
        "Okay"
      );
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

    //--------------COUPONS RESTRICTIONS ----------------------//

    //CHECK DATE EXPIRATION tested
    const couponExpDate = coupon.date_expires;
    const date = Date.now();
    if (couponExpDate) {
      const ExpDateMs = Date.parse(couponExpDate);

      if (ExpDateMs < date) {
        Report.failure(
          `${errorCoupon}`,
          `${couponDateExpired}`,
          "Okay"
        );

        return;
      }
    }

    //CHECK COUPON USAGE LIMIT tested
    const usageLimit = coupon.usage_limit;
    const usageCount = coupon.usage_count;

    if (usageLimit && usageCount >= usageLimit) {
      Report.failure(
        `${errorCoupon}`,
        `${couponLimitReached}`,
        "Okay"
      );
      return;
    }

    //CHECK INDIVIDUAL USE ----tested
    if (coupon.individual_use) {
      if (usedCoupons.length === 0) {
        setInputDisabledStatus(true);
        Report.info(
          `${errorCoupon}`,
          `${warningNoMoreAvailableCoupon}`,
          "Okay"
        );
      } else {
        Report.failure(
          `${errorCoupon}`,
          `${singleCouponOnly}`,
          "Okay"
        );
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
        Report.failure(
          `${errorCoupon}`,
          `${couponWrongUser}`,
          "Okay"
        );
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
        Report.failure(
          `${errorCoupon}`,
          `${couponLimitReached}`,
          "Okay"
        );
        return;
      }
      // with userID
      const client = usedByClient.filter((key) => key === userID?.toString());
      if (client && client.length >= usageLimitPerUser) {
        Report.failure(
          `${errorCoupon}`,
          `${couponLimitReached}`,
          "Okay"
        );
        return;
      }
    }

    //CHECK GROUP RESTRICTION ----TODO!!!!!
    const groupRestriction = coupon.meta_data[0].value.toString();
    if (groupRestriction) {
      if (groupRestriction !== userGrp) {
        Report.failure(
          `${errorCoupon}`,
          `${groupNotValid}`,
          "Okay"
        );
        return;
      }
    }
    //CART RESTRICTIONS ----------------------//

    // CHECK CART LENGTH
    if (!cartContent) {
      Report.failure(
        `${errorCoupon}`,
        `${CartIsEmpty}`,
        "Okay"
      );
      return;
    }

    //CHECK CART MIN / MAX VALUE
    const _minCartAmount = parseFloat(coupon.minimum_amount);
    const _maxCartAmount = parseFloat(coupon.maximum_amount);

    if (_minCartAmount && cartValue < _minCartAmount) {
      Report.failure(
        `${errorCoupon}`,
        `${minCartAmount}`,
        "Okay"
      );
      return;
    }

    if (_maxCartAmount && cartValue > _maxCartAmount) {
      Report.failure(
        `${errorCoupon}`,
        `${maxCartAmount}`,
        "Okay"
      );
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
        Report.failure(
          `${errorCoupon}`,
          `${noAvaillableProduct}`,
          "Okay"
        );
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
        Report.failure(
          `${errorCoupon}`,
          `${unhautorizedProduct}`,
          "Okay"
        );
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
        Report.failure(
          `${errorCoupon}`,
          `${availableCatInCart}`,
          "Okay"
        );
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
        Report.failure(
          `${errorCoupon}`,
          `${excludedCatInCart}`,
          "Okay"
        );
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
          Report.failure(
            `${errorCoupon}`,
            `${soldedProduct}`,
            "Okay"
          );
          return;
        }
      }

      //when fixed cart and percent
      if (discountType === "fixed_cart" || discountType === "percent") {
        const listCartOnSaleStatut = cartContent.filter(
          (product) => product.on_sale === true
        );
        if (listCartOnSaleStatut.length > 0) {
          Report.failure(
            `${errorCoupon}`,
            `${soldedItemInCart}`,
            "Okay"
          );
          return;
        }
      }
    }

    //

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
          initial={{background: "#0570A6" }}
                      whileHover={{
                        scale: 1.02,
                        transition: { duration: 0.01 },
                        background: "#03486b" 
                      }}
                      style={{ originX: 0.5 }}
                      whileTap={{ scale: 0.98, transition: { duration: 0.01 },}}
          >
            {verifier}
          </motion.button>
        </div>
      </form>
    </Container>
  );
};
export default CouponsCode;
