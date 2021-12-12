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
} from "../../../styles/CheckoutMobility";
import { ICoupons } from "../../../interfaces/ICoupons";
import { CouponLines, Order } from "../../../interfaces/Order";
import {
  getShippingMethods,
  getShippingZones,
} from "../../../services/woocommerceApi/ShippingMethods";
import { ShippingMethods } from "../../../interfaces/ShippingMethods";
import { IProduct } from "../../../interfaces/IProducts";

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

interface Props {
  _shippingMethods: ShippingMethods[];
}

export default function CheckoutMobility({ _shippingMethods }: Props) {
  const orderIdRef = useRef(0);
  const lineItemsRef = useRef<ILineItems[]>([]);
  const shippingPriceRef = useRef(0);

  const [loged, setloged] = useState(false);
  const { cart, updateTotal } = useCart();
  const { user } = useUser();

  const { t } = useTranslation();
  const haveAccount = t("checkout-mobility:haveAccount");
  const wayDelivery = t("checkout-mobility:wayDelivery");
  const payment = t("checkout-mobility:payment");
  const emptyCartMessage = t("checkout-mobility:emptyCartMessage");

  const [_billingShippingData, _setBillingShippingData] =
    useState<OrderValidation>({} as OrderValidation);
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

  const [currency, setCurrency] = useState("");
  const [isCoupon, setIsCoupon] = useState(false);
  const [priceTotalWithCoupon, setPriceTotalWithCoupon] = useState("");
  const [openedCodePromo, setOpenedCodePromo] = useState(false);
  const [_order, _setOrder] = useState<Order>({} as Order);
  const [shippingMethods, setShippingMethods] = useState<ShippingMethods>(
    {} as ShippingMethods
  );
  const [shippingPrice, setShippingPrice] = useState(0);
  const [cartProducts, setCartProducts] = useState<IProduct[]>([]);
  //------------------------------------------tvaResult------------------------------------------------!!
  const tva = 7.7;
  const tvaResult = (cart.totalProductsPrice / 100) * tva;
  const cartNewTotal = parseFloat(tvaResult.toFixed(2));
  const totalValue = cart.totalProductsPrice + cartNewTotal;

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

      getShippingPrice();

      setLineItems(_lineItems);
      setUserShippingBilling({
        ...userShippingBilling,
        line_items: _lineItems,
      });
    }
    setCartProducts(cart.products);
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

  const getShippingPrice = useCallback(() => {
    const productsWeight = cart.products.reduce(
      (acc, item) => {
        const weight = Number(item.weight) + Number(acc.weight);

        return { weight: weight };
      },
      { weight: 0 }
    );

    switch (true) {
      case productsWeight?.weight <= 2:
        //alert("CHF 8,50");
        setShippingPrice(8.5);
        break;
      case productsWeight?.weight > 2 && productsWeight?.weight <= 10:
        //alert("CHF 11,20");
        setShippingPrice(11.2);
        break;
      case productsWeight?.weight > 10 && productsWeight?.weight <= 30:
        // alert("CHF 30,50");
        setShippingPrice(30.5);
        break;
      case productsWeight?.weight > 30:
        //alert("Pointe de Vente!!");
        break;
      default:
        alert("none");
        break;
    }
  }, [cart.products]);

  const _handleBillingShippingData = (values: IFormValues) => {
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
  };

  const _sendOrder = useCallback(async () => {
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
      shipping_lines: [
        {
          method_id: "flat_rate",
          method_title: "Flat Rate",
          total: shippingPrice.toFixed(2),
        },
      ],
    };

    if (couponsCodeArray.length > 0) {
      setIsCoupon(true);
    }

    if (isCoupon === false) {
      const response = await wc_createOrder(order);
      _setOrder(response);
      orderIdRef.current = response.id;
      lineItemsRef.current = response.line_items as ILineItems[];
      const shippinResult = response.shipping_total;

      console.log("shippinResult: ", Number(shippinResult));
      shippingPriceRef.current = Number(shippinResult);

      setOrderId(response.id);
      setDiscountCupons(response.coupon_lines);

      console.log("responseOrder", response);

      console.log("cartPrice: ", cart.totalProductsPrice);
      console.log("discount_total: ", response.discount_total);
      console.log("shippingPrice: ", shippingPrice);

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
    const couponsCodeArray = usedCoupons.map((coupon) => {
      return { code: coupon.code };
    });

    if (couponsCodeArray.length > 0) {
      let validatedCoupon = confirm("Vous avez validé vos Codes Promo?");

      if (validatedCoupon === false) {
        return;
      }
    }
    setIsPayment(true);
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
        console.log("transaction: ", data);
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
  };

  const selectSHPmethod = useCallback(
    (method: ShippingMethods) => {
      if (method.method_id === "local_pickup") {
        setShippingPrice(0);
      } else if (method.method_id === "flexible_shipping_single") {
        getShippingPrice();
      }

      setShippingMethods(method);
    },
    [getShippingPrice]
  );

  return (
    <>
      <Container>
        <h1>Votre Commande</h1>
        <Content>
          <div className="content">
            <FormSection>
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
                  <h2>1. Vos coordonnées</h2>
                </div>
                <BillingShippingForm
                  handleBillingShippingData={_handleBillingShippingData}
                />
              </section>
              <section className="shipping">
                <div className="title">
                  <h2>2. {wayDelivery}</h2>
                </div>

                <div style={{ marginTop: "40px" }}>
                  {_shippingMethods.map((method) => {
                    return (
                      <div
                        key={method.id}
                        onClick={() => selectSHPmethod(method)}
                      >
                        {method.method_title}
                      </div>
                    );
                  })}
                </div>
              </section>

              <section className="code_promo">
                <div className="title" onClick={openCodePromo}>
                  <h2>3. Code Promo</h2>
                </div>
                {openedCodePromo && (
                  <>
                    <CouponsCode
                      userMail={
                        userShippingBilling.billing_info.billing_email ||
                        _billingShippingData.billing?.email
                      }
                      userID={user.profile?.id}
                      userGrp={user.profile?.wcb2b_group}
                      setusedCoupons={setusedCoupons}
                      usedCoupons={usedCoupons}
                    />
                    <BtnCouponsBlock>
                      <button type="button">Annuler</button>
                      <button type="button" onClick={_sendOrder}>
                        Valider mes coupons
                      </button>
                    </BtnCouponsBlock>
                  </>
                )}
              </section>
            </FormSection>
            <OrderSession>
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
                      <div>{cart.totalProductsPrice?.toFixed(2)} CHF</div>
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

              <div className="payment_block">
                <Payment>
                  <div className="payment_container">
                    <div className="button_block">
                      <button
                        onClick={checkout}
                        className={isPayment ? "disabled" : ""}
                        disabled={isPayment}
                      >
                        <div className="btn_payment_method">
                          <span>Méthodes de payments</span>
                          <span>{isOrder === false && <Spiner />}</span>
                        </div>
                      </button>
                    </div>

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
                              isCheckMethod || paymentValidate ? "disabled" : ""
                            }
                            disabled={isCheckMethod || paymentValidate}
                          >
                            <div className="btn_payment_method">
                              <span>{payment}</span>
                              <span>{isCheckMethod && <Spiner />}</span>
                            </div>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </Payment>
              </div>
            </OrderSession>
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
  const _shippingMethods = await getShippingMethods();

  return {
    props: {
      _shippingMethods,
    }, // will be passed to the page component as props
  };
};
