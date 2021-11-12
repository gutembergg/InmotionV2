import axios from "axios";
import { AuthUser } from "../../interfaces/AuthUser";
import { UserDto } from "../../interfaces/UserDTO";
import api from "../axiosApi";

export const createInmotionUsers = async (user: UserDto) => {
  try {
    const response = await api.post("users", user);

    console.log("respi", response);
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

    console.log("userToken", response);
    return response;
  } catch (error) {
    console.log("error:::", error);
  }
};
