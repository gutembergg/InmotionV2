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
import { Collapse } from "react-collapse";

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
import product from "next-seo/lib/jsonld/product";

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

  const [currency, setCurrency] = useState("");
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

  //------------------------------------------tvaResult------------------------------------------------!!
  const tva = 7.7;
  const tvaResult = (cart.totalProductsPrice / 100) * tva;
console.log("tvaresult",tvaResult)
console.log("order",_order)
  useEffect(() => {
    setCurrency(
      _billingShippingData.shipping?.country === "CH" ? "CHF" : "EUR"
    );
  }, [_billingShippingData.shipping?.country]);

  useEffect(() => {
    if (Object.keys(cart).length > 0) {
      const _lineItems = cart.products.map((product) => {
        const product_id = product.id;
        const quantity = product.qty;

        return { product_id, quantity };
      });

      setLineItems(_lineItems);
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
            setShippingMethod(method);
            console.log("OK livraison", method);

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
    _setBillingShippingData({
      billing,
      shipping,
      isShippingForm,
    });

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
      shipping_lines: [
        {
          method_id: _shippingMethods.method_id,
          method_title: _shippingMethods.method_title,
          total: String(shippingPrice),
        },
      ],
      customer_id: Object.keys(user).length > 0 ? user.profile.id : 0,
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
    } else {
      return;
    }
    setValidateOrder(false);

    ///////////////////////////////////////////////////////////////
  }, [
    lineItems,
    _billingShippingData,
    usedCoupons,
    currency,
    isCoupon,
    shippingPrice,
    _shippingMethods,
    user,
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

    setCheckoutClicked(true);
    setIsOrder(false);
    setPaymentValidate(true);

    await _sendOrder();
    setValidateOrder(false);

    const productsCheckout = lineItemsRef.current?.map((product) => {
      const id = product.id;
      const name = product.name;
      const price =
        (Number(product.total) + Number(product.total_tax)) * product.quantity;
      const qty = product.quantity;
      const sku = product.sku ? product.sku : "no-sku";

      return { id, name, price, qty, sku };
    });

    if (Object.keys(cart).length > 0) {
      const { data } = await apiPFinance.post("transaction-create", {
        productsCheckout,
        orderId: orderIdRef.current,
        currency: currency,
        shippingTaxe: shippingPrice,
      });

      const methodsPaymentObject = data.paymentMethods.reduce(
        (acc: PostFinancePaymentMethods[], item: PostFinancePaymentMethods) => {
          let taxState = {};
          switch (item.name) {
            case "PostFinance e-finance":
              taxState = { ...item, taxMethodsPayments: 3 };
              break;
            case "Carte PostFinance":
              taxState = { ...item, taxMethodsPayments: 2 };
              break;
            case "Facture":
              taxState = { ...item, taxMethodsPayments: 0 };
              break;
            case "PayPal":
              taxState = { ...item, taxMethodsPayments: 5 };
              break;
            case "Carte de crédit/débit":
              taxState = { ...item, taxMethodsPayments: 2 };
              break;
            case "TWINT":
              taxState = { ...item, taxMethodsPayments: 4 };
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
  }, [
    cart,
    _sendOrder,
    usedCoupons,
    shippingPrice,
    codePromoState,
    paymentSteps,
    currency,
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
        (method.taxMethodsPayments / 100) *
        totalPriceWithTaxMethodsPayment
      ).toFixed(2);

      setTaxPaymentMethods(taxPaymentMethods);

      console.log("taxPaymentMethods", taxPaymentMethods);

      const productsCheckout = lineItemsRef.current?.map((product) => {
        const id = product.id;
        const name = product.name;
        const price =
          (Number(product.total) + Number(product.total_tax)) *
          product.quantity;
        const qty = product.quantity;
        const sku = product.sku ? product.sku : "no-sku";

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

      await _updateOrder(
        orderId as number,
        method.name,
        String(transactionId),
        taxPaymentMethods
      );

      if (data) {
        setIsCheckMethod(false);
        setPaymentValidate(false);
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

  const getShippingZone = useCallback(async () => {
    setIsSelectedShipping(true);

    let selectedCountry = 0;

    const country = _billingShippingData.shipping?.country;

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
  }, [getShippingPrice, _billingShippingData.shipping?.country]);

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

                {/*   {openDeliveryWays && ( */}
                <Collapse isOpened={openDeliveryWays}>
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
              <OrderSession>
                <div className="order_section_block">
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
                                : "0.00"}{" "}
                            </span>
                            <span> CHF</span>
                          </div>
                        </div>
                        <div className="taxes_item">
                          <div>Frais denvoi: (T.T.C)</div>
                          <div>{shippingPrice} CHF</div>
                        </div>

                        <div className="taxes_item">
                          <div>Frais de payment: (T.T.C)</div>
                          <div>{_taxPaymentMethods} CHF</div>
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
                          {Object.keys(_order).length > 0
                            ? Number(_order.total) + Number(_taxPaymentMethods)
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
