import { ReactNode } from "react";
import CartProvider from "./CartContext";
import UserProvider from "./UserContext";

interface Children {
  children: ReactNode;
}

const AppProvider = ({ children }: Children) => {
  return (
      <UserProvider>
        <CartProvider>{children}</CartProvider>
      </UserProvider>
  );
};

export default AppProvider;
