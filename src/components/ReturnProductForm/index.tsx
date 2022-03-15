import { Formik, Form, Field, FormikProps } from "formik";
import { validatorSchema } from "./validator";

import { Container, FormSession, ButtonRegiste } from "./styles";
import useTranslation from "next-translate/useTranslation";
import React from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Notiflix from "notiflix";
import Link from "next/link";
import RecaptchaDisplay from "../RecaptchaDisplay";

export interface IReturnFormValues {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
  postcode: string;
  city: string;
  country: string;
  date_achat: string;
  revendeur: string;
  nom_produit: string;
  serial: string;
  message: string;
}

const ReturnProductForm = () => {
  const { t } = useTranslation();
  const firstName = t("forms:firstName");
  const lastName = t("forms:lastName");
  const phone = t("forms:phone");
  const address = t("forms:address");
  const city = t("forms:city");
  const register = t("forms:register");
  const swiss = t("forms:swiss");
  const france = t("forms:france");
  const germany = t("forms:germany");
  const italy = t("forms:italy");
  const belgium = t("forms:belgium");
  const spain = t("forms:spain");
  const austria = t("forms:austria");
  const holland = t("forms:holland");
  const date_achat = t("forms:date_achat");
  const revendeur = t("forms:revendeur");
  const nom_produit = t("forms:nom_produit");
  const serial = t("forms:serial");
  const message = t("forms:message");
  const productInfoTxt = t("forms:CustomerInfoTxt");
  const CustomerInfoTxt = t("forms:productInfoTxt");

  const router = useRouter();

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
      code: "GE",
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

  const initialValues: IReturnFormValues = {
    last_name: "",
    first_name: "",
    email: "",
    phone: "",
    address: "",
    postcode: "",
    city: "",
    country: authorizedCounty[0].name,
    date_achat: "",
    revendeur: "",
    nom_produit: "",
    serial: "",
    message: "",
  };


  const handleSubmit = async (value: IReturnFormValues) => {

    try {
      let res = await axios.post("/api/node-mail/returnProductMail", value);
      console.log("Success!",res);
      Notiflix.Report.success(
        'Succès !',
        'Votre message nous a été transmis. Nous vous contacterons dans les plus brefs délais',
        'Ok',
        () => {
          router.reload();
        }
        );
    } catch (error) {
      Notiflix.Report.failure(
        'Ooops !',
        "Une erreure s'est produite lors de l'envoi du formulaire, veuillez réessayer ou nous contacter par mail si cela se reproduit",
        'Ok',
        );
    }
  };

  return (
    <Container>
      <FormSession>
        <Formik
          initialValues={initialValues}
          enableReinitialize={true}
          validationSchema={validatorSchema}
          onSubmit={(value) => {
            console.log("value", value);
            handleSubmit(value);
          }}
        >
          {(props: FormikProps<IReturnFormValues>) => (
          <Form className="form">
              <div className="forms_session">
                <div className="form_1">
                  <div className="left">
                    <h3>{CustomerInfoTxt}</h3>
                    <div className="inputcontent">
                      <div className="input_block">
                        <Field
                          className={
                            props.errors.last_name && props.touched.last_name
                              ? "erros"
                              : ""
                          }
                          name="last_name"
                          placeholder={lastName}
                        />
                        {props.errors.last_name && props.touched.last_name ? (
                          <div className="input_erros">
                            {props.errors.last_name}
                          </div>
                        ) : null}
                      </div>
                      <div className="input_block">
                        <Field
                          className={
                            props.errors.first_name && props.touched.first_name
                              ? "erros"
                              : ""
                          }
                          name="first_name"
                          placeholder={firstName}
                        />
                        {props.errors.first_name && props.touched.first_name ? (
                          <div className="input_erros">
                            {props.errors.first_name}
                          </div>
                        ) : null}
                      </div>

                      <div className="input_block">
                        <Field
                          className={
                            props.errors.email && props.touched.email
                              ? "erros"
                              : ""
                          }
                          name="email"
                          placeholder="Email"
                        />
                        {props.errors.email && props.touched.email ? (
                          <div className="input_erros">
                            {props.errors.email}
                          </div>
                        ) : null}
                      </div>

                      <div className="input_block">
                        <Field
                          className={
                            props.errors.phone && props.touched.phone
                              ? "erros"
                              : ""
                          }
                          name="phone"
                          placeholder={phone}
                        />
                        {props.errors.phone && props.touched.phone ? (
                          <div className="input_erros">
                            {props.errors.phone}
                          </div>
                        ) : null}
                      </div>

                      <div className="input_block">
                        <Field
                          className={
                            props.errors.address && props.touched.address
                              ? "erros"
                              : ""
                          }
                          name="address"
                          placeholder={`${address} 1`}
                        />
                        {props.errors.address && props.touched.address ? (
                          <div className="input_erros">
                            {props.errors.address}
                          </div>
                        ) : null}
                      </div>

                      <div className="input_block">
                        <Field
                          className={
                            props.errors.postcode && props.touched.postcode
                              ? "erros"
                              : ""
                          }
                          name="postcode"
                          placeholder="NPA"
                        />
                        {props.errors.postcode && props.touched.postcode ? (
                          <div className="input_erros">
                            {props.errors.postcode}
                          </div>
                        ) : null}
                      </div>

                      <div className="input_block">
                        <Field
                          className={
                            props.errors.city && props.touched.city
                              ? "erros"
                              : ""
                          }
                          name="city"
                          placeholder={city}
                        />
                        {props.errors.city && props.touched.city ? (
                          <div className="input_erros">{props.errors.city}</div>
                        ) : null}
                      </div>

                      <Field as="select" name="country">
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
                  </div>
                  <div className="right">
                    <h3>{productInfoTxt}</h3>
                    <div className="inputContent">
                      <div className="input_block">
                        <Field
                          className={
                            props.errors.date_achat && props.touched.date_achat
                              ? "erros"
                              : ""
                          }
                          name="date_achat"
                          placeholder={date_achat}
                        />
                        {props.errors.date_achat && props.touched.date_achat ? (
                          <div className="input_erros">
                            {props.errors.date_achat}
                          </div>
                        ) : null}
                      </div>

                      <div className="input_block">
                        <Field
                          className={
                            props.errors.revendeur && props.touched.revendeur
                              ? "erros"
                              : ""
                          }
                          name="revendeur"
                          placeholder={revendeur}
                        />
                        {props.errors.revendeur && props.touched.revendeur ? (
                          <div className="input_erros">
                            {props.errors.revendeur}
                          </div>
                        ) : null}
                      </div>

                      <div className="input_block">
                        <Field
                          className={
                            props.errors.nom_produit &&
                            props.touched.nom_produit
                              ? "erros"
                              : ""
                          }
                          name="nom_produit"
                          placeholder={nom_produit}
                        />
                        {props.errors.nom_produit &&
                        props.touched.nom_produit ? (
                          <div className="input_erros">
                            {props.errors.nom_produit}
                          </div>
                        ) : null}
                      </div>

                      <div className="input_block">
                        <Field
                          className={
                            props.errors.serial && props.touched.serial
                              ? "erros"
                              : ""
                          }
                          name="serial"
                          placeholder={serial}
                        />
                        {props.errors.serial && props.touched.serial ? (
                          <div className="input_erros">
                            {props.errors.serial}
                          </div>
                        ) : null}
                      </div>

                      <div className="input_block">
                        <Field
                          as="textarea"
                          className={
                            props.errors.message && props.touched.message
                              ? "erros"
                              : ""
                          }
                          name="message"
                          placeholder={message}
                        />
                        {props.errors.message && props.touched.message ? (
                          <div className="input_erros">
                            {props.errors.message}
                          </div>
                        ) : null}
                      </div>
                        <RecaptchaDisplay />
                    </div>
                    <ButtonRegiste type="submit">{register}</ButtonRegiste>
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </FormSession>
    </Container>
  );
};

export default ReturnProductForm;
