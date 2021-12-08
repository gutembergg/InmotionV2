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
} from "../../../styles/CheckoutMobility";
import { ICoupons } from "../../../interfaces/ICoupons";

export default function CheckoutMobility() {
  const orderIdRef = useRef(0);

  const [loged, setloged] = useState(false);
  const { cart, removeCartItem } = useCart();
  const { user } = useUser();

  const { t } = useTranslation();
  const haveAccount = t("checkout-mobility:haveAccount");
  const orderPreview = t("checkout-mobility:orderPreview");
  const deliveryInfo = t("checkout-mobility:deliveryInfo");
  const wayDelivery = t("checkout-mobility:wayDelivery");
  const payment = t("checkout-mobility:payment");
  const emptyCartMessage = t("checkout-mobility:emptyCartMessage");
  const subTotal = t("checkout-mobility:subTotal");
  const addTVA = t("checkout-mobility:addTVA");
  const addPtotalPrice = t("checkout-mobility:addPtotalPrice");
  const btnSend = t("checkout-mobility:btnSend");

  const [_billingShippingData, _setBillingShippingData] =
    useState<OrderValidation>({} as OrderValidation);
  const [lineItems, setLineItems] = useState<LineItemsDTO[]>([]);
  const [transactionId, setTransactionId] = useState<number>();
  const [paymentMethodes, setPaymentMethods] = useState<
    PostFinancePaymentMethods[]
  >([]);
  const [usedCoupons, setusedCoupons] = useState<ICoupons[]>([])

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
  const [isOrder, setIsOrder] = useState(false);
  const [isPayment, setIsPayment] = useState(false);
  const [isSelectedPaymentMethods, setIsSelectedPaymentMethods] =
    useState(true);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    number | undefined
  >();

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
    const order = {
      payment_method: "Pedding",
      payment_method_title: "Pedding",
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
      shipping_lines: [
        {
          method_id: "flat_rate",
          method_title: "Flat Rate",
          total: "10.00",
        },
      ],
    };

    //Recuperer ici la reponse de la commande crée//////////////////
    const response = await wc_createOrder(order);

    orderIdRef.current = response.id;
    setOrderId(response.id);

    if (response) {
      setIsOrder(true);
    } else {
      setIsOrder(false);
    }

    console.log("responseOrder", response);

    return response.id;
    ///////////////////////////////////////////////////////////////
  }, [lineItems, userShippingBilling, _billingShippingData]);

  const checkout = useCallback(async () => {
    setIsPayment(true);
    let productsCheckout;
    if (Object.keys(cart).length > 0) {
      productsCheckout = cart.products.map((product) => {
        const id = product.id;
        const name = product.name;
        const price = product.price;
        const qty = product.qty;
        const sku = product.slug;

        return { id, name, price, qty, sku };
      });
    }

    await _sendOrder();

    if (Object.keys(cart).length > 0) {
      const { data } = await apiPFinance.post("transaction-create", {
        productsCheckout,
        orderId: orderIdRef.current,
        currency:
          userShippingBilling.billing_info.billing_country === "CH"
            ? "CHF"
            : ("EUR" && _billingShippingData.billing?.country === "Suisse") ||
              _billingShippingData.billing?.country === "Swiss" ||
              _billingShippingData.billing?.country === "schweizerisch"
            ? "CHF"
            : "EUR",
      });

      setPaymentMethods(data.paymentMethods);
      setTransactionId(data.transactionId);
      console.log("response=====>", data.paymentMethods);
    }
  }, [
    cart,
    _sendOrder,
    _billingShippingData.billing?.country,
    userShippingBilling.billing_info.billing_country,
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
      setIsOrder(false);
      setSelectedPaymentMethod(index);

      const { data } = await apiPFinance.post("transaction-update", {
        id: transactionId,
        orderId: orderId,
        methodId: method.id,
      });

      console.log("dataUpdated::", data);

      setTransactionId(data);

      const orderUpdated = await _updateOrder(orderId as number, method.name);

      if (orderUpdated) {
        setIsOrder(true);
        setIsSelectedPaymentMethods(false);
      }

      console.log("orderUpdated:", orderUpdated);
    },
    [orderId, transactionId]
  );

  console.log("selectedPaymentMethod: ", selectedPaymentMethod);

  return (
    <>
      <Container>
        <Content>
          {!loged && (
            <div>
              <p>{haveAccount}</p>
              <LoginForm />
              <RegisterForm />
            </div>
          )}
          <div className="content">
            <FormSection>
              <section>
                <h2>{deliveryInfo}</h2>
                <p>reste a faire qques conditions et calcul du total. tout est relier ensemble sinon. ca sera pour demain cest 3h du mat...</p>
                <BillingShippingForm
                  handleBillingShippingData={_handleBillingShippingData}
                />
              </section>
              <section>
                <h2>{wayDelivery}</h2>
              </section>
              <Payment>
                <div className="payment_container">
                  <div className="button_block">
                    <button onClick={checkout} disabled={isPayment}>
                      Méthodes de payments
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
                                <div className="method_name">{method.name}</div>
                              </div>
                            </PaymentMethods>
                          );
                        })}
                    </div>

                    {paymentMethodes.length > 0 && (
                      <div className="button_block btn_payment">
                        <button
                          disabled={isSelectedPaymentMethods}
                          onClick={() => validateCheckout()}
                        >
                          {payment}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </Payment>
              <section>
                <CouponsCode 
                userMail={userShippingBilling.billing_info.billing_email ||_billingShippingData.billing?.email}
                userID={user.profile?.id}
                userGrp={user.profile?.wcb2b_group}
                setusedCoupons={setusedCoupons}
                usedCoupons={usedCoupons}
                />
                
                <button onClick={_sendOrder}>{btnSend}</button>
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
                      <div>-200 chf</div>
                    </div>
                    <div className="taxes_item">
                      <div>Frais denvoi: (T.T.C)</div>
                      <div>-200 chf</div>
                    </div>
                    <div className="taxes_item">
                      <div>Frais de payment: (T.T.C)</div>
                      <div>-200 chf</div>
                    </div>
                    <div className="taxes_item">
                      <div>{usedCoupons.map (coupon =>{
                        return <div key={coupon.id}>Code Promo {coupon.code}</div>
                      })}</div>
                      <div>-200 chf</div>
                    </div>
                  </div>
                </div>
                <div className="total_block">
                  <h5 className="sousTotalTxt">
                    <span>Total (T.T.C): </span>
                    <span>CHF {cart.totalProductsPrice?.toFixed(2)}</span>
                  </h5>
                </div>
              </div>
              <div className="btn_valider_commande">
                <button>Valider commande</button>
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
  return {
    props: {}, // will be passed to the page component as props
  };
};
