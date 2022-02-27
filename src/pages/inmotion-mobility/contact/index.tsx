import Image from "next/image";
import React, { ChangeEvent, FormEvent, ReactElement, useState } from "react";
import LayoutMobility from "../../../Layout/LayoutMobility";
import dynamic from "next/dynamic";
const ContactMap = dynamic(() => import("../../../components/ContactMap"), {
  ssr: false,
});
import { Report } from "notiflix";
import IconBlue from "../../../../public/images/icons/iconButton.svg";

import {
  Container,
  Description,
  Content,
  MapBlock,
  Form,
  FormRow1,
  Input,
  IconBlock,
} from "../../../styles/ContactPage";
import { GetServerSideProps } from "next";

export default function Contact() {
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
      <h1>Restons en contact!</h1>
      <Description>
        <p>{"N'hésitez pas à nous contacter si vous avez des questions!"}</p>
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
              placeholder="Nom"
            />
            <Input
              type="text"
              name="firstName"
              onChange={handleOnChange}
              placeholder="Prenom"
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
            placeholder="Telephone"
          />
          <textarea
            name="message"
            id="area-message"
            cols={30}
            rows={8}
            onChange={handleOnChangeTextArea}
            placeholder="Message"
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
