import Notiflix from "notiflix";
import { createContext, ReactNode, useCallback, useState } from "react";
import { AuthUser } from "../../interfaces/AuthUser";
import {
  createInmotionUsers,
  userLogin,
} from "../../services/wordpressApi/users";

interface Children {
  children: ReactNode;
}

interface IUserContext {
  user: IUserState;
  login: (authUser: AuthUser) => void;
  logout: () => void;
}
export interface IUserState {
  token: string;
  profile: IUser;
  shipping_info: IShippingInfo;
  billing_info: IBillingInfo;
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

  const login = useCallback(async (authUser: AuthUser) => {
    try {
      const getUserData = await userLogin(authUser);
      const userData = await getUserData?.data;

      if (!userData) {
        Notiflix.Notify.failure("Mauvais username ou mot de passe");
        return;
      }

      if (typeof window !== "undefined") {
        localStorage.setItem("inmotion:user", JSON.stringify(userData));
      }

      setData(userData);
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
    <UserContext.Provider value={{ user: data, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
export default UserProvider;
