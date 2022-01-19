import {
  Formik,
  FormikHelpers,
  FormikProps,
  Form,
  Field,
  FieldProps,
  FieldArray,
  FormikErrors,
  FormikTouched,
} from "formik";
import { useEffect, useState } from "react";
import useUser from "../../hooks/useUser";
import * as Yup from "yup";

export interface FormValues {
  billing: BillingValues;
  shipping: ShippingValues;
  otherShippingAddress: boolean;
  test: string;
}

interface BillingValues {
  billing_first_name: string;
  billing_last_name: string;
  billing_email: string;
  billing_phone: string;
  billing_address_1: string;
  billing_address_2: string;
  billing_postcode: string;
  billing_city: string;
  billing_state: string;
  billing_country: string;
}

interface ShippingValues {
  shipping_first_name: string;
  shipping_last_name: string;
  shipping_phone: string;
  shipping_address_1: string;
  shipping_address_2: string;
  shipping_postcode: string;
  shipping_city: string;
  shipping_state: string;
  shipping_country: string;
}

interface Props {
  handleBillingShippingData: (values: FormValues) => void;
}

const UserBillingShippingForm = ({ handleBillingShippingData }: Props) => {
  const { user } = useUser();
  const [loged, setloged] = useState(false);

  const authorizedCounty = [
    "Suisse",
    "France",
    "Allemagne",
    "Italie",
    "Belgique",
    "Espagne",
    "Autriche",
    "Hollande",
  ];

  const initialValues: FormValues = {
    test: user.billing_info?.billing_last_name || "",
    billing: {
      billing_last_name: user.billing_info?.billing_last_name || "",
      billing_first_name: user.billing_info?.billing_first_name || "",
      billing_email: user.billing_info?.billing_email || "",
      billing_phone: user.billing_info?.billing_phone || "",
      billing_address_1: user.billing_info?.billing_address_1 || "",
      billing_address_2: user.billing_info?.billing_address_2 || "",
      billing_postcode: user.billing_info?.billing_postcode || "",
      billing_city: user.billing_info?.billing_city || "",
      billing_state: user.billing_info?.billing_state || "",
      billing_country: user.billing_info?.billing_country || "",
    },
    otherShippingAddress:
      user.shipping_info?.shipping_address_1.length !== 0
        ? true
        : false || false,
    shipping: {
      shipping_last_name: user.shipping_info?.shipping_last_name || "",
      shipping_first_name: user.shipping_info?.shipping_first_name || "",
      shipping_phone: user.shipping_info?.shipping_phone || "",
      shipping_address_1: user.shipping_info?.shipping_address_1 || "",
      shipping_address_2: user.shipping_info?.shipping_address_2 || "",
      shipping_postcode: user.shipping_info?.shipping_postcode || "",
      shipping_city: user.shipping_info?.shipping_city || "",
      shipping_state: user.shipping_info?.shipping_state || "",
      shipping_country: user.shipping_info?.shipping_country || "",
    },
  };

  const ShippingSchema = Yup.object().shape({
    test: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    lastName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
  });

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
    <div>
      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        validateOnChange={true}
        validationSchema={ShippingSchema}
        onSubmit={(values, actions) => {
          console.log("formkkkkkkk", values);
          alert(JSON.stringify(values, null, 2));
          handleBillingShippingData(values);
          // actions.setSubmitting(true);
        }}
      >
        {(props: FormikProps<FormValues>, errors: any, touched: any) => (
          <Form>
            <h2>Adresse de facturation</h2>

            <div className="billingForm">
              <div>
                <label htmlFor="test">test</label>
                <Field id="lastName" name="test" placeholder="test" />
                {errors && errors.test}
              </div>
              <div>
                <label htmlFor="billing.billing_last_name">Nom</label>
                <Field
                  id="firstName"
                  name="billing.billing_last_name"
                  placeholder="Nom"
                />
              </div>
              <div>
                <label htmlFor="billing.billing_first_name">Prénom</label>
                <Field
                  id="firstName"
                  name="billing.billing_first_name"
                  placeholder="Prénom"
                />
              </div>
              <div>
                <label htmlFor="billing.billing_email">E-mail</label>
                <Field
                  id="billingEmail"
                  name="billing.billing_email"
                  placeholder="E-mail"
                />
              </div>
              <div>
                <label htmlFor="billing.billing_phone">Téléphone</label>
                <Field
                  id="billingPhone"
                  name="billing.billing_phone"
                  placeholder="Téléphone"
                />
              </div>
              <div>
                <label htmlFor="billing.billing_address_1">Adresse 1</label>
                <Field
                  id="billingAddress1"
                  name="billing.billing_address_1"
                  placeholder="Adresse 1"
                />
              </div>
              <div>
                <label htmlFor="billing.billing_address_2">Adresse 2</label>
                <Field
                  id="billingAddress2"
                  name="billing.billing_address_2"
                  placeholder="Adresse 2"
                />
              </div>
              <div>
                <label htmlFor="billing.billing_postcode">NPA</label>
                <Field
                  id="billingPostcode"
                  name="billing.billing_postcode"
                  placeholder="NPA"
                />
              </div>
              <div>
                <label htmlFor="billing.billing_city">Ville</label>
                <Field
                  id="billingCity"
                  name="billing.billing_city"
                  placeholder="Ville"
                />
              </div>
              <div>
                <label htmlFor="billing.billing_state">Canton</label>
                <Field
                  id="billingState"
                  name="billing.billing_state"
                  placeholder="Canton"
                />
              </div>
              <div>
                <label htmlFor="billing.billing_country">Pays</label>
                <Field as="select" name="billing.billing_country">
                  {authorizedCounty.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </Field>
              </div>
              <label className="otherShippingAdresse">
                <Field type="checkbox" name="otherShippingAddress" />
                Adresse de livraison différente ?
              </label>
            </div>
            {props.values.otherShippingAddress && (
              <div className="shippingForm">
                <h2>Adresse de livraison</h2>
                <div>
                  <label htmlFor="shipping.shipping_first_name">Nom</label>
                  <Field
                    id="shippinglastName"
                    name="shipping.shipping_last_name"
                    placeholder="Nom"
                  />
                </div>
                <div>
                  <label htmlFor="shipping.shipping_first_name">Prénom</label>
                  <Field
                    id="shippingfirstName"
                    name="shipping.shipping_first_name"
                    placeholder="Prénom"
                  />
                </div>
                <div>
                  <label htmlFor="shipping.shipping_phone">Téléphone</label>
                  <Field
                    id="shippingPhone"
                    name="shipping.shipping_phone"
                    placeholder="Téléphone"
                  />
                </div>
                <div>
                  <label htmlFor="shipping.shipping_address_1">Adresse 1</label>
                  <Field
                    id="shippingAddress1"
                    name="shipping.shipping_address_1"
                    placeholder="Adresse 1"
                  />
                </div>
                <div>
                  <label htmlFor="shipping.shipping_address_2">Adresse 2</label>
                  <Field
                    id="shippingAddress2"
                    name="shipping.shipping_address_2"
                    placeholder="Adresse 2"
                  />
                </div>
                <div>
                  <label htmlFor="shipping.shipping_postcode">NPA</label>
                  <Field
                    id="shippingPostcode"
                    name="shipping.shipping_postcode"
                    placeholder="NPA"
                  />
                </div>
                <div>
                  <label htmlFor="shipping.shipping_city">Ville</label>
                  <Field
                    id="shippingCity"
                    name="shipping.shipping_city"
                    placeholder="Ville"
                  />
                </div>
                <div>
                  <label htmlFor="shipping.shipping_state">Canton</label>
                  <Field
                    id="shippingState"
                    name="shipping.shipping_state"
                    placeholder="Canton"
                  />
                </div>
                <div>
                  <label htmlFor="shipping.shipping_country">Pays</label>
                  <Field as="select" name="shipping.shipping_country">
                    {authorizedCounty.map((country) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </Field>
                </div>
              </div>
            )}
            <button type="submit">enregistrer</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UserBillingShippingForm;
