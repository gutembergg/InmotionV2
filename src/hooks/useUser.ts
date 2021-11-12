import { useContext } from "react";
import { UserContext } from "../components/Context/UserContext";

export default function useUser() {
  const context = useContext(UserContext);

  return context;
}
