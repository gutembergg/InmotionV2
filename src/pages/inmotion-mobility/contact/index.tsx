import { GetServerSideProps } from "next";
import Image from "next/image";
import React, { ReactElement, useState } from "react";
import { Formik, Form as FormikForm, Field, FormikProps } from "formik";
import LayoutMobility from "../../../Layout/LayoutMobility";
import dynamic from "next/dynamic";
const ContactMap = dynamic(() => import("../../../components/ContactMap"), {
  ssr: false,
});
import { Report } from "notiflix";
import * as Yup from "yup";
import IconBlue from "../../../../public/images/icons/iconButton.svg";
import useTranslation from "next-translate/useTranslation";

import {
  Container,
  Description,
  Content,
  MapBlock,
  FormBlock,
  Form,
  FormRow1,
  Input,
  IconBlock,
  ButtonValidateMobile,
} from "../../../styles/ContactPage";

interface Props {
  lastName: string;
  firstName: string;
  email: string;
  telephone: string;
  message: string;
}

export default function Contact() {
  const { t } = useTranslation();
  const firstName = t("forms:firstName");
  const lastName = t("forms:lastName");
  const phone = t("forms:phone");
  const register = t("forms:register");
  const message = t("contactPage:message");
  const title = t("contactPage:title");
  const subTitle = t("contactPage:subTitle");

  const [formModel, setFormModel] = useState({
    lastName: "",
    firstName: "",
    email: "",
    telephone: "",
    message: "",
  });

  const validatorSchema = Yup.object().shape({
    lastName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    firstName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    telephone: Yup.string().min(2, "Too Short!").max(20, "Too Long!"),
    message: Yup.string()
      .min(2, "Too Short!")
      .max(500, "Too Long!")
      .required("Required"),
  });

  const handleSubmit = (values: Props) => {
  };

  return (
    <Container>
      <h1>{title}</h1>
      <Description>
        <p>{`${subTitle}`}</p>
      </Description>
      <Content>
        <MapBlock>
          <ContactMap />
        </MapBlock>

        <FormBlock>
          <Formik
            initialValues={formModel}
            enableReinitialize={true}
            validationSchema={validatorSchema}
            onSubmit={(values) => {
              handleSubmit(values);
            }}
          >
            {(props: FormikProps<Props>) => (
              <FormikForm>
                <Form>
                  <FormRow1>
                    <div className="input_options">
                      <Field
                        className={
                          props.errors.lastName && props.touched.lastName
                            ? "erros"
                            : ""
                        }
                        as={Input}
                        name="lastName"
                        placeholder={lastName}
                      />
                      {props.errors.lastName && props.touched.lastName ? (
                        <div className="input_erros">
                          {props.errors.lastName}
                        </div>
                      ) : null}
                    </div>

                    <div className="input_options">
                      <Field
                        className={
                          props.errors.firstName && props.touched.firstName
                            ? "erros"
                            : ""
                        }
                        as={Input}
                        name="firstName"
                        placeholder={firstName}
                      />
                      {props.errors.firstName && props.touched.firstName ? (
                        <div className="input_erros">
                          {props.errors.firstName}
                        </div>
                      ) : null}
                    </div>
                  </FormRow1>

                  <div>
                    <Field
                      className={
                        props.errors.email && props.touched.email ? "erros" : ""
                      }
                      as={Input}
                      name="email"
                      placeholder="Email"
                    />
                    {props.errors.email && props.touched.email ? (
                      <div className="input_erros">{props.errors.email}</div>
                    ) : null}
                  </div>

                  <div>
                    <Field
                      className={
                        props.errors.telephone && props.touched.telephone
                          ? "erros"
                          : ""
                      }
                      as={Input}
                      name="telephone"
                      placeholder={phone}
                    />
                    {props.errors.telephone && props.touched.telephone ? (
                      <div className="input_erros">
                        {props.errors.telephone}
                      </div>
                    ) : null}
                  </div>

                  <div className="text_area">
                    <Field
                      className={
                        props.errors.message && props.touched.message
                          ? "erros"
                          : ""
                      }
                      as="textarea"
                      name="message"
                      cols={30}
                      rows={8}
                      placeholder={message}
                    />
                    {props.errors.message && props.touched.message ? (
                      <div className="input_erros">{props.errors.message}</div>
                    ) : null}
                  </div>

                  <IconBlock>
                    <Image src={IconBlue} alt="icon" width={40} height={40} />
                  </IconBlock>
                  <ButtonValidateMobile type="submit">
                    {register}
                  </ButtonValidateMobile>
                </Form>
              </FormikForm>
            )}
          </Formik>
        </FormBlock>
      </Content>
    </Container>
  );
}

Contact.getLayout = function getLayout(page: ReactElement) {
  return <LayoutMobility>{page}</LayoutMobility>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {},
  };
};
