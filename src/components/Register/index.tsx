import React, { ChangeEvent, FormEvent, useCallback, useState } from "react";
import Modal from "../Modal";
import { RegisterContainer, RegisterLink } from "./styles";
import Input from "../Input";
import { UserDto } from "../../interfaces/UserDTO";
import { createInmotionUsers } from "../../services/wordpressApi/users";
import useTranslation from "next-translate/useTranslation";

const RegisterForm = () => {
  const { t } = useTranslation();
  const createAccount = t("checkout-mobility:createAccounts");

  const [showModal, setShowModal] = useState<boolean>(false);
  const [b2bFields, setB2bFields] = useState<boolean>(false);
  const [userModel, setUserModel] = useState<UserDto>({} as UserDto);

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setUserModel({
        ...userModel,
        [event.target.name]: event.target.value,
      });
    },
    [userModel]
  );

  const handleB2BChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setB2bFields(event.target.checked);
    },
    []
  );

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      try {
        const b2bObject = {
          wcb2b_group: "24",
          wcb2b_status: "0",
        };
        const _user = {
          ...userModel,
          ...b2bObject,
        };
        console.log("sendUserdata", _user);
        const response = await createInmotionUsers(_user);
        console.log("usercreated: ", response);
        setShowModal(false);
      } catch (error) {
        console.log("error: ", error);
      }
    },
    // eslint-disable-next-line
    [userModel]
  );

  return (
    <>
      <Modal
        onClose={() => setShowModal(false)}
        show={showModal}
        title="Créer un compte"
      >
        <RegisterContainer>
          <form onSubmit={handleSubmit}>
            <Input name="name" onChange={handleChange} placeholder="name" />
            <Input name="email" onChange={handleChange} placeholder="email" />
            <Input
              name="password"
              onChange={handleChange}
              placeholder="password"
              isPassword
            />
            <label className="b2bBox">
              <input type="checkbox" onChange={handleB2BChange} />
              Ouvrir un compte B2B ?<br /> (entreprises uniquement)
            </label>
            {b2bFields && (
              <>
                <Input
                  name="billing_company"
                  onChange={handleChange}
                  placeholder="Company"
                />
                <Input
                  name="billing_vat"
                  onChange={handleChange}
                  placeholder="VAT number"
                />
                <p>
                  Votre compte ne sera pas activé tant que notre magasin
                  n&apos;aura pas valider votre demande
                </p>
              </>
            )}
            <button id="sendButton" type="submit">
              CreateAccount User
            </button>
          </form>
        </RegisterContainer>
      </Modal>
      <RegisterLink onClick={() => setShowModal(true)}>
        <p className="registerButton">aaaaaaaa{createAccount}</p>
      </RegisterLink>
    </>
  );
};

export default RegisterForm;
