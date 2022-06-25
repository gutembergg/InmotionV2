import router from "next/router";
import Notiflix from "notiflix";
import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";
import { AuthUser } from "../../interfaces/AuthUser";
import {
  getUserById,
  userLogin,
  validateUserToken,
} from "../../services/wordpressApi/users";

interface Children {
  children: ReactNode;
}

interface IUserContext {
  user: IUserState;
  login: (authUser: AuthUser) => void;
  b2blogin: (authUser: AuthUser) => void;
  logout: () => void;
  updateStateUser: () => void;
}
export interface IUserState {
  token: string;
  profile: IUser;
  shipping_info: IShippingInfo;
  billing_info: IBillingInfo;
  userB2BGrp?: IUserB2bGrp;
}

export interface IUser {
  id: number;
  user_display_name: string;
  user_email: string;
  user_first_name: string;
  user_last_name: string;
  user_nicename: string;
  user_roles: string[];
  wcb2b_group: string;
  wcb2b_status: string;
  userB2BGrp?: IUserB2bGrp;
}

export interface IUserB2bGrp {
  id: number;
  name: string;
  discount: string;
}

export interface IShippingInfo {
  shipping_address_1: string;
  shipping_address_2: string;
  shipping_city: string;
  shipping_company: string;
  shipping_country: string;
  shipping_first_name: string;
  shipping_last_name: string;
  shipping_phone: string;
  shipping_postcode: string;
  shipping_state: string;
}

export interface IBillingInfo {
  billing_address_1: string;
  billing_address_2: string;
  billing_city: string;
  billing_country: string;
  billing_email: string;
  billing_first_name: string;
  billing_last_name: string;
  billing_phone: string;
  billing_postcode: string;
  billing_state: string;
}

export const UserContext = createContext<IUserContext>({} as IUserContext);

const UserProvider = ({ children }: Children) => {
  const [data, setData] = useState<IUserState>(() => {
    if (typeof window !== "undefined") {
      const userAuthenticated = localStorage.getItem("inmotion:user");

      if (userAuthenticated) {
        return JSON.parse(userAuthenticated);
      }
    }

    return {} as IUserState;
  });

  const updateStateUser = () => {
    if (typeof window !== "undefined") {
      const userAuthenticated = localStorage.getItem("inmotion:user");

      if (userAuthenticated) {
        setData(JSON.parse(userAuthenticated));
      }
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userAuthenticated = localStorage.getItem("inmotion:user");
      if (userAuthenticated) {
        const token = data.token;
        validateUserToken(token).then((response) => {
          if (response?.status !== 200) {
            logout();
          }
        });
      }
    }
    // eslint-disable-next-line
  }, [data.token]);

  const login = useCallback(async (authUser: AuthUser) => {
    const handleStart = () => {
      Notiflix.Loading.standard("Loading...");
    };
    const handleStop = () => {
      Notiflix.Loading.remove();
    };
    handleStart();
    try {
      const getUserData = await userLogin(authUser);
      const userData = await getUserData?.data;

      if (!userData) {
        Notiflix.Notify.failure("Mauvais username ou mot de passe");
        handleStop();
        return;
      }

      if (
        userData.profile.wcb2b_group !== "" ||
        userData.profile.wcb2b_group !== "0"
      ) {
        Notiflix.Report.warning(
          "Attention",
          "Votre compte est un compte b2b, vous serez rediriger vers la bonne section",
          "Ok",
          function cb() {
            handleStart();
            router
              .push("/inmotion-mobility/login-b2b")
              .then((res) => handleStop());
          }
        );
        return;
      }

      if (typeof window !== "undefined") {
        handleStop();
        localStorage.setItem("inmotion:user", JSON.stringify(userData));
      }

      handleStop();
      Notiflix.Notify.success("Vous êtes connecté");
      setData(userData);
    } catch (error) {
      console.log("error:", error);
    }
  }, []);

  const b2blogin = useCallback(async (authUser: AuthUser) => {
    const handleStart = () => {
      Notiflix.Loading.standard("Loading...");
    };
    const handleStop = () => {
      Notiflix.Loading.remove();
    };
    handleStart();
    try {
      const getUserData = await userLogin(authUser);
      const userData = await getUserData?.data;
      if (!userData) {
        Notiflix.Notify.failure("Mauvais username ou mot de passe");
        handleStop();
        return;
      }
      if (
        userData.profile.wcb2b_group == "" ||
        userData.profile.wcb2b_group == "0"
      ) {
        Notiflix.Notify.failure("Ce compte n'est pas un compte B2B");
        handleStop();
        return;
      }
      if (userData.profile.wcb2b_status == "0") {
        Notiflix.Report.warning(
          "Attention",
          "Votre compte est en cours de validation, vous serez avertis dès que votre compte sera actif",
          "Ok"
        );
        handleStop();
        return;
      }

      if (typeof window !== "undefined") {
        handleStop();
        const userGrp = await getUserById(userData.profile.id);
        const userB2BData = { ...userData, userB2BGrp: userGrp.wcb2b_group };
        localStorage.setItem("inmotion:user", JSON.stringify(userB2BData));
      }

      // handleStop();
      Notiflix.Notify.success("Vous êtes connecté");
      const userGrp = await getUserById(userData.profile.id);
      const userB2BData = { ...userData, userB2BGrp: userGrp.wcb2b_group };
      setData(userB2BData);
    } catch (error) {
      console.log("error:", error);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("inmotion:user");

    setData({} as IUserState);

    Notiflix.Notify.success("Vous êtes déconnecté");
  }, []);
  return (
    <UserContext.Provider
      value={{ user: data, login, logout, updateStateUser, b2blogin }}
    >
      {children}
    </UserContext.Provider>
  );
};
export default UserProvider;
