import { GetServerSideProps } from "next";
import Image from "next/image";
import React, {
  ChangeEvent,
  ReactElement,
  useCallback,
  useEffect,
  useState,
} from "react";
import LayoutMobility from "../../../Layout/LayoutMobility";
import IconBlue from "../../../../public/images/icons/iconButton.svg";
import useTranslation from "next-translate/useTranslation";
import { Formik, Form, Field, FormikProps } from "formik";
import { createInmotionUsers } from "../../../services/wordpressApi/users";
import * as Yup from "yup";
import {
  Container,
  Content,
  FormBox,
  FormRow1,
  IconBlock,
  ButtonValidateMobile,
} from "../../../styles/CreateAccount";
import Notiflix from "notiflix";
import useUser from "../../../hooks/useUser";
import { useRouter } from "next/router";
import axios from "axios";

//validator of form
const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(70, "Too Long!")
    .required("Required"),
  lastname: Yup.string()
    .min(2, "Too Short!")
    .max(70, "Too Long!")
    .required("Required"),
  billing_company: Yup.string()
    .min(2, "Too Short!")
    .max(70, "Too Long!")
    .required("Required"),
  billing_vat: Yup.string()
    .min(2, "Too Short!")
    .max(70, "Too Long!")
    .required("Required"),
  phone: Yup.string()
    .min(2, "Too Short!")
    .max(70, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(2, "Too Short!")
    .max(70, "Too Long!")
    .required("Required"),
  password2: Yup.string()
    .when("password", {
      is: (val: string) => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf(
        [Yup.ref("password")],
        "Mots de passes doivent correspondre"
      ),
    })
    .required("Required"),
});

interface FormContent {
  name: string;
  lastname: string;
  email: string;
  phone: string;
  billing_company: string;
  billing_vat: string;
  password: string;
  password2?: string;
}

