import React, {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import Modal from "../Modal";
import { LoginContainer, LoginLink, MyAccountLink } from "./styles";
import Link from "next/link";
import Input from "../Input";
import Notiflix from "notiflix";
import useUser from "../../hooks/useUser";
import { AuthUser } from "../../interfaces/AuthUser";
import RegisterForm from "../Register";
import useTranslation from "next-translate/useTranslation";
import {RiLoginBoxLine} from 'react-icons/ri';
import {RiAccountCircleFill} from 'react-icons/ri';

const LoginForm = () => {
  const { t } = useTranslation();
  const menuLogin = t("headerMobility:login");
  const menuRegister = t("headerMobility:register");

  const { login, user } = useUser();
  const [showModal, setShowModal] = useState<boolean>(false);

  const [userModel, setUserModel] = useState<AuthUser>({} as AuthUser);
  const [loged, setloged] = useState(false);

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setUserModel({
        ...userModel,
        [event.target.name]: event.target.value,
      });
    },
    [userModel]
  );

  //HANDLE FORM SUBMIT
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    //if no code in value
    if (!userModel.email) {
      Notiflix.Notify.failure("Insérez votre identifiant");
      return;
    }
    if (!userModel.password) {
      Notiflix.Notify.failure("Insérez votre mot de passe");
      return;
    }

    login(userModel);
    setShowModal(false);
  };
  //
  useEffect(() => {
    if (user.token) {
      setloged(true);
    } else {
      setloged(false);
    }
  }, [user]);

  return (
    <>
      <Modal
        onClose={() => setShowModal(false)}
        show={showModal}
        title="se connecter"
      >
        <LoginContainer>
          <form onSubmit={handleSubmit}>
            <Input name="email" onChange={handleChange} placeholder="email" />
            <Input
              isPassword
              name="password"
              onChange={handleChange}
              placeholder="password"
            />
            <input id="sendButton" type="submit" value="se connecter" />
          </form>
          <p>vous n&apos;avez pas de compte?</p>
          <RegisterForm />
        </LoginContainer>
      </Modal>
      {loged ? (
        <div>
          <MyAccountLink>
            <Link href={`/user`}>
              <a>
                <div>
                  <RiAccountCircleFill />
                  <span>Mon compte</span>
                </div>
              </a>
            </Link>
          </MyAccountLink>
        </div>
      ) : (
        <LoginLink onClick={() => setShowModal(true)}>
         <RiLoginBoxLine size={24} />
          {/*   <span>{menuLogin} /</span>
          <span>{menuRegister}</span> */}
          <span>
            {menuLogin}
          </span>
        </LoginLink>
      )}
    </>
  );
};

export default LoginForm;
