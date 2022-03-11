import axios from "axios";
import {
  IBillingInfo,
  IShippingInfo,
  IUser,
} from "../../components/Context/UserContext";

export const getUserToken = async (username: string, password: string) => {
  const loginData = {
    username: username,
    password: password,
  };

  try {
    const { data } = await axios.post(
      `https://${process.env.NEXT_PUBLIC_BACKEND_URL}/wp-json/jwt-auth/v1/token`,
      loginData
    );

    const token: string = data.token;
    const user: IUser = data.profile;
    const shippingInfo: IShippingInfo = data.shipping_info;
    const billingInfo: IBillingInfo = data.billing_info;
    localStorage.setItem("Inmotion:token", token);
    localStorage.setItem("Inmotion:user", JSON.stringify(user));
    localStorage.setItem("Inmotion:shippingInfo", JSON.stringify(shippingInfo));
    localStorage.setItem("Inmotion:billingInfo", JSON.stringify(billingInfo));
    return { token, user, shippingInfo, billingInfo };
  } catch (error) {
    console.log("erreur de connexion au serveur");
  }
};
