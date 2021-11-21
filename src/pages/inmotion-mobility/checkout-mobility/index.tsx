import Image from "next/image";
import React, { ReactElement, useCallback, useEffect, useState } from "react";

import CouponsCode from "../../../components/CouponsCode";
import LoginForm from "../../../components/Login";
import RegisterForm from "../../../components/Register";
import { ValidationSchemaExample } from "../../../components/UserShippingForm";
import useCart from "../../../hooks/useCart";
import thankIcon from "../../../../public/images/icons/thank-you.svg";
import {
  LineItemsDTO,
  OrderValidation,
} from "../../../interfaces/OrderValidation";
import BillingShippingForm, {
  IFormValues,
} from "../../../components/BillingShippingForm";
import { wc_createOrder } from "../../../services/woocommerceApi/Orders";
import { wc_paymentGateWays } from "../../../services/woocommerceApi/PaymentGateWays";
import useTranslation from "next-translate/useTranslation";
import { PaymentGateWays } from "../../../interfaces/PaymentGateWays";

import LayoutMobility from "../../../Layout/LayoutMobility";

import {
  Container,
  StyledCheckout,
  FormSession,
  OrderSession,
  Payment,
} from "../../../styles/CheckoutMobility";
import useUser from "../../../hooks/useUser";

export default function CheckoutMobility() {
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
  const addPromoDode = t("checkout-mobility:addPromoDode");
  const addTVA = t("checkout-mobility:addTVA");
  const addPtotalPrice = t("checkout-mobility:addPtotalPrice");
  const btnSend = t("checkout-mobility:btnSend");

  const [_billingShippingData, _setBillingShippingData] =
    useState<OrderValidation>({} as OrderValidation);

  const [lineItems, setLineItems] = useState<LineItemsDTO[]>([]);
  const [paymentMethods, setPaymentmethods] = useState<PaymentGateWays[]>([]);

  useEffect(() => {
    if (Object.keys(cart).length > 0) {
      const _lineItems = cart.products.map((product) => {
        const product_id = product.id;
        const quantity = product.qty;

        return { product_id, quantity };
      });
      setLineItems(_lineItems);
    }
  }, [cart]);

  useEffect(() => {
    if (user.token) {
      setloged(true);
    } else {
      setloged(false);
    }
  }, [user]);

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

  const sendOrder = useCallback(async () => {
    const order = {
      payment_method: "bacs",
      payment_method_title: "Direct Bank Transfer",
      set_paid: true,
      billing: {
        first_name: _billingShippingData.billing.first_name,
        last_name: _billingShippingData.billing.last_name,
        address_1: _billingShippingData.billing.address_1,
        address_2: _billingShippingData.billing.address_2,
        city: _billingShippingData.billing.city,
        state: _billingShippingData.billing.state,
        postcode: _billingShippingData.billing.postcode,
        country: _billingShippingData.billing.country,
        email: _billingShippingData.billing.email,
        phone: _billingShippingData.billing.phone,
      },
      shipping: {
        first_name: _billingShippingData.shipping.first_name,
        last_name: _billingShippingData.shipping.last_name,
        address_1: _billingShippingData.shipping.address_1,
        address_2: _billingShippingData.shipping.address_2,
        phone: _billingShippingData.shipping.phone,
        city: _billingShippingData.shipping.city,
        state: _billingShippingData.shipping.state,
        postcode: _billingShippingData.shipping.postcode,
        country: _billingShippingData.shipping.country,
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
    ///////////////////////////////////////////////////////////////
  }, [_billingShippingData.billing, _billingShippingData.shipping, lineItems]);

  const getPayment = async () => {
    const _paymentMethods = await wc_paymentGateWays();
    setPaymentmethods(_paymentMethods);
  };

  useEffect(() => {
    getPayment();
  }, []);

  return (
    <Container>
      <StyledCheckout>
        <FormSession>
          {!loged && (
            <div>
              <p>{haveAccount}</p>
              {/*  <LoginForm />
              <RegisterForm /> */}
            </div>
          )}
          <section>
            <h2>{deliveryInfo}</h2>
            <BillingShippingForm
              handleBillingShippingData={_handleBillingShippingData}
            />
            <ValidationSchemaExample />
          </section>
          <section>
            <h2>{wayDelivery}</h2>
          </section>
          <Payment>
            <h2>{payment}</h2>

            <div className="payment_list">
              {paymentMethods.map((payment) => {
                return <div key={payment.id}>{payment.title}</div>;
              })}
            </div>
          </Payment>
        </FormSession>
        <OrderSession>
          <div>
            <div>
              <ul>
                {cart.totalProductsCount > 0 ? (
                  cart.products.map((product) => {
                    return (
                      <li className="products_list" key={product.id}>
                        <button
                          className="closeButton"
                          onClick={() => removeCartItem(product.id)}
                        ></button>
                        <div className="cartProductInfos">
                          <h5>{product.name}</h5>
                          <p>
                            {product.qty}x CHF {product.price}
                          </p>
                        </div>
                        <div className="cartProductThmbnail">
                          <Image
                            src={product.images[0].src}
                            alt={product.name}
                            height={50}
                            width={50}
                          />
                        </div>
                      </li>
                    );
                  })
                ) : (
                  <li>
                    <p>{emptyCartMessage}</p>
                  </li>
                )}
              </ul>
              <h5 className="sousTotalTxt">
                {subTotal}:{" "}
                <span>CHF {cart.totalProductsPrice?.toFixed(2)}</span>
              </h5>
            </div>
          </div>

          <CouponsCode />
          <p>{addPromoDode}</p>
          <p>
            ajouter fonction if userbillig & shipping !== formulaire data
            register new data dans user (lien avec formulaire mon compte)
          </p>
          <p>{addTVA}</p>
          <p>{addPtotalPrice}</p>
          <button onClick={sendOrder}>{btnSend}</button>
        </OrderSession>
      </StyledCheckout>
    </Container>
  );
}

CheckoutMobility.getLayout = function getLayout(page: ReactElement) {
  return <LayoutMobility icon={thankIcon}>{page}</LayoutMobility>;
};
