import { ReactNode } from "react";
import CartProvider from "./CartContext";
import CurrencyProvider from "./CurrencyContext";
import UserProvider from "./UserContext";

interface Children {
  children: ReactNode;
}

const AppProvider = ({ children }: Children) => {
  return (
    <UserProvider>
      <CurrencyProvider>
        <CartProvider>{children}</CartProvider>
      </CurrencyProvider>
    </UserProvider>
  );
};

export default AppProvider;
