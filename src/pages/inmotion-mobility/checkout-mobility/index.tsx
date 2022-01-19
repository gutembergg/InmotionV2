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

import useCurrency from "../../../hooks/useCurrency";
import { ICoupons } from "../../../interfaces/ICoupons";
import { CouponLines, Order } from "../../../interfaces/Order";
import { getShippingZoneMethods } from "../../../services/woocommerceApi/ShippingMethods";
import {
  MethodsSettingsRules,
  MethodsSettingsRulesValues,
  ShippingMethods,
} from "../../../interfaces/ShippingMethods";
import UserInfosView from "../../../components/CheckoutMobility/UserInfosView";
import { Collapse } from "react-collapse";
import { Report } from "notiflix";
import uuid from "react-uuid";
import { convertSingleNumber } from "../../../utils/addEuroPriceInProducts";

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
  PaymentBankTransfert,
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
  total: string;
  total_tax: string;
  slug: string;
}

export default function CheckoutMobility() {
  const orderIdRef = useRef(0);
  const lineItemsRef = useRef<ILineItems[]>([]);
  const shippingPriceRef = useRef(0);
  const cartRef = useRef<HTMLDivElement>(null);

  const { cart } = useCart();
  const { user } = useUser();
  const { currency: currentyCurrency } = useCurrency();

  const [loged, setloged] = useState(false);

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
  const [_methodPayment, _setMethodPayment] =
    useState<PostFinancePaymentMethods>({} as PostFinancePaymentMethods);

  //------------------------------------------USE STATE COUPONS VALIDES ( COUPON ENTIER AVEC DATA)  ------------------------------------------------!!

  const [usedCoupons, setusedCoupons] = useState<ICoupons[]>([]);
  const [discountCupons, setDiscountCupons] = useState<CouponLines[]>([]);
  const [orderId, setOrderId] = useState<number>();
  const [isOrder, setIsOrder] = useState<boolean | null>(null);
  const [isPayment, setIsPayment] = useState(false);
  const [isCheckMethod, setIsCheckMethod] = useState(false);
  const [paymentValidate, setPaymentValidate] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    number | undefined
  >();

  const [_taxPaymentMethods, setTaxPaymentMethods] = useState("");
  const [methodShipping, setMethodShipping] = useState(0);
  const [methodsShippingList, setMethodsShippingList] = useState<
    ShippingMethods[]
  >([]);
  const [noAllowShipping, setNoAllowShipping] = useState(false);
  const [isSelectedShipping, setIsSelectedShipping] = useState(false);

  const [isCoupon, setIsCoupon] = useState(false);
  const [_order, _setOrder] = useState<Order>({} as Order);
  const [validateOrder, setValidateOrder] = useState(false);
  const [shippingPrice, setShippingPrice] = useState(0);
  const [_shippingMethods, setShippingMethod] = useState<ShippingMethods>(
    {} as ShippingMethods
  );

  const [paymentSteps, setPaymentSteps] = useState(1);
  const [openedCodePromo, setOpenedCodePromo] = useState(false);
  const [openDeliveryWays, setOpenDeliveryWays] = useState(false);
  const [codePromoState, setCodePromoState] = useState(false);
  const [checkoutClicked, setCheckoutClicked] = useState(false);
  const [totalCartPriceConverted, setTotalCartPriceConverted] = useState(0);
  const [totalOrder, setTotalOrder] = useState(0);
  const [positionOrderSection, setPositionOrderSection] = useState(false);
  const [isValidate, setIsValidate] = useState(false);
  const [erros, setErros] = useState("");

  //------------------------------------------tvaResult------------------------------------------------!!
  const CHFCurrency = currentyCurrency === "CHF";
  const tva = CHFCurrency ? 7.7 : 0;
  const tvaResult = CHFCurrency ? (cart.totalProductsPrice / 100) * tva : 0;

  useEffect(() => {
    if (Object.keys(cart).length > 0) {
      const _lineItems = cart.products.map((product) => {
        const product_id = product.id;
        const quantity = product.qty;
        const total = String(product.euroPrice * product.qty);

        if (CHFCurrency) {
          return { product_id, quantity };
        } else {
          return { product_id, quantity, total };
        }
      });

      setLineItems(_lineItems);
      setTotalCartPriceConverted(cart.totalProductsPrice);
    }

    // eslint-disable-next-line
  }, [cart]);

  useEffect(() => {
    if (user.token) {
      setloged(true);
    } else {
      setloged(false);
    }
  }, [user]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const getScrollY = () => {
        const scrollValue = 185;

        const viewWidth = window.innerWidth;

        if (viewWidth > 1024) {
          if (window.scrollY > scrollValue) {
            setPositionOrderSection(true);
          } else {
            setPositionOrderSection(false);
          }
        }
        if (viewWidth < 1024) {
          if (window.scrollY > 220) {
            setPositionOrderSection(true);
          } else {
            setPositionOrderSection(false);
          }
        }
      };

      window.addEventListener("scroll", getScrollY);

      return () => window.removeEventListener("scroll", getScrollY);
    }
  }, []);

  const getShippingPrice = useCallback(
    (method: ShippingMethods) => {
      const productsWeight = cart.products.reduce(
        (acc, item) => {
          const weight = (Number(item.weight) + Number(acc.weight)) * item.qty;

          return { weight: weight };
        },
        { weight: 0 }
      );

      if (method.method_id === "local_pickup") {
        setTotalCartPriceConverted(cart.totalProductsPrice);
      }

      method.settings.method_rules?.value.map((rule) => {
        rule.conditions.filter(async (condition) => {
          if (
            productsWeight?.weight >= condition.min &&
            productsWeight?.weight <= condition.max
          ) {
            const euroValue = await convertSingleNumber(
              Number(rule.cost_per_order)
            );

            setShippingPrice(
              CHFCurrency ? Number(rule.cost_per_order) : euroValue
            );

            const shippingConverted = CHFCurrency
              ? Number(rule.cost_per_order)
              : euroValue;

            const totalPriceWithShipping =
              shippingConverted + cart.totalProductsPrice;
            const totalPriceFormated = Number(
              totalPriceWithShipping.toFixed(2)
            );

            setTotalCartPriceConverted(totalPriceFormated);

            setShippingMethod(method);
            console.log("OK livraison", rule);
            setNoAllowShipping(false);

            return rule;
          } else {
            setNoAllowShipping(true);
          }
        });

        return;
      });
    },
    [cart.products, CHFCurrency, cart.totalProductsPrice]
  );

  const _handleBillingShippingData = async (values: IFormValues) => {
    console.log("formValues: ", values);

    const billing = {
      last_name: values.billing_last_name,
      first_name: values.billing_first_name,
      email: values.billing_email,
      phone: values.billing_phone,
      address_1: values.billing_address_1,
      address_2: values.billing_address_2,
      postcode: values.billing_postcode,
      city: values.billing_city,
      state: values.billing_state,
      country: values.billing_country,
    };

    const isShippingForm = values.isShippingForm;

    const shipping = {
      last_name: isShippingForm
        ? values.shipping_last_name
        : values.billing_last_name,
      first_name: isShippingForm
        ? values.shipping_first_name
        : values.billing_first_name,
      phone: isShippingForm ? values.shipping_phone : values.billing_phone,
      address_1: isShippingForm
        ? values.shipping_address_1
        : values.billing_address_1,
      address_2: isShippingForm
        ? values.shipping_address_2
        : values.billing_address_2,
      postcode: isShippingForm
        ? values.shipping_postcode
        : values.billing_postcode,
      city: isShippingForm ? values.shipping_city : values.billing_city,
      state: isShippingForm ? values.shipping_state : values.billing_state,
      country: isShippingForm
        ? values.shipping_country
        : values.billing_country,
    };

    if (
      (currentyCurrency === "EUR" && shipping.country === "CH") ||
      (currentyCurrency === "CHF" && shipping.country !== "CH")
    ) {
      Report.failure(
        "Erreur adresse invalide",
        "<p>Pour livrer le produit en Suisse vous devez avoir la devise en CHF:</p><br /><br />",
        "Okay"
      );
      return;
    } else if (
      (currentyCurrency === "EUR" && billing.country === "CH") ||
      (currentyCurrency === "CHF" && billing.country !== "CH")
    ) {
      Report.failure(
        "Erreur adresse invalide",
        "<p>Pour livrer le produit en Suisse vous devez avoir la devise en CHF:</p><br /><br />",
        "Okay"
      );
      return;
    }

    const newData = {
      ...user,
      billing_info: {
        billing_address_1: values.billing_address_1,
        billing_address_2: values.billing_address_2,
        billing_city: values.billing_city,
        billing_country: values.billing_country,
        billing_email: values.billing_email,
        billing_first_name: values.billing_first_name,
        billing_last_name: values.billing_last_name,
        billing_phone: values.billing_phone,
        billing_postcode: values.billing_postcode,
        billing_state: values.billing_state,
      },
      shipping_info: {
        shipping_address_1: values.shipping_address_1,
        shipping_address_2: values.shipping_address_2,
        shipping_city: values.shipping_city,
        shipping_company: "",
        shipping_country: values.shipping_country,
        shipping_first_name: values.shipping_first_name,
        shipping_last_name: values.shipping_last_name,
        shipping_phone: values.shipping_phone,
        shipping_postcode: values.shipping_postcode,
        shipping_state: values.shipping_state,
      },
    };

    if (typeof window !== "undefined" && Object.keys(user).length > 0) {
      localStorage.setItem("inmotion:user", JSON.stringify(newData));
    }

    _setBillingShippingData({
      billing,
      shipping,
      isShippingForm,
    });

    setChangeBillingView(true);
    setPaymentSteps(2);
    await getShippingZone(shipping.country);
  };

  const _sendOrder = useCallback(async () => {
    setValidateOrder(true);
    const couponsCodeArray = usedCoupons.map((coupon) => {
      return { code: coupon.code };
    });

    let shippingLines: any = [];
    if (!noAllowShipping) {
      shippingLines = [
        {
          method_id: _shippingMethods.method_id,
          method_title: _shippingMethods.method_title,
          total: String(shippingPrice),
        },
      ];
    } else {
      shippingLines = [];
    }

    const order = {
      payment_method: "Pedding",
      payment_method_title: "Pedding",
      currency: currentyCurrency,
      billing: {
        first_name: _billingShippingData.billing?.first_name,
        last_name: _billingShippingData.billing?.last_name,
        address_1: _billingShippingData.billing?.address_1,
        address_2: _billingShippingData.billing?.address_2,
        city: _billingShippingData.billing?.city,
        state: _billingShippingData.billing?.state,
        postcode: _billingShippingData.billing?.postcode,
        country: _billingShippingData.billing?.country,
        email: _billingShippingData.billing?.email,
        phone: _billingShippingData.billing?.phone,
      },

      shipping: {
        first_name: _billingShippingData.shipping?.first_name,
        last_name: _billingShippingData.shipping?.last_name,
        address_1: _billingShippingData.shipping?.address_1,
        address_2: _billingShippingData.shipping?.address_2,
        phone: _billingShippingData.shipping?.phone,
        city: _billingShippingData.shipping?.city,
        state: _billingShippingData.shipping?.state,
        postcode: _billingShippingData.shipping?.postcode,
        country: _billingShippingData.shipping?.country,
      },
      line_items: lineItems,
      coupon_lines: couponsCodeArray,
      shipping_lines: shippingLines,

      customer_id: Object.keys(user).length > 0 ? user.profile.id : 0,
    };

    if (couponsCodeArray.length > 0) {
      setIsCoupon(true);
    }

    if (isCoupon === false) {
      const response = await wc_createOrder(order);
      _setOrder(response);
      setCodePromoState(false);

      setTotalOrder(Number(response.total));

      orderIdRef.current = response.id;
      lineItemsRef.current = response.line_items as ILineItems[];
      const shippinResult = response.shipping_total;
      shippingPriceRef.current = Number(shippinResult);

      setOrderId(response.id);
      setDiscountCupons(response.coupon_lines);
      setIsPayment(true);

      console.log("responseOrder", response);
    } else {
      return;
    }
    setValidateOrder(false);

    ///////////////////////////////////////////////////////////////
  }, [
    lineItems,
    _billingShippingData,
    usedCoupons,
    isCoupon,
    shippingPrice,
    _shippingMethods,
    user,
    currentyCurrency,
    noAllowShipping,
  ]);

  const checkout = useCallback(async () => {
    try {
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

      setCheckoutClicked(true);
      setIsOrder(false);
      setPaymentValidate(true);

      await _sendOrder();
      setValidateOrder(false);

      const productsCheckout = lineItemsRef.current?.map((product) => {
        const id = product.id;
        const name = product.name;
        const price = Number(product.total) + Number(product.total_tax);
        const qty = product.quantity;
        const sku = product.sku + String(uuid());

        return { id, name, price, qty, sku };
      });

      if (Object.keys(cart).length > 0) {
        const { data } = await apiPFinance.post("transaction-create", {
          productsCheckout,
          orderId: orderIdRef.current,
          currency: currentyCurrency,
          shippingTaxe: shippingPrice,
        });

        const _paymentMethodes = data.paymentMethods.filter(
          (method: any) => method.name !== "Facture"
        );

        const methodsPaymentObject = _paymentMethodes.reduce(
          (
            acc: PostFinancePaymentMethods[],
            item: PostFinancePaymentMethods
          ) => {
            let taxState = {};
            switch (item.name) {
              case "PostFinance e-finance":
                taxState = { ...item, taxMethodsPayments: 1.3 };
                break;
              case "Carte PostFinance":
                taxState = { ...item, taxMethodsPayments: 1.3 };
                break;
              case "PayPal":
                taxState = { ...item, taxMethodsPayments: 2 };
                break;
              case "Carte de crédit/débit":
                taxState = { ...item, taxMethodsPayments: 2 };
                break;
              case "TWINT":
                taxState = { ...item, taxMethodsPayments: 1.3 };
                break;
            }

            const object = [...acc, taxState];

            return object;
          },
          []
        );

        setPaymentMethods(methodsPaymentObject);
        setTransactionId(data.transactionId);

        if (data) {
          setIsOrder(true);
        }
      }
    } catch (error) {
      alert("Une erreur est survenue!");
      setErros("Une erreur est survenue!");
    }
  }, [
    cart,
    _sendOrder,
    usedCoupons,
    shippingPrice,
    codePromoState,
    paymentSteps,
    currentyCurrency,
  ]);

  const validateCheckout = useCallback(async () => {
    try {
      const query = { id: transactionId, orderId: orderId };
      const { data } = await apiPFinance.post("transaction-validate", query);
      setIsValidate(true);

      const orederUpdated = await _updateOrder(
        orderId as number,
        _methodPayment.name,
        String(transactionId),
        _taxPaymentMethods
      );

      console.log("orederUpdated", orederUpdated);

      setTotalOrder(orederUpdated.total);

      if (typeof window !== "undefined") {
        localStorage.removeItem("inmotion:cart");
        window.location.href = data;
      }
    } catch (error) {
      alert("Une erruer est survenue");
      setErros("Une erruer est survenue");
    }
  }, [transactionId, orderId, _methodPayment.name, _taxPaymentMethods]);

  const updateTransaction = useCallback(
    async (method: PostFinancePaymentMethods, index: number) => {
      try {
        setSelectedPaymentMethod(index);
        setIsCheckMethod(true);

        const totalPriceWithTaxMethodsPayment = lineItemsRef.current.reduce(
          (acc, item) => {
            const subTotal =
              Number(acc.toFixed(2)) +
              (Number(item.total) + Number(item.total_tax));

            const total = subTotal;

            return total;
          },
          0
        );

        const taxPaymentMethods = (
          (totalPriceWithTaxMethodsPayment / 100) *
          method.taxMethodsPayments
        ).toFixed(2);

        setTaxPaymentMethods(taxPaymentMethods);
        _setMethodPayment(method);

        const productsCheckout = lineItemsRef.current?.map((product) => {
          const id = product.id;
          const name = product.name;
          const price = Number(product.total) + Number(product.total_tax);
          const qty = product.quantity;
          const sku = product.sku + String(uuid());

          return { id, name, price, qty, sku };
        });

        const { data } = await apiPFinance.post("transaction-update", {
          id: transactionId,
          orderId: orderId,
          methodId: method.id,
          shippingTaxe: shippingPrice,
          productsCheckout,
          taxPaymentMethods,
        });

        setTransactionId(data);

        if (data) {
          setIsCheckMethod(false);
          setPaymentValidate(false);
        }
      } catch (error) {
        alert("Une erruer est survenue");
        setErros("Une erruer est survenue");
      }
    },
    [orderId, transactionId, shippingPrice]
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
        setShippingMethod(method);
        getShippingPrice(method);
      } else if (method.method_id === "flexible_shipping_single") {
        setShippingMethod(method);
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

  const getShippingZone = useCallback(
    async (shippingCountry: string) => {
      setIsSelectedShipping(true);

      let selectedCountry = 0;

      const country = shippingCountry;

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

      if (response) {
        getShippingPrice(response[0]);
        setMethodsShippingList(response);
        setIsSelectedShipping(false);
        setOpenDeliveryWays(true);
      }

      setIsPayment(true);
      setPaymentSteps(3);
    },
    [getShippingPrice]
  );

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
                    />
                  </AddressView>
                ) : (
                  <BillingShippingForm
                    handleBillingShippingData={_handleBillingShippingData}
                  />
                )}
              </section>
              <section className="shipping">
                <div className="title">
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

                <Collapse isOpened={openDeliveryWays}>
                  <ShipMethods>
                    <div className="ship_methodsList">
                      {noAllowShipping ? (
                        <h4 className="no_allowed_msg">No allowed shipping</h4>
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
                </Collapse>
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

                <Collapse isOpened={openedCodePromo}>
                  <div className="coupon_code_block">
                    <CouponsCode
                      userMail={_billingShippingData.billing?.email}
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
                </Collapse>
              </section>
              <section className="methods_payment">
                <PaymentBankTransfert>
                  <h2>Bank Transfert</h2>
                </PaymentBankTransfert>
                <button
                  onClick={checkout}
                  className={
                    isPayment && codePromoState === false
                      ? "active btn_payment_method"
                      : "disabled btn_payment_method"
                  }
                  disabled={codePromoState || checkoutClicked}
                >
                  <h2 className="font_responsive">4. Paiement</h2>

                  <span>{isOrder === false && <Spiner />}</span>
                </button>

                <Collapse
                  isOpened={paymentMethodes.length > 0}
                  className="payment_block"
                >
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
                                      {method.name} +{" "}
                                      {method.taxMethodsPayments}%
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
                                <span className="btn_end_payment">
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
                </Collapse>
              </section>
            </FormSection>
            <div className="order_section">
              <OrderSession positionOrderSection={positionOrderSection}>
                <div className="order_section_block" ref={cartRef}>
                  <h2 id="title_order">Résumé de votre commande</h2>
                  <div className="cart_products">
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
                                {product.qty}x {CHFCurrency ? "CHF" : "EUR"}{" "}
                                {CHFCurrency
                                  ? product.price
                                  : product.euroPrice}
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
                          <div className="taxes_title">
                            Valeur de marchandise(T.T.C)
                          </div>
                          <div className="price_block">
                            <span>{cart.totalProductsPrice?.toFixed(2)} </span>
                            <span>{CHFCurrency ? "CHF" : "EUR"}</span>
                          </div>
                        </div>
                        <div className="taxes_item">
                          <div className="taxes_title">
                            dont TVA ({tva}%): (incluse){" "}
                          </div>
                          <div className="price_block">
                            <span>
                              {Object.keys(_order).length > 0
                                ? _order.total_tax
                                : _billingShippingData.shipping?.country ===
                                    "CH" ||
                                  (_billingShippingData.shipping?.country ===
                                    "" &&
                                    _billingShippingData.billing?.country ===
                                      "CH")
                                ? tvaResult.toFixed(2)
                                : "0"}{" "}
                            </span>
                            <span> {CHFCurrency ? "CHF" : "EUR"}</span>
                          </div>
                        </div>
                        <div className="taxes_item">
                          <div className="taxes_title">
                            Frais denvoi: (T.T.C)
                          </div>
                          <div>
                            {shippingPrice} {CHFCurrency ? "CHF" : "EUR"}
                          </div>
                        </div>

                        <div className="taxes_item">
                          <div className="taxes_title">
                            Frais de payment: (T.T.C)
                          </div>
                          <div>
                            {!!_taxPaymentMethods ? _taxPaymentMethods : 0}{" "}
                            {CHFCurrency ? "CHF" : "EUR"}
                          </div>
                        </div>
                        <div>
                          {discountCupons.map((coupon) => {
                            return (
                              <div key={coupon.id} className="coupons_block">
                                <div className="coupons">
                                  <div>Code Promo {coupon.code}</div>
                                  <div>
                                    - {coupon.discount}{" "}
                                    {CHFCurrency ? "CHF" : "EUR"}
                                  </div>
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
                          {CHFCurrency ? "CHF" : "EUR"}{" "}
                          {Object.keys(_order).length > 0
                            ? isValidate
                              ? totalOrder
                              : totalOrder + Number(_taxPaymentMethods)
                            : totalCartPriceConverted.toFixed(2)}
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