export default function CreateB2B() {
  const { t } = useTranslation();
  const firstName = t("forms:firstName");
  const lastName = t("forms:lastName");
  const title = t("createAccount:title");
  const phoneTxT = t("forms:phone");
  const password = t("createAccount:password");
  const confirmpass = t("createAccount:confirmpass");
  const compagnyTXT = t("createAccount:compagnyTXT");
  const vatNumberTxT = t("createAccount:vatNumberTxT");
  const create = t("createAccount:creer");
  const router = useRouter();
  const { user } = useUser();

  //Redirect if logged
  useEffect(() => {
    const handleStart = () => {
      Notiflix.Loading.standard("Loading...");
    };

    const handleStop = () => {
      Notiflix.Loading.remove();
    };
    if (
      user.token &&
      user.profile?.wcb2b_group !== "0" &&
      user.profile?.wcb2b_group !== "" &&
      user.profile?.wcb2b_status !== "0" &&
      user.profile?.wcb2b_status !== ""
    ) {
      handleStart();
      router.push("/inmotion-mobility/b2b").then((res) => handleStop());
    }
  }, [user, router]);

  const [formValues, setFormValues] = useState<FormContent>({
    name: "",
    lastname: "",
    billing_company: "",
    billing_vat: "",
    phone: "",
    email: "",
    password: "",
    password2: "",
  });

  const handleOnSubmit = useCallback(
    async (event: FormContent) => {
      const handleStart = () => {
        Notiflix.Loading.standard("Loading...");
      };
      const handleStop = () => {
        Notiflix.Loading.remove();
      };

      handleStart();
      delete event.password2;
      const _user = {
        ...event,
        wcb2b_group: "24",
        wcb2b_status: "0",
        billing_company: event.billing_company,
        billing_vat: event.billing_vat,
      };
      console.log(_user);
      const response = await createInmotionUsers(_user);

      if (response?.data.ID) {
        try {
          let res = await axios.post("/api/node-mail/newB2bUser", _user);
          console.log("mail Success!", res);
          handleStop();
          Notiflix.Report.success(
            "Merci pour votre Inscription",
            "Votre compte sera vérifié et un email de confirmation vous sera envoyé lors de sa validation.",
            "Super !",
            () => {
              handleStart();
              router.push("/inmotion-mobility").then((res) => handleStop());
            }
          );
        } catch (error) {
          console.log("mail error!", error);
        }
      } else {
        Notiflix.Report.failure(
          "Une erreure est survenue",
          "Vous possédez déja un compte avec cette adresse mail",
          "ok"
        );
      }
    },
    // eslint-disable-next-line
    []
  );

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setFormValues({
        ...formValues,
        [event.target.name]: event.target.value,
      });
    },
    [formValues]
  );

  return (
    <Container>
      <Content>
        <h1>{title}</h1>
        <Formik
          initialValues={formValues}
          validationSchema={SignupSchema}
          enableReinitialize={true}
          onSubmit={(values) => {
            handleOnSubmit(values);
            // same shape as initial values
          }}
        >
          {(props: FormikProps<FormContent>) => (
            <Form>
              <FormRow1>
                <div className="formElement">
                  <Field
                    name="name"
                    placeholder={firstName}
                    onChange={handleChange}
                    value={formValues.name || ""}
                  />
                  {props.errors.name && props.touched.name ? (
                    <div className="errors">{props.errors.name}</div>
                  ) : null}
                </div>
                <div className="formElement">
                  <Field
                    name="lastname"
                    placeholder={lastName}
                    onChange={handleChange}
                    value={formValues.lastname || ""}
                  />
                  {props.errors.lastname && props.touched.lastname ? (
                    <div className="errors">{props.errors.lastname}</div>
                  ) : null}
                </div>
              </FormRow1>
              <FormRow1>
                <div className="formElement">
                  <Field
                    name="billing_company"
                    placeholder={compagnyTXT}
                    onChange={handleChange}
                    value={formValues.billing_company || ""}
                  />
                  {props.errors.billing_company &&
                  props.touched.billing_company ? (
                    <div className="errors">{props.errors.billing_company}</div>
                  ) : null}
                </div>
                <div className="formElement">
                  <Field
                    name="email"
                    placeholder="Email"
                    type="email"
                    onChange={handleChange}
                    value={formValues.email || ""}
                  />
                  {props.errors.email && props.touched.email ? (
                    <div className="errors">{props.errors.email}</div>
                  ) : null}
                </div>
              </FormRow1>
              <FormBox>
                <div className="formElement">
                  <Field
                    name="billing_vat"
                    placeholder={vatNumberTxT}
                    onChange={handleChange}
                    value={formValues.billing_vat || ""}
                  />
                  {props.errors.billing_vat && props.touched.billing_vat ? (
                    <div className="errors">{props.errors.billing_vat}</div>
                  ) : null}
                </div>
                <div className="formElement">
                  <Field
                    name="phone"
                    placeholder={phoneTxT}
                    onChange={handleChange}
                    value={formValues.phone || ""}
                  />
                  {props.errors.phone && props.touched.phone ? (
                    <div className="errors">{props.errors.phone}</div>
                  ) : null}
                </div>
              </FormBox>
              <br />
              <FormRow1>
                <div className="formElement">
                  <Field
                    name="password"
                    placeholder={password}
                    type="password"
                    onChange={handleChange}
                    value={formValues.password || ""}
                  />
                  {props.errors.password && props.touched.password ? (
                    <div className="errors">{props.errors.password}</div>
                  ) : null}
                </div>
                <div className="formElement">
                  <Field
                    name="password2"
                    placeholder={confirmpass}
                    type="password"
                    onChange={handleChange}
                    value={formValues.password2 || ""}
                  />
                  {props.errors.password2 && props.touched.password2 ? (
                    <div className="errors">{props.errors.password2}</div>
                  ) : null}
                </div>
              </FormRow1>
              <IconBlock type="submit">
                <Image src={IconBlue} alt="icon" width={40} height={40} />
              </IconBlock>
              <ButtonValidateMobile type="submit">
                {create}
              </ButtonValidateMobile>
            </Form>
          )}
        </Formik>
      </Content>
    </Container>
  );
}

CreateB2B.getLayout = function getLayout(page: ReactElement) {
  return <LayoutMobility>{page}</LayoutMobility>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {},
  };
};
