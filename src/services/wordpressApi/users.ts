import axios from "axios";
import { IFormValues } from "../../components/BillingShippingForm";
import { AuthUser } from "../../interfaces/AuthUser";
import { User } from "../../interfaces/User";
import { UserDto } from "../../interfaces/UserDTO";
import api from "../axiosApi";
import { wooCommerce } from "../woocommerceApi/woocommerceConfig";

// Create User ///////////////////////////////////////////////////
export const createInmotionUsers = async (user: UserDto) => {
  try {
    const response = await api.post("users", user);

    return response;
  } catch (error) {
    console.log("error:::", error);
  }
};

// User Login ///////////////////////////////////////////////////
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

// User update billing and shipping ///////////////////////////////////////////////////
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
    console.log("Internal error");
  }
};

// User update password ///////////////////////////////////////////////////
export const updateUsersPassword = async (password: {
  password: string;
  token: string;
}) => {
  try {
    const { data } = await api.put("password", password, {
      headers: { Authorization: `Bearer ${password.token}` },
    });
    console.log("success::", data);
    return data;
  } catch (error) {
    console.log("Error: ", error);
  }
};

// Get user by ID ///////////////////////////////////////////////////
export const getUserById = async (id: number): Promise<User> => {
  const { data } = await wooCommerce.get(`customers/${id}`);

  return data;
};

export const validateUserToken = async (token: any) => {
  try {
    const response = await axios.post(
      "https://dx7l6anesh.preview.infomaniak.website/wp-json/jwt-auth/v1/token/validate",
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return response;
  } catch (error) {
    console.log("Invalid token");
  }
};
