import { GetServerSideProps } from "next";
import Image from "next/image";
import React, {
  ChangeEvent,
  FormEvent,
  ReactElement,
  useCallback,
  useEffect,
  useState,
} from "react";
import LayoutMobility from "../../../Layout/LayoutMobility";
import useTranslation from "next-translate/useTranslation";

import LogoB2B from "../../../../public/images/b2bLogo.png";
import useUser from "../../../hooks/useUser";
import { AuthUser } from "../../../interfaces/AuthUser";
import Notiflix from "notiflix";
import Link from "next/link";
import RecaptchaDisplay from "../../../components/RecaptchaDisplay";
import Input from "../../../components/Input";
import { B2BLogin } from "../../../styles/B2B-Log-Create";
import router from "next/router";

export default function LoginB2B() {
  const { t } = useTranslation();
  const connect = t("b2b:connect");
  const connectionTitle = t("b2b:connectionTitle");
  const createAccountLink = t("b2b:createAccountLink");
  const createAccountTxT = t("b2b:createAccountTxT");

  const { login, user } = useUser();
  const [userModel, setUserModel] = useState<AuthUser>({} as AuthUser);

  //SetUserModel from inputs change
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
  };
  //
  useEffect(() => {
    const handleStart = () => {
      Notiflix.Loading.standard("Loading...");
    };
    const handleStop = () => {
      Notiflix.Loading.remove();
    };
    if (!user.token) {
    }
    if (user.profile.wcb2b_group === "0" || user.profile.wcb2b_group === "") {
      Notiflix.Report.failure(
        "Erreure",
        "Vous devez posséder un compte b2b pour accéder a cette section",
        "Ok",
        function cb() {
          handleStart();
          router.push("/inmotion-mobility").then((res) => handleStop());
        }
      );
    }
    if (user.profile.wcb2b_status === "0") {
      return handleStop();
    }
    console.log("logged");
    console.log(user);
    router.push("/inmotion-mobility/b2b").then();
  }, [user, router]);

  useEffect(() => {
    Notiflix.Notify.init({
      zindex: 9999,
      position: "center-bottom",
    });
  }, []);
  return (
    <B2BLogin>
      <div className="logoBox">
        <Image src={LogoB2B} alt="logo B2b" layout="fill" objectFit="contain" />
      </div>
      <h2>{connectionTitle}</h2>
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
        <br />
        <p>{createAccountTxT}</p>
        <Link href="/inmotion-mobility/create-b2b-account">
          <a className="createLink">{createAccountLink}</a>
        </Link>
      </form>
      <br />
      <RecaptchaDisplay />
    </B2BLogin>
  );
}

LoginB2B.getLayout = function getLayout(page: ReactElement) {
  return <LayoutMobility>{page}</LayoutMobility>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {},
  };
};
