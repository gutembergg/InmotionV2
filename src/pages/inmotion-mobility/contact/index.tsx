import { GetServerSideProps } from "next";
import Image from "next/image";
import React, { ChangeEvent, FormEvent, ReactElement, useState } from "react";
import LayoutMobility from "../../../Layout/LayoutMobility";
import dynamic from "next/dynamic";
const ContactMap = dynamic(() => import("../../../components/ContactMap"), {
  ssr: false,
});
import { Report } from "notiflix";
import IconBlue from "../../../../public/images/icons/iconButton.svg";
import useTranslation from "next-translate/useTranslation";

import {
  Container,
  Description,
  Content,
  MapBlock,
  Form,
  FormRow1,
  Input,
  IconBlock,
  ButtonValidateMobile,
} from "../../../styles/ContactPage";

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

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormModel({
      ...formModel,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnChangeTextArea = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setFormModel({
      ...formModel,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (
      formModel.email.trim() !== "" ||
      formModel.firstName.trim() !== "" ||
      formModel.lastName.trim() !== "" ||
      formModel.message.trim() !== ""
    ) {
    } else {
      Report.warning(
        "Notiflix Warning",
        '"Vous devez au moins un email ou telephone"',
        "Okay"
      );
    }
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
        <Form>
          <FormRow1>
            <Input
              type="text"
              name="lastName"
              onChange={handleOnChange}
              placeholder={lastName}
            />
            <Input
              type="text"
              name="firstName"
              onChange={handleOnChange}
              placeholder={firstName}
            />
          </FormRow1>
          <Input
            type="text"
            name="email"
            onChange={handleOnChange}
            placeholder="Email"
          />
          <Input
            type="text"
            name="telephone"
            onChange={handleOnChange}
            placeholder={phone}
          />
          <textarea
            name="message"
            id="area-message"
            cols={30}
            rows={8}
            onChange={handleOnChangeTextArea}
            placeholder={message}
          ></textarea>
          <IconBlock onSubmit={handleSubmit}>
            <Image
              src={IconBlue}
              alt="icon"
              width={40}
              height={40}
              onClick={handleSubmit}
            />
          </IconBlock>
          <ButtonValidateMobile onClick={handleSubmit}>
            {register}
          </ButtonValidateMobile>
        </Form>
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
