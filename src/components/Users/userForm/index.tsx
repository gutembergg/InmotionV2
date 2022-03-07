import { Formik, Form, Field, FormikProps } from "formik";
import useUser from "../../../hooks/useUser";
import { validatorSchema } from "./validator";
import useTranslation from "next-translate/useTranslation";
import { useEffect, useState } from "react";
import { updateUsers } from "../../../services/wordpressApi/users";
//import { swissDepartementCode } from "../../../utils/codeCantonsSuisse";
import { User } from "../../../interfaces/User";
import { Container, FormSession, ButtonRegiste } from "./styles";
import { Notify } from "notiflix";
import Spiner from "../../Spiner";

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
  currentyUser: User;
}

interface country {
  name: string;
  code: string;
}

const UserForm = ({ currentyUser }: Props) => {
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
  const btnToModify = t("checkout-mobility:btnToModify");

  const authorizedCounty: country[] = [
    {
      name: "Pays",
      code: "",
    },
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
      code: "ES",
    },
    {
      name: austria,
      code: "AT",
    },
    {
      name: holland,
      code: "NL",
    },
  ];

  const { user, updateStateUser } = useUser();
  const [formValues, setFormValues] = useState<IFormValues>({
    billing_last_name: currentyUser.billing?.last_name || "",
    billing_first_name: currentyUser.billing?.first_name || "",
    billing_email: currentyUser.billing?.email || "",
    billing_phone: currentyUser.billing?.phone || "",
    billing_address_1: currentyUser.billing?.address_1 || "",
    billing_address_2: currentyUser.billing?.address_2 || "",
    billing_postcode: currentyUser.billing?.postcode || "",
    billing_city: currentyUser.billing?.city || "",
    billing_state: currentyUser.billing?.state || "",
    billing_country: currentyUser.billing?.country || "",
    isShippingForm: !!currentyUser.shipping?.address_1 ? true : false,
    shipping_last_name: currentyUser.shipping?.last_name || "",
    shipping_first_name: currentyUser.shipping?.first_name || "",
    shipping_phone: currentyUser.shipping?.phone || "",
    shipping_address_1: currentyUser.shipping?.address_1 || "",
    shipping_address_2: currentyUser.shipping?.address_2 || "",
    shipping_postcode: currentyUser.shipping?.postcode || "",
    shipping_city: currentyUser.shipping?.city || "",
    shipping_state: currentyUser.shipping?.state || "",
    shipping_country:
      currentyUser.shipping?.country || authorizedCounty[0].code,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user.token) {
      setFormValues({
        billing_last_name: currentyUser.billing?.last_name || "",
        billing_first_name: currentyUser.billing?.first_name || "",
        billing_email: currentyUser.billing?.email || "",
        billing_phone: currentyUser.billing?.phone || "",
        billing_address_1: currentyUser.billing?.address_1 || "",
        billing_address_2: currentyUser.billing?.address_2 || "",
        billing_postcode: currentyUser.billing?.postcode || "",
        billing_city: currentyUser.billing?.city || "",
        billing_state: currentyUser.billing?.state || "",
        billing_country: currentyUser.billing?.country || "",
        isShippingForm: !!currentyUser.shipping?.address_1 ? true : false,
        shipping_last_name: currentyUser.shipping?.last_name || "",
        shipping_first_name: currentyUser.shipping?.first_name || "",
        shipping_phone: currentyUser.shipping?.phone || "",
        shipping_address_1: currentyUser.shipping?.address_1 || "",
        shipping_address_2: currentyUser.shipping?.address_2 || "",
        shipping_postcode: currentyUser.shipping?.postcode || "",
        shipping_city: currentyUser.shipping?.city || "",
        shipping_state: currentyUser.shipping?.state || "",
        shipping_country:
          currentyUser.shipping?.country || authorizedCounty[0].code,
      });
    }
    // eslint-disable-next-line
  }, [currentyUser]);

  const _updateUsers = async (value: IFormValues, token: string) => {
    try {
      setLoading(true);
      await updateUsers(value, token);
      setLoading(false);
      Notify.success("Success");
    } catch (error) {
      setLoading(false);
      Notify.failure("Une erreur est survenue");
    }
  };

  const updateLocalStorage = (values: IFormValues) => {
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

    return newData;
  };

  return (
    <Container>
      <FormSession>
        <Formik
          initialValues={formValues}
          enableReinitialize={true}
          validationSchema={validatorSchema}
          onSubmit={(value) => {
            if (user.token) {
              _updateUsers(value, user.token);

              if (typeof window !== "undefined") {
                const newDataLocalstorage = updateLocalStorage(value);
                localStorage.setItem(
                  "inmotion:user",
                  JSON.stringify(newDataLocalstorage)
                );
                updateStateUser();
              }
            }
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

                  {/*   <div>
                    <Field
                      as="select"
                      name="billing_state"
                      className="input_selects"
                    >
                      {swissDepartementCode.map((state) => (
                        <option key={state.code} value={state.code}>
                          {state.nom}
                        </option>
                      ))}
                    </Field>
                  </div> */}
                  <div>
                    <Field
                      as="select"
                      name="billing_country"
                      className="input_selects"
                    >
                      {authorizedCounty.map((country) => (
                        <option
                          key={country.code}
                          value={country.code}
                          defaultChecked={true}
                        >
                          {country.name}
                        </option>
                      ))}
                    </Field>
                  </div>

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

                    {/*      <Field
                      as="select"
                      name="shipping_state"
                      className="input_selects"
                    >
                      {swissDepartementCode.map((state) => (
                        <option key={state.code} value={state.code}>
                          {state.nom}
                        </option>
                      ))}
                    </Field> */}

                    <Field
                      as="select"
                      name="shipping_country"
                      className="input_selects"
                    >
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
                <ButtonRegiste type="submit">
                  <span>{btnToModify}</span> {loading && <Spiner />}
                </ButtonRegiste>
              </div>
            </Form>
          )}
        </Formik>
      </FormSession>
    </Container>
  );
};

export default UserForm;
