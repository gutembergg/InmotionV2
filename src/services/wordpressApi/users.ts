import axios from "axios";
import { IFormValues } from "../../components/BillingShippingForm";
import { AuthUser } from "../../interfaces/AuthUser";
import { UserDto } from "../../interfaces/UserDTO";
import api from "../axiosApi";

export const createInmotionUsers = async (user: UserDto) => {
  try {
    const response = await api.post("users", user);

    return response;
  } catch (error) {
    console.log("error:::", error);
  }
};

export const userLogin = async (authUser: AuthUser) => {
  try {
    const response = await axios.post(
      "https://dx7l6anesh.preview.infomaniak.website/wp-json/jwt-auth/v1/token",
      {
        username: authUser.email,
        password: authUser.password,
      }
    );

    return response;
  } catch (error) {
    console.log("error:::", error);
  }
};

export const updateUsers = async (
  usersBillingShipping: IFormValues,
  token: string
) => {
  try {
    const { data } = await api.put("users", usersBillingShipping, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return data;
  } catch (error) {
    console.log("Error: ", error);
  }
};
