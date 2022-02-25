import Image from "next/image";
import React, { ChangeEvent, ReactElement, useState } from "react";
import LayoutMobility from "../../../Layout/LayoutMobility";
import dynamic from "next/dynamic";
const ContactMap = dynamic(() => import("../../../components/ContactMap"), {
  ssr: false,
});
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
} from "./styles";

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

  const handleSubmit = () => {
    console.log("formModel: ", formModel);
  };

  return (
    <Container>
      <h1>Reston on contact!</h1>
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
          <IconBlock>
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
