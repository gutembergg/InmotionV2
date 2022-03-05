import Image from "next/image";
import { GetServerSideProps } from "next";
import router from "next/router";
import React, {
  ReactElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Report } from "notiflix";
import uuid from "react-uuid";
import useTranslation from "next-translate/useTranslation";

import CouponsCode from "../../../components/CouponsCode";
import LoginForm from "../../../components/Login";
import useCart from "../../../hooks/useCart";
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
import LayoutMobility from "../../../Layout/LayoutMobility";
import useUser from "../../../hooks/useUser";
import apiPFinance from "../../../services/postFinanceApi/apiPFinance";
import { PostFinancePaymentMethods } from "../../../interfaces/PostFinance";
import Spiner from "../../../components/Spiner";
import useCurrency from "../../../hooks/useCurrency";
import { ICoupons } from "../../../interfaces/ICoupons";
import { CouponLines, Order } from "../../../interfaces/Order";
import { getShippingZoneMethods } from "../../../services/woocommerceApi/ShippingMethods";
import { ShippingMethods } from "../../../interfaces/ShippingMethods";
import { Collapse } from "react-collapse";
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
  PaymentBankTransfert,
  WayPaymentRadio,
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

  // Traductions///////////////////////////////////////////////
  const { t } = useTranslation();
  const haveAccount = t("checkout-mobility:haveAccount");
  const wayDelivery = t("checkout-mobility:wayDelivery");
  const payment = t("checkout-mobility:payment");
  const emptyCartMessage = t("checkout-mobility:emptyCartMessage");
  const orderPreview = t("checkout-mobility:orderPreview");
  const vosCoordonnees = t("checkout-mobility:vosCoordonnees");
  const chooseMethdPay = t("checkout-mobility:chooseMethdPay");
  const proceedToPayment = t("checkout-mobility:proceedToPayment");
  const commodityValue = t("checkout-mobility:commodityValue");
  const shippingTraduction = t("checkout-mobility:shippingTraduction");
  const paymentFees = t("checkout-mobility:paymentFees");
  const yourOrder = t("checkout-mobility:yourOrder");
  const advancePayment = t("checkout-mobility:advancePayment");
  const onlinePayment = t("checkout-mobility:onlinePayment");
  const totalttc = t("checkout-mobility:totalttc");
  const validateCoupon = t("checkout-mobility:validateCoupon");
  const weightMaxTitle = t("checkout-mobility:weightMaxTitle");
  const weightMaxDescr = t("checkout-mobility:weightMaxDescr");
  const errCoutryCurrencyTitle = t("checkout-mobility:errCoutryCurrencyTitle");
  const errCoutryCurrencyDescrCHF = t("checkout-mobility:errCoutryCurrencyDescCHF");
  const errCoutryCurrencyDescrEUR = t("checkout-mobility:errCoutryCurrencyDescEUR");
  
  
  const [_billingShippingData, _setBillingShippingData] =
    useState<OrderValidation>({} as OrderValidation);
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
  const [qtyCartProducts, setQtyCartProducts] = useState(false);
  const [wayOfPaymentSelected, setWayOfPaymentSelected] = useState(0);
  const [openWasOfPayments, setOpenWayOfPayments] = useState(false);
  const [stopTransaction, setStopTransaction] = useState(false);
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
      setQtyCartProducts(cart.products.length > 3 ? true : false);
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
        const scrollValue = 100;

        const viewWidth = window.innerWidth;

        if (viewWidth > 1024) {
          if (window.scrollY > scrollValue) {
            setPositionOrderSection(true);
          } else {
            setPositionOrderSection(false);
          }
        }
        if (viewWidth < 1024) {
          if (window.scrollY > 150) {
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
    async (method: ShippingMethods) => {
      if (Object.keys(cart).length === 0) {
        alert("Erreur");
        return;
      }
      const productsWeight = cart.products.reduce(
        (acc, item) => {
          const weight = (Number(item.weight) + Number(acc.weight)) * item.qty;

          return { weight: weight };
        },
        { weight: 0 }
      );

      if (productsWeight.weight > 89 && method.method_id !== "local_pickup") {
        setStopTransaction(true);
        Report.failure(
          `${weightMaxTitle}`,
          `${weightMaxDescr}`,
          "Ok",() => {
            router.push("/inmotion-mobility/contact")
            },
        );

        return;
      }

      if (method.method_id === "local_pickup") {
        setStopTransaction(false);
        setTotalCartPriceConverted(cart.totalProductsPrice);
      }

      if (method.id === 5 || method.id === 7) {
        const costPerOrder = method.settings.method_rules.value.filter(
          (item) => item.cost_per_order
        );

        const euroValue = await convertSingleNumber(
          Number(costPerOrder[0].cost_per_order)
        );
        setShippingPrice(
          CHFCurrency ? Number(costPerOrder[0].cost_per_order) : euroValue
        );
        setTotalCartPriceConverted(
          CHFCurrency
            ? cart.totalProductsPrice + Number(costPerOrder[0].cost_per_order)
            : cart.totalProductsPrice + euroValue
        );
      }

      method.settings.method_rules?.value.forEach((rule) => {
        rule.conditions.forEach(async (condition) => {
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
          }
        });
      });
    },
    [CHFCurrency, cart,weightMaxTitle,weightMaxDescr]
  );

  const _handleBillingShippingData = async (values: IFormValues) => {
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
      (currentyCurrency === "EUR" && shipping.country === "CH") 
    ) {
      Report.failure(
        `${errCoutryCurrencyTitle}`,
        `${errCoutryCurrencyDescrCHF}`,
        "Okay"
        );
        return;
      } else if (
        (currentyCurrency === "CHF" && billing.country !== "CH")
        ) {
          Report.failure(
            `${errCoutryCurrencyTitle}`,
            `${errCoutryCurrencyDescrEUR}`,
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

    setPaymentSteps(2);
    await getShippingZone(shipping.country);
  };

  const _sendOrder = useCallback(async () => {
    setValidateOrder(true);
    const couponsCodeArray = usedCoupons.map((coupon) => {
      return { code: coupon.code };
    });

    const shippingLines = [
      {
        method_id: _shippingMethods.method_id,
        method_title: _shippingMethods.method_title,
        total: String(shippingPrice),
      },
    ];

    const order = {
      payment_method: "Anticipe",
      payment_method_title: "Anticipe",
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
  }, [
    lineItems,
    _billingShippingData,
    usedCoupons,
    isCoupon,
    shippingPrice,
    _shippingMethods,
    user,
    currentyCurrency,
  ]);

  const checkout = useCallback(async () => {
    try {
      if (codePromoState === false && paymentSteps !== 4) {
        return;
      }

      if (wayOfPaymentSelected === 0) {
        await _sendOrder();

        if (typeof window !== "undefined") {
          localStorage.removeItem("inmotion:cart");
        }

        router.push(
          `/inmotion-mobility/completed-order?order=${orderIdRef.current}&pf_ts=0`
        );

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
      if (typeof window !== "undefined") {
        router.push("/inmotion-mobility");
      }
    }
  }, [
    cart,
    _sendOrder,
    usedCoupons,
    shippingPrice,
    codePromoState,
    paymentSteps,
    currentyCurrency,
    wayOfPaymentSelected,
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

      setTotalOrder(orederUpdated.total);

      if (typeof window !== "undefined") {
        localStorage.removeItem("inmotion:cart");
        window.location.href = data;
      }
    } catch (error) {
      alert("Une erruer est survenue");
      setErros("Une erruer est survenue");
      if (typeof window !== "undefined") {
        router.push("/inmotion-mobility");
      }
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
        if (typeof window !== "undefined") {
          router.push("/inmotion-mobility");
        }
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

      if (method.id === 2) {
        setShippingPrice(0);
        setShippingMethod(method);
        getShippingPrice(method);
      } else {
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

      console.log("getShippingZoneMethods", response);

      if (response) {
        getShippingPrice(response[0]);
        formatMethodsShippingList(response);

        setIsSelectedShipping(false);
        setOpenDeliveryWays(true);
      }

      setIsPayment(true);
      setPaymentSteps(3);
    },
    // eslint-disable-next-line
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

  const handleWayOfPayment = (selectedWay: number) => {
    setWayOfPaymentSelected(selectedWay);
  };

  const openWayOfPayments = useCallback(() => {
    setPaymentSteps(4);
    setOpenWayOfPayments(true);
  }, []);

  const formatMethodsShippingList = useCallback(
    (methodsList: ShippingMethods[]) => {
      const formatListMethods = methodsList.map((method) => {
        return {
          ...method,
          methodeName: method.id === 2 ? "Point de vente" : "Livraison",
        };
      });

      setMethodsShippingList(formatListMethods);
    },
    []
  );

  const formatPrice = useCallback((price1: number, price2: number) => {
    const total = price1 + price2;
    const formatedTotal = total.toFixed(2);

    return formatedTotal;
  }, []);

  return (
    <>
      <Container>
        <h1>{yourOrder}</h1>
        <section className="form_users">
          {" "}
          {!loged && (
            <div>
              <p>{haveAccount}</p>
              <LoginForm />
            </div>
          )}
        </section>
        <Content>
          <div className="content">
            <FormSection className="sections">
              <section className="sections_title">
                <div className="title">
                  <h2 className={paymentSteps === 1 ? "active" : ""}>
                    <span className="coordonnes font_responsive">
                      1. {vosCoordonnees}
                    </span>
                  </h2>
                </div>

                <BillingShippingForm
                  handleBillingShippingData={_handleBillingShippingData}
                />
              </section>
              <section className="shipping">
                <div className="title">
                  <div
                    className={
                      paymentSteps === 2
                        ? "active2 ship_title "
                        : paymentSteps === 3 || paymentSteps === 4
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
                      {methodsShippingList.map((method, index) => {
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
                              {method.methodeName}
                            </div>
                          </ShipItem>
                        );
                      })}
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
                        : paymentSteps === 4
                        ? "completed font_responsive"
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
                      <span>{validateCoupon}</span>
                      <span>{validateOrder && <Spiner />}</span>
                    </button>
                  </BtnCouponsBlock>
                </Collapse>
              </section>
              <section className="methods_payment">
                <PaymentBankTransfert
                  onClick={openWayOfPayments}
                  disabled={
                    paymentSteps === 3 && !stopTransaction ? false : true
                  }
                >
                  <div
                    className={
                      paymentSteps === 3
                        ? "way_payment_block"
                        : paymentSteps === 4
                        ? "completed"
                        : "disable"
                    }
                  >
                    <h2>4. {chooseMethdPay}</h2>
                  </div>
                </PaymentBankTransfert>

                <Collapse isOpened={openWasOfPayments}>
                  <WayPaymentRadio>
                    <div
                      className="way_payment_radio"
                      onClick={() => handleWayOfPayment(0)}
                    >
                      {wayOfPaymentSelected === 0 ? (
                        <IoMdRadioButtonOk />
                      ) : (
                        <IoMdRadioButtonNot />
                      )}{" "}
                      <h4>{advancePayment}</h4>
                    </div>
                    <div
                      className="way_payment_radio"
                      onClick={() => handleWayOfPayment(1)}
                    >
                      {wayOfPaymentSelected === 1 ? (
                        <IoMdRadioButtonOk />
                      ) : (
                        <IoMdRadioButtonNot />
                      )}{" "}
                      <h4>{onlinePayment}</h4>
                    </div>
                  </WayPaymentRadio>
                </Collapse>

                <button
                  onClick={checkout}
                  className={
                    isPayment && codePromoState === false && paymentSteps === 4
                      ? "active btn_payment_method btn_main"
                      : "disabled btn_payment_method btn_main"
                  }
                  disabled={
                    codePromoState || checkoutClicked || paymentSteps !== 4
                  }
                >
                  <h2 className="font_responsive">5. {proceedToPayment}</h2>

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
              <OrderSession
                positionOrderSection={positionOrderSection}
                qtyCartProducts={qtyCartProducts}
              >
                <div className="order_section_block" ref={cartRef}>
                  <h2 id="title_order">{orderPreview}</h2>
                  <div className="cart_products">
                    <div className="prod_block">
                      {cart.totalProductsCount > 0 ? (
                        cart.products.map((product) => {
                          return (
                            <ProductCart key={product.id}>
                              <div className="product_image">
                                {product.isVariation ? (
                                  <Image
                                    src={product.image.src}
                                    alt={product.name}
                                    height={50}
                                    width={50}
                                  />
                                ) : (
                                  <Image
                                    src={product.images[0].src}
                                    alt={product.name}
                                    height={50}
                                    width={50}
                                  />
                                )}

                                <span className="product_name_cart">
                                  {product.name}
                                </span>
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
                            {commodityValue}(T.T.C)
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
                                : CHFCurrency
                                ? tvaResult.toFixed(2)
                                : "0"}{" "}
                            </span>
                            <span> {CHFCurrency ? "CHF" : "EUR"}</span>
                          </div>
                        </div>
                        <div className="taxes_item">
                          <div className="taxes_title">
                            {shippingTraduction}: (T.T.C)
                          </div>
                          <div>
                            {shippingPrice} {CHFCurrency ? "CHF" : "EUR"}
                          </div>
                        </div>

                        <div className="taxes_item">
                          <div className="taxes_title">
                            {paymentFees}: (T.T.C)
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
                                  <div className="coupon_text">
                                    Code Promo {coupon.code}
                                  </div>
                                  <div>
                                    -{" "}
                                    {Number(coupon.discount) +
                                      Number(coupon.discount_tax)}{" "}
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
                        <span>{totalttc} </span>
                        <span>
                          {CHFCurrency ? "CHF" : "EUR"}{" "}
                          {Object.keys(_order).length > 0
                            ? isValidate
                              ? totalOrder
                              : formatPrice(
                                  totalOrder,
                                  Number(_taxPaymentMethods)
                                )
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
  return <LayoutMobility>{page}</LayoutMobility>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {},
  };
};
