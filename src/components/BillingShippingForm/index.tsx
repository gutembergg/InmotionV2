import { Formik, Form, Field, FormikProps } from "formik";
import useUser from "../../hooks/useUser";
import { validatorSchema } from "./validator";
import useTranslation from "next-translate/useTranslation";
import { useEffect, useState } from "react";
import { IUserState } from "../Context/UserContext";

import { Container, FormSession, ButtonRegiste } from "./styles";

export interface IFormValues {
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
  isShippingForm: boolean;
  shipping_last_name: string;
  shipping_first_name: string;
  shipping_phone: string;
  shipping_address_1: string;
  shipping_address_2: string;
  shipping_postcode: string;
  shipping_city: string;
  shipping_state: string;
  shipping_country: string;
}

interface Props {
  handleBillingShippingData: (values: IFormValues) => void;
}

const BillingShippingForm = ({ handleBillingShippingData }: Props) => {
  const { t } = useTranslation();
  const firstName = t("forms:firstName");
  const lastName = t("forms:lastName");
  const phone = t("forms:phone");
  const address = t("forms:address");
  const city = t("forms:city");
  const state = t("forms:state");
  const otherAddress = t("forms:otherAddress");
  const register = t("forms:register");
  const swiss = t("forms:swiss");
  const france = t("forms:france");
  const germany = t("forms:germany");
  const italy = t("forms:italy");
  const belgium = t("forms:belgium");
  const spain = t("forms:spain");
  const austria = t("forms:austria");
  const holland = t("forms:holland");

  interface country {
    name: string;
    code: string;
  }

  const authorizedCounty: country[] = [
    {
      name: swiss,
      code: "CH",
    },
    {
      name: france,
      code: "FR",
    },
    {
      name: germany,
      code: "DE",
    },
    {
      name: italy,
      code: "IT",
    },
    {
      name: belgium,
      code: "BE",
    },
    {
      name: spain,
      code: "SP",
    },
    {
      name: austria,
      code: "AU",
    },
    {
      name: holland,
      code: "HL",
    },
  ];

  const { user } = useUser();
  const [formValues, setFormValues] = useState<IFormValues>({
    billing_last_name: user.billing_info?.billing_last_name || "",
    billing_first_name: user.billing_info?.billing_first_name || "",
    billing_email: user.billing_info?.billing_email || "",
    billing_phone: user.billing_info?.billing_phone || "",
    billing_address_1: user.billing_info?.billing_address_1 || "",
    billing_address_2: user.billing_info?.billing_address_2 || "",
    billing_postcode: user.billing_info?.billing_postcode || "",
    billing_city: user.billing_info?.billing_city || "",
    billing_state: user.billing_info?.billing_state || "",
    billing_country:
      user.billing_info?.billing_country || authorizedCounty[0].code,
    isShippingForm: false,
    shipping_last_name: user.shipping_info?.shipping_last_name || "",
    shipping_first_name: user.shipping_info?.shipping_first_name || "",
    shipping_phone: user.shipping_info?.shipping_phone || "",
    shipping_address_1: user.shipping_info?.shipping_address_1 || "",
    shipping_address_2: user.shipping_info?.shipping_address_2 || "",
    shipping_postcode: user.shipping_info?.shipping_postcode || "",
    shipping_city: user.shipping_info?.shipping_city || "",
    shipping_state: user.shipping_info?.shipping_state || "",
    shipping_country:
      user.shipping_info?.shipping_country || authorizedCounty[0].code,
  });
  const [_user, _setUser] = useState<IUserState>({} as IUserState);

  useEffect(() => {
    if (user.token) {
      _setUser(user);
      console.log(
        "user.billing_info?",
        user.billing_info?.billing_country || authorizedCounty[2]
      );
      const initialValues = {
        billing_last_name: user.billing_info?.billing_last_name,
        billing_first_name: user.billing_info?.billing_first_name,
        billing_email: user.billing_info?.billing_email,
        billing_phone: user.billing_info?.billing_phone,
        billing_address_1: user.billing_info?.billing_address_1,
        billing_address_2: user.billing_info?.billing_address_2,
        billing_postcode: user.billing_info?.billing_postcode,
        billing_city: user.billing_info?.billing_city,
        billing_state: user.billing_info?.billing_state,
        billing_country:
          user.billing_info?.billing_country || authorizedCounty[0].code,
        isShippingForm: false,
        shipping_last_name: user.shipping_info?.shipping_last_name,
        shipping_first_name: user.shipping_info?.shipping_first_name,
        shipping_phone: user.shipping_info?.shipping_phone,
        shipping_address_1: user.shipping_info?.shipping_address_1,
        shipping_address_2: user.shipping_info?.shipping_address_2,
        shipping_postcode: user.shipping_info?.shipping_postcode,
        shipping_city: user.shipping_info?.shipping_city,
        shipping_state: user.shipping_info?.shipping_state,
        shipping_country:
          user.shipping_info?.shipping_country || authorizedCounty[0].code,
      };

      setFormValues(initialValues);
    }
    // eslint-disable-next-line
  }, [user]);

  return (
    <Container>
      <FormSession>
        <Formik
          initialValues={formValues}
          enableReinitialize={true}
          validationSchema={validatorSchema}
          onSubmit={(value) => {
            if (user.token) {
              console.log("value-user-update", value);
            }
            handleBillingShippingData(value);
          }}
        >
          {(props: FormikProps<IFormValues>) => (
            <Form className="form">
              <div className="forms_session">
                <div className="form_1">
                  <div className="input_block">
                    <Field
                      className={
                        props.errors.billing_last_name &&
                        props.touched.billing_last_name
                          ? "erros"
                          : ""
                      }
                      name="billing_last_name"
                      placeholder={lastName}
                    />
                    {props.errors.billing_last_name &&
                    props.touched.billing_last_name ? (
                      <div className="input_erros">
                        {props.errors.billing_last_name}
                      </div>
                    ) : null}
                  </div>
                  <div className="input_block">
                    <Field
                      className={
                        props.errors.billing_first_name &&
                        props.touched.billing_first_name
                          ? "erros"
                          : ""
                      }
                      name="billing_first_name"
                      placeholder={firstName}
                    />
                    {props.errors.billing_first_name &&
                    props.touched.billing_first_name ? (
                      <div className="input_erros">
                        {props.errors.billing_first_name}
                      </div>
                    ) : null}
                  </div>

                  <div className="input_block">
                    <Field
                      className={
                        props.errors.billing_email &&
                        props.touched.billing_email
                          ? "erros"
                          : ""
                      }
                      name="billing_email"
                      placeholder="Email"
                    />
                    {props.errors.billing_email &&
                    props.touched.billing_email ? (
                      <div className="input_erros">
                        {props.errors.billing_email}
                      </div>
                    ) : null}
                  </div>

                  <div className="input_block">
                    <Field
                      className={
                        props.errors.billing_phone &&
                        props.touched.billing_phone
                          ? "erros"
                          : ""
                      }
                      name="billing_phone"
                      placeholder={phone}
                    />
                    {props.errors.billing_phone &&
                    props.touched.billing_phone ? (
                      <div className="input_erros">
                        {props.errors.billing_phone}
                      </div>
                    ) : null}
                  </div>

                  <div className="input_block">
                    <Field
                      className={
                        props.errors.billing_address_1 &&
                        props.touched.billing_address_1
                          ? "erros"
                          : ""
                      }
                      name="billing_address_1"
                      placeholder={`${address} 1`}
                    />
                    {props.errors.billing_address_1 &&
                    props.touched.billing_address_1 ? (
                      <div className="input_erros">
                        {props.errors.billing_address_1}
                      </div>
                    ) : null}
                  </div>

                  <div className="input_block">
                    <Field
                      className={
                        props.errors.billing_address_2 &&
                        props.touched.billing_address_2
                          ? "erros"
                          : ""
                      }
                      name="billing_address_2"
                      placeholder={`${address} 2`}
                    />
                    {props.errors.billing_address_2 &&
                    props.touched.billing_address_2 ? (
                      <div className="input_erros">
                        {props.errors.billing_address_2}
                      </div>
                    ) : null}
                  </div>

                  <div className="input_block">
                    <Field
                      className={
                        props.errors.billing_postcode &&
                        props.touched.billing_postcode
                          ? "erros"
                          : ""
                      }
                      name="billing_postcode"
                      placeholder="NPA"
                    />
                    {props.errors.billing_postcode &&
                    props.touched.billing_postcode ? (
                      <div className="input_erros">
                        {props.errors.billing_postcode}
                      </div>
                    ) : null}
                  </div>

                  <div className="input_block">
                    <Field
                      className={
                        props.errors.billing_city && props.touched.billing_city
                          ? "erros"
                          : ""
                      }
                      name="billing_city"
                      placeholder={city}
                    />
                    {props.errors.billing_city && props.touched.billing_city ? (
                      <div className="input_erros">
                        {props.errors.billing_city}
                      </div>
                    ) : null}
                  </div>

                  <div className="input_block">
                    <Field
                      className={
                        props.errors.billing_state &&
                        props.touched.billing_state
                          ? "erros"
                          : ""
                      }
                      name="billing_state"
                      placeholder={state}
                    />
                    {props.errors.billing_state &&
                    props.touched.billing_state ? (
                      <div className="input_erros">
                        {props.errors.billing_state}
                      </div>
                    ) : null}
                  </div>

                  <Field as="select" name="billing_country">
                    {authorizedCounty.map((country) => (
                      <option
                        key={country.code}
                        value={country.code}
                        defaultChecked={true}
                        defaultValue={
                          props.initialValues.billing_country.length > 0
                            ? props.initialValues.billing_country
                            : country.name
                        }
                      >
                        {country.name}
                      </option>
                    ))}
                  </Field>

                  <div className="isShippingForm">
                    <Field type="checkbox" name="isShippingForm" />
                    <span>{otherAddress}</span>
                  </div>
                </div>

                {props.values.isShippingForm && (
                  <div className="form_2">
                    <div className="input_block">
                      <Field
                        className={
                          props.errors.shipping_last_name &&
                          props.touched.shipping_last_name
                            ? "erros"
                            : ""
                        }
                        name="shipping_last_name"
                        placeholder={lastName}
                      />
                      {props.errors.shipping_last_name &&
                      props.touched.shipping_last_name ? (
                        <div className="input_erros">
                          {props.errors.shipping_last_name}
                        </div>
                      ) : null}
                    </div>

                    <div className="input_block">
                      <Field
                        className={
                          props.errors.shipping_first_name &&
                          props.touched.shipping_first_name
                            ? "erros"
                            : ""
                        }
                        name="shipping_first_name"
                        placeholder={firstName}
                      />
                      {props.errors.shipping_first_name &&
                      props.touched.shipping_first_name ? (
                        <div className="input_erros">
                          {props.errors.shipping_first_name}
                        </div>
                      ) : null}
                    </div>

                    <div className="input_block">
                      <Field
                        className={
                          props.errors.shipping_phone &&
                          props.touched.shipping_phone
                            ? "erros"
                            : ""
                        }
                        name="shipping_phone"
                        placeholder={phone}
                      />
                      {props.errors.shipping_phone &&
                      props.touched.shipping_phone ? (
                        <div className="input_erros">
                          {props.errors.shipping_phone}
                        </div>
                      ) : null}
                    </div>

                    <div className="input_block">
                      <Field
                        className={
                          props.errors.shipping_address_1 &&
                          props.touched.shipping_address_1
                            ? "erros"
                            : ""
                        }
                        name="shipping_address_1"
                        placeholder={`${address} 1`}
                      />
                      {props.errors.shipping_address_1 &&
                      props.touched.shipping_address_1 ? (
                        <div className="input_erros">
                          {props.errors.shipping_address_1}
                        </div>
                      ) : null}
                    </div>

                    <div className="input_block">
                      <Field
                        className={
                          props.errors.shipping_address_2 &&
                          props.touched.shipping_address_2
                            ? "erros"
                            : ""
                        }
                        name="shipping_address_2"
                        placeholder={`${address} 2`}
                      />
                      {props.errors.shipping_address_2 &&
                      props.touched.shipping_address_2 ? (
                        <div className="input_erros">
                          {props.errors.shipping_address_2}
                        </div>
                      ) : null}
                    </div>

                    <div className="input_block">
                      <Field
                        className={
                          props.errors.shipping_postcode &&
                          props.touched.shipping_postcode
                            ? "erros"
                            : ""
                        }
                        name="shipping_postcode"
                        placeholder="NPA"
                      />
                      {props.errors.shipping_postcode &&
                      props.touched.shipping_postcode ? (
                        <div className="input_erros">
                          {props.errors.shipping_postcode}
                        </div>
                      ) : null}
                    </div>

                    <div className="input_block">
                      <Field
                        className={
                          props.errors.shipping_city &&
                          props.touched.shipping_city
                            ? "erros"
                            : ""
                        }
                        name="shipping_city"
                        placeholder={city}
                      />
                      {props.errors.shipping_city &&
                      props.touched.shipping_city ? (
                        <div className="input_erros">
                          {props.errors.shipping_city}
                        </div>
                      ) : null}
                    </div>

                    <div className="input_block">
                      <Field
                        className={
                          props.errors.shipping_state &&
                          props.touched.shipping_state
                            ? "erros"
                            : ""
                        }
                        name="shipping_state"
                        placeholder={state}
                      />
                      {props.errors.shipping_state &&
                      props.touched.shipping_state ? (
                        <div className="input_erros">
                          {props.errors.shipping_state}
                        </div>
                      ) : null}
                    </div>

                    <Field as="select" name="shipping_country">
                      {authorizedCounty.map((country) => (
                        <option key={country.code} value={country.code}>
                          {country.name}
                        </option>
                      ))}
                    </Field>
                  </div>
                )}
              </div>

              <div className="btn_register">
                {!!_user.token ? (
                  <ButtonRegiste type="submit">
                    Modifier/confirmer
                  </ButtonRegiste>
                ) : (
                  <ButtonRegiste type="submit">{register}</ButtonRegiste>
                )}
              </div>
            </Form>
          )}
        </Formik>
      </FormSession>
    </Container>
  );
};

export default BillingShippingForm;
