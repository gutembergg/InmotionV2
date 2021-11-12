import type { NextPage } from "next";
import {
  getShippingMethods,
  getShippingZones,
} from "../../../services/woocommerceApi/ShippingMethods";
import { LightBackground } from "../../../styles/BackgroundStyle";
import LayoutAdmin from "../../../Layout/LayoutAdmin";
import useCart from "../../../hooks/useCart";
import Image from "next/image";
import CouponsCode from "../../../components/CouponsCode";
import useUser from "../../../hooks/useUser";
import { createOrder } from "../../../services/woocommerceApi/Orders";
import LoginForm from "../../../components/Login";
import { StyledCheckout } from "../../../styles/CheckoutStyle";
import React, { useEffect, useState } from "react";

import UserBillingShippingForm, {
  FormValues,
} from "../../../components/UserBillingShippingForm";
import RegisterForm from "../../../components/Register";
import { ValidationSchemaExample } from "../../../components/UserShippingForm";
// import userShippingDataForm from "../../../components/UserShippingForm";

//-----

const CheckoutMagasin: NextPage = () => {
  const { login, logout, user } = useUser();
  const [loged, setloged] = useState(false);

  const { cart, removeCartItem } = useCart();

  const [billingShippingData, setBillingShippingData] = useState<FormValues>(
    {} as FormValues
  );

  // getShippingMethods();
  // getShippingZones();
  console.log("billingShippingDataaaa", billingShippingData);

  const order = {
    payment_method: "bacs",
    payment_method_title: "Direct Bank Transfer",
    set_paid: true,
    billing: { ...billingShippingData.billing },
    shipping: { ...billingShippingData.shipping },
    line_items: [
      {
        product_id: 8140,
        quantity: 2,
      },
    ],
    shipping_lines: [
      {
        method_id: "flat_rate",
        method_title: "Flat Rate",
        total: "10.00",
      },
    ],
  };

  const handleBillingShippingData = (values: FormValues) => {
    setBillingShippingData(values);
  };

  const sendOrder = () => {
    console.log(order);
  };

  useEffect(() => {
    if (user.token) {
      // initialValues
      setloged(true);
    } else {
      // initialValues
      setloged(false);
    }
  }, [user]);

  return (
    <LightBackground>
      <LayoutAdmin>
        <StyledCheckout>
          <div className="left">
            {!loged ? (
              <div>
                <p>Vous avez un compte?</p>
                <LoginForm />
                <RegisterForm />
              </div>
            ) : null}
            <section>
              <h2>Informations de livraison</h2>
              <UserBillingShippingForm
                handleBillingShippingData={handleBillingShippingData}
              />
              <ValidationSchemaExample />
              {/* <Basic /> */}
            </section>
            <section>
              <h2>Mode de livraison</h2>
            </section>
            <section>
              <h2>Paiement</h2>
            </section>
          </div>
          <div className="right">
            <div className="cartPreview">
              <div className="cartContainer">
                <ul>
                  {cart.totalProductsCount > 0 ? (
                    cart.products.map((product) => {
                      return (
                        <li key={product.id}>
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
                      <p>Vous n&apos; avez aucun produit dans votre panier</p>
                    </li>
                  )}
                </ul>
                <h5 className="sousTotalTxt">
                  Sous total:{" "}
                  <span>CHF {cart.totalProductsPrice?.toFixed(2)}</span>
                </h5>
              </div>
            </div>

            <CouponsCode />
            <p>ajouter code promo</p>
            <p>
              ajouter fonction if userbillig & shipping !== formulaire data
              register new data dans user (lien avec formulaire mon compte)
            </p>
            <p>ajouter tva</p>
            <p>ajouter prix total</p>
            <button onClick={sendOrder}>send</button>
          </div>
        </StyledCheckout>
      </LayoutAdmin>
    </LightBackground>
  );
};

export default CheckoutMagasin;
