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
import useTranslation from "next-translate/useTranslation";
import { RiLoginBoxLine } from "react-icons/ri";
import { RiAccountCircleFill } from "react-icons/ri";

const LoginForm = () => {
  const { t } = useTranslation();
  const menuLogin = t(
    "headerMobility:login",
    { count: 1 },
    {
      fallback: "Login",
    }
  );
  const myaccount = t(
    "headerMobility:myaccount",
    { count: 1 },
    {
      fallback: "my account",
    }
  );

  const menuRegister = t(
    "headerMobility:register",
    { count: 1 },
    {
      fallback: "register",
    }
  );
  const connect = t("headerMobility:login");
  const createAccounts = t("headerMobility:createAccounts");

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

  useEffect(() => {
    Notiflix.Notify.init({
      zindex: 9999,
      position: "center-bottom",
    });
  }, []);

  return (
    <>
      <Modal
        onClose={() => setShowModal(false)}
        show={showModal}
        title={connect}
      >
        <LoginContainer>
          <form onSubmit={handleSubmit}>
            <Input
              name="email"
              onChange={handleChange}
              placeholder="email"
              required
            />
            <Input
              isPassword
              name="password"
              onChange={handleChange}
              placeholder="password"
              required
            />
            <input id="sendButton" type="submit" value={connect} />
          </form>
          <Link href="/inmotion-mobility/create-account">
            <a className="createAccount" onClick={() => setShowModal(false)}>
              {createAccounts}
            </a>
          </Link>
        </LoginContainer>
      </Modal>
      {loged ? (
        <div>
          <MyAccountLink>
            <Link href={`/inmotion-mobility/utilisateurs`}>
              <a>
                <div>
                  <RiAccountCircleFill />
                  <span>{myaccount}</span>
                </div>
              </a>
            </Link>
          </MyAccountLink>
        </div>
      ) : (
        <LoginLink onClick={() => setShowModal(true)}>
          <RiLoginBoxLine size={21} color="#f0f0f0" />
          <span>
            {menuLogin} / {menuRegister}
          </span>
        </LoginLink>
      )}
    </>
  );
};

export default LoginForm;
