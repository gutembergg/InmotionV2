import Image from "next/image";
import { GetServerSideProps } from "next";
import React, {
  ReactElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import CouponsCode from "../../../components/CouponsCode";
import LoginForm from "../../../components/Login";
import RegisterForm from "../../../components/Register";
import useCart from "../../../hooks/useCart";
import thankIcon from "../../../../public/images/icons/thank-you.svg";
import {
  LineItemsDTO,
  OrderValidation,
} from "../../../interfaces/OrderValidation";
import BillingShippingForm, {
  IFormValues,
} from "../../../components/BillingShippingForm";
import {
  wc_createOrder,
  _updateOrder,
} from "../../../services/woocommerceApi/Orders";
import useTranslation from "next-translate/useTranslation";

import LayoutMobility from "../../../Layout/LayoutMobility";
import useUser from "../../../hooks/useUser";
import apiPFinance from "../../../services/postFinanceApi/apiPFinance";
import { PostFinancePaymentMethods } from "../../../interfaces/PostFinance";
import Spiner from "../../../components/Spiner";

import { ICoupons } from "../../../interfaces/ICoupons";
import { CouponLines, Order } from "../../../interfaces/Order";
import { getShippingZoneMethods } from "../../../services/woocommerceApi/ShippingMethods";
import { ShippingMethods } from "../../../interfaces/ShippingMethods";
import UserInfosView from "../../../components/CheckoutMobility/UserInfosView";

import {
  Container,
  Content,
  OrderSession,
  Payment,
  PaymentMethods,
  FormSection,
  ProductCart,
  IoMdRadioButtonOk,
  IoMdRadioButtonNot,
  BtnCouponsBlock,
  ShipMethods,
  ShipItem,
  CouponsList,
  AddressView,
} from "../../../styles/CheckoutMobility";

interface ILineItems {
  id: number;
  name: string;
  price: number;
  product_id: number;
  quantity: number;
  sku: string;
  subtotal: string;
  subtotal_tax: string;
  total_tax: string;
  slug: string;
}

export default function CheckoutMobility() {
  const orderIdRef = useRef(0);
  const lineItemsRef = useRef<ILineItems[]>([]);
  const shippingPriceRef = useRef(0);
  const [_scroll, _setScroll] = useState(false);

  const [loged, setloged] = useState(false);
  const { cart } = useCart();
  const { user } = useUser();

  const { t } = useTranslation();
  const haveAccount = t("checkout-mobility:haveAccount");
  const wayDelivery = t("checkout-mobility:wayDelivery");
  const payment = t("checkout-mobility:payment");
  const emptyCartMessage = t("checkout-mobility:emptyCartMessage");

  const [_billingShippingData, _setBillingShippingData] =
    useState<OrderValidation>({} as OrderValidation);
  const [changeBillinhView, setChangeBillingView] = useState(false);
  const [lineItems, setLineItems] = useState<LineItemsDTO[]>([]);
  const [transactionId, setTransactionId] = useState<number>();
  const [paymentMethodes, setPaymentMethods] = useState<
    PostFinancePaymentMethods[]
  >([]);

  //------------------------------------------USE STATE COUPONS VALIDES ( COUPON ENTIER AVEC DATA)  ------------------------------------------------!!

  const [usedCoupons, setusedCoupons] = useState<ICoupons[]>([]);
  const [discountCupons, setDiscountCupons] = useState<CouponLines[]>([]);
  const [userShippingBilling, setUserShippingBilling] = useState({
    billing_info: {
      billing_address_1: user ? user.billing_info?.billing_address_1 : "",
      billing_address_2: user ? user.billing_info?.billing_address_2 : "",
      billing_city: user ? user.billing_info?.billing_city : "",
      billing_country: user ? user.billing_info?.billing_country : "",
      billing_email: user ? user.billing_info?.billing_email : "",
      billing_first_name: user ? user.billing_info?.billing_first_name : "",
      billing_last_name: user ? user.billing_info?.billing_last_name : "",
      billing_phone: user ? user.billing_info?.billing_phone : "",
      billing_postcode: user ? user.billing_info?.billing_postcode : "",
      billing_state: user ? user.billing_info?.billing_state : "",
    },
    shipping_info: {
      shipping_address_1: user ? user.shipping_info?.shipping_address_1 : "",
      shipping_address_2: user ? user.shipping_info?.shipping_address_2 : "",
      shipping_city: user ? user.shipping_info?.shipping_city : "",
      shipping_company: user ? user.shipping_info?.shipping_company : "",
      shipping_country: user ? user.shipping_info?.shipping_country : "",
      shipping_first_name: user ? user.shipping_info?.shipping_first_name : "",
      shipping_last_name: user ? user.shipping_info?.shipping_last_name : "",
      shipping_phone: user ? user.shipping_info?.shipping_phone : "",
      shipping_postcode: user ? user.shipping_info?.shipping_postcode : "",
      shipping_state: user ? user.shipping_info?.shipping_state : "",
    },
    line_items: lineItems,
  });
  const [orderId, setOrderId] = useState<number>();
  const [isOrder, setIsOrder] = useState<boolean | null>(null);
  const [isPayment, setIsPayment] = useState(false);
  const [isCheckMethod, setIsCheckMethod] = useState(false);
  const [paymentValidate, setPaymentValidate] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    number | undefined
  >();
  const [methodShipping, setMethodShipping] = useState(0);
  const [methodsShippingList, setMethodsShippingList] = useState<
    ShippingMethods[]
  >([]);
  const [noAllowShipping, setNoAllowShipping] = useState(false);
  const [isSelectedShipping, setIsSelectedShipping] = useState(false);

  const [currency, setCurrency] = useState("");
  const [isCoupon, setIsCoupon] = useState(false);
  const [priceTotalWithCoupon, setPriceTotalWithCoupon] = useState("");
  const [_order, _setOrder] = useState<Order>({} as Order);
  const [validateOrder, setValidateOrder] = useState(false);
  const [shippingPrice, setShippingPrice] = useState(0);

  const [paymentSteps, setPaymentSteps] = useState(1);
  const [openedCodePromo, setOpenedCodePromo] = useState(false);
  const [openDeliveryWays, setOpenDeliveryWays] = useState(false);
  const [codePromoState, setCodePromoState] = useState(false);

  //------------------------------------------tvaResult------------------------------------------------!!
  const tva = 7.7;
  const tvaResult = (cart.totalProductsPrice / 100) * tva;

  useEffect(() => {
    const scrollHeader = () => {
      if (typeof window !== "undefined") {
        if (window.scrollY > 300) {
          _setScroll(true);
        } else {
          _setScroll(false);
        }
      }
    };

    window.addEventListener("scroll", scrollHeader);

    return () => window.removeEventListener("scroll", scrollHeader);
  }, []);

  useEffect(() => {
    setCurrency(
      userShippingBilling.billing_info.billing_country === "CH"
        ? "CHF"
        : ("EUR" && _billingShippingData.billing?.country === "Suisse") ||
          _billingShippingData.billing?.country === "Swiss" ||
          _billingShippingData.billing?.country === "schweizerisch"
        ? "CHF"
        : "EUR"
    );
  }, [
    userShippingBilling.billing_info.billing_country,
    _billingShippingData.billing?.country,
  ]);

  useEffect(() => {
    if (Object.keys(cart).length > 0) {
      const _lineItems = cart.products.map((product) => {
        const product_id = product.id;
        const quantity = product.qty;

        return { product_id, quantity };
      });

      setLineItems(_lineItems);
      setUserShippingBilling({
        ...userShippingBilling,
        line_items: _lineItems,
      });
    }

    // eslint-disable-next-line
  }, [cart]);

  useEffect(() => {
    if (user.token) {
      setUserShippingBilling({
        billing_info: {
          billing_address_1: user.billing_info.billing_address_1,
          billing_address_2: user.billing_info.billing_address_2,
          billing_first_name: user.billing_info.billing_first_name,
          billing_last_name: user.billing_info.billing_last_name,
          billing_email: user.billing_info.billing_email,
          billing_city: user.billing_info.billing_city,
          billing_country: user.billing_info.billing_country,
          billing_postcode: user.billing_info.billing_postcode,
          billing_state: user.billing_info.billing_state,
          billing_phone: user.billing_info.billing_phone,
        },
        shipping_info: {
          shipping_address_1: user.shipping_info.shipping_address_1,
          shipping_address_2: user.shipping_info.shipping_address_2,
          shipping_first_name: user.shipping_info.shipping_first_name,
          shipping_last_name: user.shipping_info.shipping_last_name,
          shipping_city: user.shipping_info.shipping_city,
          shipping_country: user.shipping_info.shipping_country,
          shipping_postcode: user.shipping_info.shipping_postcode,
          shipping_state: user.shipping_info.shipping_state,
          shipping_company: user.shipping_info.shipping_company,
          shipping_phone: user.shipping_info.shipping_phone,
        },
        line_items: lineItems,
      });
      setloged(true);
    } else {
      setloged(false);
    }
    // eslint-disable-next-line
  }, [user, lineItems]);

  const getShippingPrice = useCallback(
    (method: ShippingMethods) => {
      const productsWeight = cart.products.reduce(
        (acc, item) => {
          const weight = (Number(item.weight) + Number(acc.weight)) * item.qty;

          return { weight: weight };
        },
        { weight: 0 }
      );

      const allowedShipping = method.settings.method_rules.value.map((rule) => {
        const result = rule.conditions.filter((condition) => {
          if (
            productsWeight?.weight >= condition.min &&
            productsWeight?.weight <= condition.max
          ) {
            setShippingPrice(Number(rule.cost_per_order));
            console.log("OK livraison", rule);

            return rule;
          }
        });

        return result;
      });

      if (allowedShipping.flat().length === 0) {
        setNoAllowShipping(true);
      }
    },
    [cart.products]
  );

  const _handleBillingShippingData = (values: IFormValues) => {
    /*  setOpenDeliveryWays(true); */
    console.log("formValues: ", values);
    const billing = {
      last_name: values.billing_last_name,
      first_name: values.shipping_first_name,
      email: values.billing_email,
      phone: values.billing_phone,
      address_1: values.billing_address_1,
      address_2: values.billing_address_2,
      postcode: values.billing_postcode,
      city: values.billing_city,
      state: values.billing_state,
      country: values.billing_country,
    };

    const shipping = {
      last_name: values.shipping_last_name,
      first_name: values.shipping_first_name,
      phone: values.shipping_phone,
      address_1: values.shipping_address_1,
      address_2: values.shipping_address_2,
      postcode: values.shipping_postcode,
      city: values.shipping_city,
      state: values.shipping_state,
      country: values.shipping_country,
    };
    _setBillingShippingData({ billing, shipping });
    setChangeBillingView(true);
    setPaymentSteps(2);
  };

  const _sendOrder = useCallback(async () => {
    setValidateOrder(true);
    const couponsCodeArray = usedCoupons.map((coupon) => {
      return { code: coupon.code };
    });

    const order = {
      payment_method: "Pedding",
      payment_method_title: "Pedding",
      currency,
      billing: {
        first_name:
          userShippingBilling.billing_info.billing_first_name ||
          _billingShippingData.billing?.first_name,
        last_name:
          userShippingBilling.billing_info.billing_last_name ||
          _billingShippingData.billing?.last_name,
        address_1:
          userShippingBilling.billing_info.billing_address_1 ||
          _billingShippingData.billing?.address_1,
        address_2:
          userShippingBilling.billing_info.billing_address_2 ||
          _billingShippingData.billing?.address_2,
        city:
          userShippingBilling.billing_info.billing_city ||
          _billingShippingData.billing?.city,
        state:
          userShippingBilling.billing_info.billing_state ||
          _billingShippingData.billing?.state,
        postcode:
          userShippingBilling.billing_info.billing_postcode ||
          _billingShippingData.billing?.postcode,
        country:
          userShippingBilling.billing_info.billing_country ||
          _billingShippingData.billing?.country,
        email:
          userShippingBilling.billing_info.billing_email ||
          _billingShippingData.billing?.email,
        phone:
          userShippingBilling.billing_info.billing_phone ||
          _billingShippingData.billing?.phone,
      },
      shipping: {
        first_name:
          userShippingBilling.shipping_info.shipping_first_name ||
          _billingShippingData.shipping?.first_name,
        last_name:
          userShippingBilling.shipping_info.shipping_last_name ||
          _billingShippingData.shipping?.last_name,
        address_1:
          userShippingBilling.shipping_info.shipping_address_1 ||
          _billingShippingData.shipping?.address_1,
        address_2:
          userShippingBilling.shipping_info.shipping_address_2 ||
          _billingShippingData.shipping?.address_2,
        phone:
          userShippingBilling.shipping_info.shipping_phone ||
          _billingShippingData.shipping?.phone,
        city:
          userShippingBilling.shipping_info.shipping_city ||
          _billingShippingData.shipping?.city,
        state:
          userShippingBilling.shipping_info.shipping_state ||
          _billingShippingData.shipping?.state,
        postcode:
          userShippingBilling.shipping_info.shipping_postcode ||
          _billingShippingData.shipping?.postcode,
        country:
          userShippingBilling.shipping_info.shipping_country ||
          _billingShippingData.shipping?.country,
      },
      line_items: lineItems,
      coupon_lines: couponsCodeArray,
    };

    if (couponsCodeArray.length > 0) {
      setIsCoupon(true);
    }

    if (isCoupon === false) {
      const response = await wc_createOrder(order);
      _setOrder(response);
      setCodePromoState(false);

      orderIdRef.current = response.id;
      lineItemsRef.current = response.line_items as ILineItems[];
      const shippinResult = response.shipping_total;
      shippingPriceRef.current = Number(shippinResult);

      setOrderId(response.id);
      setDiscountCupons(response.coupon_lines);
      setIsPayment(true);

      console.log("responseOrder", response);

      setPriceTotalWithCoupon(
        (
          cart.totalProductsPrice +
          shippingPrice -
          Number(response.discount_total)
        ).toFixed(2)
      );
    } else {
      return;
    }
    setValidateOrder(false);

    ///////////////////////////////////////////////////////////////
  }, [
    lineItems,
    userShippingBilling,
    _billingShippingData,
    usedCoupons,
    currency,
    isCoupon,
    shippingPrice,
    cart.totalProductsPrice,
  ]);

  const checkout = useCallback(async () => {
    if (codePromoState === false && paymentSteps !== 3) {
      return;
    }

    const couponsCodeArray = usedCoupons.map((coupon) => {
      return { code: coupon.code };
    });

    if (couponsCodeArray.length > 0) {
      let validatedCoupon = confirm("Vous avez validé vos Codes Promo?");

      if (validatedCoupon === false) {
        return;
      }
    }

    setIsOrder(false);
    setPaymentValidate(true);

    const currencySelected =
      userShippingBilling.billing_info.billing_country === "CH"
        ? "CHF"
        : ("EUR" && _billingShippingData.billing?.country === "Suisse") ||
          _billingShippingData.billing?.country === "Swiss" ||
          _billingShippingData.billing?.country === "schweizerisch"
        ? "CHF"
        : "EUR";

    await _sendOrder();
    setValidateOrder(false);

    const productsCheckout = lineItemsRef.current?.map((product) => {
      const id = product.id;
      const name = product.name;
      const price = product.price * product.quantity;
      const qty = product.quantity;
      const sku = product.sku ? product.sku : "no-sku";

      return { id, name, price, qty, sku };
    });

    if (Object.keys(cart).length > 0) {
      const { data } = await apiPFinance.post("transaction-create", {
        productsCheckout,
        orderId: orderIdRef.current,
        currency: currencySelected,
        shippingTaxe: shippingPrice,
      });

      setPaymentMethods(data.paymentMethods);
      setTransactionId(data.transactionId);

      if (data) {
        setIsOrder(true);
      }
    }
  }, [
    cart,
    _billingShippingData.billing?.country,
    userShippingBilling.billing_info.billing_country,
    _sendOrder,
    usedCoupons,
    shippingPrice,
    codePromoState,
    paymentSteps,
  ]);

  const validateCheckout = useCallback(async () => {
    const query = { id: transactionId, orderId: orderId };
    const { data } = await apiPFinance.post("transaction-validate", query);

    if (typeof window !== "undefined") {
      window.location.href = data;
    }
  }, [transactionId, orderId]);

  const updateTransaction = useCallback(
    async (method: PostFinancePaymentMethods, index: number) => {
      setSelectedPaymentMethod(index);
      setIsCheckMethod(true);

      const { data } = await apiPFinance.post("transaction-update", {
        id: transactionId,
        orderId: orderId,
        methodId: method.id,
      });

      console.log("dataUpdated::", data);

      setTransactionId(data);

      await _updateOrder(orderId as number, method.name);

      if (data) {
        setIsCheckMethod(false);
        setPaymentValidate(false);
      }
    },
    [orderId, transactionId]
  );

  const openCodePromo = () => {
    setOpenedCodePromo(!openedCodePromo);
    setPaymentSteps(3);
  };

  const selectSHPmethod = useCallback(
    (method: ShippingMethods, index: number) => {
      if (Object.keys(_order).length > 0) {
        return;
      }

      setMethodShipping(index);
      if (method.method_id === "local_pickup") {
        setShippingPrice(0);
      } else if (method.method_id === "flexible_shipping_single") {
        getShippingPrice(method);
      }
    },
    [getShippingPrice, _order]
  );

  const codePromoSteps = useCallback(() => {
    setCodePromoState(true);
    setIsPayment(false);
  }, []);

  const updateForm = () => {
    setChangeBillingView(false);
  };

  const getShippingZone = useCallback(async () => {
    if (paymentSteps !== 2) {
      return;
    }

    setIsSelectedShipping(true);

    let selectedCountry = 0;

    const country =
      userShippingBilling.shipping_info?.shipping_country ||
      _billingShippingData.shipping?.country
        ? userShippingBilling.shipping_info?.shipping_country ||
          _billingShippingData.shipping?.country
        : userShippingBilling.billing_info.billing_country ||
          _billingShippingData.billing?.country;

    switch (country) {
      case "CH":
        selectedCountry = 1;
        break;
      case "ES":
        selectedCountry = 4;
        break;
      default:
        selectedCountry = 3;
        break;
    }

    const response = await getShippingZoneMethods(selectedCountry);

    setMethodsShippingList(response);

    if (response) {
      setIsSelectedShipping(false);
      setOpenDeliveryWays(true);
    }

    getShippingPrice(response[0]);
    setIsPayment(true);
    setPaymentSteps(3);
  }, [
    _billingShippingData.billing?.country,
    userShippingBilling.billing_info.billing_country,
    getShippingPrice,
    _billingShippingData.shipping?.country,
    userShippingBilling.shipping_info.shipping_country,
    paymentSteps,
  ]);

  const deleteCoupons = useCallback(
    (id: number) => {
      const couponsList = usedCoupons.filter((coupon) => coupon.id !== id);
      setusedCoupons(couponsList);

      if (couponsList.length === 0) {
        setCodePromoState(false);
        setIsPayment(true);
      }
    },
    [usedCoupons]
  );

  return (
    <>
      <Container>
        <h1>Votre Commande</h1>
        <Content>
          <div className="content">
            <FormSection className="sections">
              <section className="form_users">
                {" "}
                {!loged && (
                  <div>
                    <p>{haveAccount}</p>
                    <LoginForm />
                    <RegisterForm />
                  </div>
                )}
              </section>
              <section className="sections_title">
                <div className="title">
                  <h2 className={paymentSteps === 1 ? "active" : ""}>
                    <span className="coordonnes font_responsive">
                      1. Vos coordonnées
                    </span>
                    {changeBillinhView && (
                      <button
                        className="btn_update"
                        onClick={updateForm}
                        disabled={Object.keys(_order).length > 0}
                      >
                        Modifier
                      </button>
                    )}
                  </h2>
                </div>
                {changeBillinhView ? (
                  <AddressView>
                    <UserInfosView
                      _billingShippingData={_billingShippingData}
                      userShippingBilling={userShippingBilling}
                    />
                  </AddressView>
                ) : (
                  <BillingShippingForm
                    handleBillingShippingData={_handleBillingShippingData}
                  />
                )}
              </section>
              <section className="shipping">
                <div className="title" onClick={getShippingZone}>
                  <div
                    className={
                      paymentSteps === 2
                        ? "active2 ship_title "
                        : paymentSteps === 3
                        ? "completed2 ship_title"
                        : "disableb ship_title"
                    }
                  >
                    <h2 className="font_responsive"> 2. {wayDelivery}</h2>
                    <span>{isSelectedShipping && <Spiner />}</span>
                  </div>
                </div>

                {openDeliveryWays && (
                  <ShipMethods>
                    <div className="ship_methodsList">
                      {noAllowShipping ? (
                        <h4>Shipping not allowed</h4>
                      ) : (
                        methodsShippingList.map((method, index) => {
                          return (
                            <ShipItem
                              key={method.id}
                              onClick={() => selectSHPmethod(method, index)}
                            >
                              <div>
                                {methodShipping === index ? (
                                  <IoMdRadioButtonOk />
                                ) : (
                                  <IoMdRadioButtonNot />
                                )}
                              </div>
                              <div className="ship_methods_name">
                                {method.method_title}
                              </div>
                            </ShipItem>
                          );
                        })
                      )}
                    </div>
                  </ShipMethods>
                )}
              </section>

              <section className="code_promo">
                <div className="title" onClick={openCodePromo}>
                  <h2
                    className={
                      paymentSteps === 3
                        ? "active3 font_responsive"
                        : "disabled3 font_responsive"
                    }
                  >
                    3. Code Promo
                  </h2>
                </div>
                {openedCodePromo && (
                  <div className="coupon_section">
                    <div className="coupon_code_block">
                      <CouponsCode
                        userMail={
                          userShippingBilling.billing_info.billing_email ||
                          _billingShippingData.billing?.email
                        }
                        userID={user.profile?.id}
                        userGrp={user.profile?.wcb2b_group}
                        setusedCoupons={setusedCoupons}
                        usedCoupons={usedCoupons}
                        codePromoSteps={codePromoSteps}
                      />
                    </div>

                    <CouponsList>
                      {usedCoupons.map((coupon) => {
                        return (
                          <div key={coupon.id} className="couponsList_block">
                            <button
                              className="closeButton"
                              onClick={() => deleteCoupons(coupon.id)}
                            ></button>
                            <div>{coupon.description}</div>
                          </div>
                        );
                      })}
                    </CouponsList>
                    <BtnCouponsBlock>
                      <button
                        type="button"
                        onClick={_sendOrder}
                        disabled={!codePromoState}
                        className={
                          codePromoState &&
                          usedCoupons.length > 0 &&
                          Object.keys(_order).length === 0
                            ? "active"
                            : "desatived"
                        }
                      >
                        <span>Valider ma commande</span>
                        <span>{validateOrder && <Spiner />}</span>
                      </button>
                    </BtnCouponsBlock>
                  </div>
                )}
              </section>
              <section className="methods_payment">
                <div
                  onClick={checkout}
                  className={
                    isPayment && codePromoState === false
                      ? "active btn_payment_method"
                      : "disabled btn_payment_method"
                  }
                >
                  <h2 className="font_responsive">4. Paiement</h2>

                  <span>{isOrder === false && <Spiner />}</span>
                </div>

                <div className="payment_block">
                  <Payment>
                    <div
                      className={
                        paymentMethodes.length > 0
                          ? "payment_container"
                          : "payment_container no_list"
                      }
                    >
                      <div className="payment_list">
                        <div className="payments_block">
                          {paymentMethodes.length > 0 &&
                            paymentMethodes.map((method, index) => {
                              return (
                                <PaymentMethods key={method.id}>
                                  <div className="methods">
                                    <div
                                      onClick={() =>
                                        updateTransaction(method, index)
                                      }
                                    >
                                      {selectedPaymentMethod === index ? (
                                        <IoMdRadioButtonOk />
                                      ) : (
                                        <IoMdRadioButtonNot />
                                      )}
                                    </div>
                                    <div className="logo_box">
                                      <Image
                                        src={method.resolvedImageUrl}
                                        width={50}
                                        height={50}
                                        alt="logo-payment-methods"
                                      />
                                    </div>
                                    <div className="method_name">
                                      {method.name}
                                    </div>
                                  </div>
                                </PaymentMethods>
                              );
                            })}
                        </div>

                        {paymentMethodes.length > 0 && (
                          <div className="button_block btn_payment">
                            <button
                              onClick={validateCheckout}
                              className={
                                isCheckMethod || paymentValidate
                                  ? "disabled"
                                  : ""
                              }
                              disabled={isCheckMethod || paymentValidate}
                            >
                              <div
                                className={
                                  isCheckMethod === false
                                    ? "btn_payment_method active"
                                    : "disabled btn_payment_method"
                                }
                              >
                                <span>
                                  <h2>{payment}</h2>
                                </span>
                                <span>{isCheckMethod && <Spiner />}</span>
                              </div>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </Payment>
                </div>
              </section>
            </FormSection>
            <div className="order_section">
              <OrderSession scrollref={_scroll}>
                <div className="order_section_block">
                  <div className="cart_products">
                    <h2>Résumé de votre commande</h2>
                    <div className="prod_block">
                      {cart.totalProductsCount > 0 ? (
                        cart.products.map((product) => {
                          return (
                            <ProductCart key={product.id}>
                              <div className="product_image">
                                <Image
                                  src={product.images[0].src}
                                  alt={product.name}
                                  height={50}
                                  width={50}
                                />

                                <span>{product.name}</span>
                              </div>
                              <span className="product_price">
                                {product.qty}x CHF {product.price}
                              </span>
                            </ProductCart>
                          );
                        })
                      ) : (
                        <div>
                          <p>{emptyCartMessage}</p>
                        </div>
                      )}
                    </div>
                    <div className="taxe_block">
                      <div className="taxes">
                        <div className="taxes_item">
                          <div>Valeur de marchandise(T.T.C)</div>
                          <div className="price_block">
                            <span>{cart.totalProductsPrice?.toFixed(2)} </span>
                            <span>CHF</span>
                          </div>
                        </div>
                        <div className="taxes_item">
                          <div>dont TVA ({tva}%): (incluse) </div>
                          <div>
                            {Object.keys(_order).length > 0
                              ? _order.total_tax
                              : tvaResult.toFixed(2)}{" "}
                            CHF
                          </div>
                        </div>
                        <div className="taxes_item">
                          <div>Frais denvoi: (T.T.C)</div>
                          <div>{shippingPrice} CHF</div>
                        </div>
                        <div className="taxes_item">
                          <div>Frais de payment: (T.T.C)</div>
                          <div> CHF</div>
                        </div>
                        <div>
                          {discountCupons.map((coupon) => {
                            return (
                              <div key={coupon.id} className="coupons_block">
                                <div className="coupons">
                                  <div>Code Promo {coupon.code}</div>
                                  <div>- {coupon.discount} CHF</div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                    <div className="total_block">
                      <h5 className="sousTotalTxt">
                        <span>Total (T.T.C): </span>
                        <span>
                          CHF{" "}
                          {!!priceTotalWithCoupon
                            ? priceTotalWithCoupon
                            : cart.totalProductsPrice + shippingPrice}{" "}
                        </span>
                      </h5>
                    </div>
                  </div>
                </div>
              </OrderSession>
            </div>
          </div>
        </Content>
      </Container>
    </>
  );
}

CheckoutMobility.getLayout = function getLayout(page: ReactElement) {
  return <LayoutMobility icon={thankIcon}>{page}</LayoutMobility>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {},
  };
};
