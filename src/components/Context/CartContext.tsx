import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";

import { Report } from "notiflix";
import useCurrency from "../../hooks/useCurrency";
import { IProduct } from "../../interfaces/IProducts";
import useTranslation from "next-translate/useTranslation";

interface Children {
  children: ReactNode;
}

interface ICartContext {
  cartItem: IProduct[];
  cart: ICartState;
  addToCart: (products: IProduct[]) => void;
  removeCartItem: (id: number) => void;
  updateTotal: (total: string) => void;
}

export interface ICartState {
  products: IProduct[];
  totalProductsCount: number;
  totalProductsPrice: number;
  totalWithCoupon?: number;
  timestamp: number;
}

export const CartContext = createContext<ICartContext>({} as ICartContext);

const CartProvider = ({ children }: Children) => {
  const { currency } = useCurrency();
  const [cartItem, setCartItem] = useState<IProduct[]>([]);
  const [cart, setCart] = useState<ICartState>({} as ICartState);
  const timestamp = Date.now();
  const [currencyStatut, setcurrencyStatut] = useState(currency);
  const { t } = useTranslation();
  const productAdded = t("common:productAdded");
  const productRemoved = t("common:productRemoved");

  const getLocalStorageData = useCallback(() => {
    if (typeof window !== "undefined") {
      const existsCart = localStorage.getItem("inmotion:cart");

      if (existsCart) {
        const cart: ICartState = JSON.parse(existsCart);

        const today = Date.now();
        const time = today - cart.timestamp;
        const dayDifference = time / (1000 * 36000 * 24);

        if (dayDifference <= 1) {
          setCart(cart);
          setCartItem(cart.products);
        } else {
          localStorage.removeItem("inmotion:cart");
        }
      }
    }
  }, []);

  useEffect(() => {
    getLocalStorageData();
    // eslint-disable-next-line
  }, []);

  // ------BEGIN of fatih's function

  // --------------------------------------------------------------------------------
  useEffect(() => {
    // console.log(cart)
    currency !== currencyStatut && isCart() === true && switchCartDevise();
    setcurrencyStatut(currency);
  }, [currency, currencyStatut]);

  const isCart = () => {
    if (cart.products) {
      if (cart.totalProductsCount > 0) {
        return true;
      }
    }
    return false;
  };

  const switchCartDevise = () => {
    // console.log("cart.products--->",cart.products);
    const totalPrice = cart.products.reduce(
      (acc, item) => {
        const quantity = acc.qty + item.qty;

        const total =
          acc.price +
          item.qty *
            parseFloat(
              parseFloat(
                currency === "CHF" ? item.price : String(item.euroPrice)
              ).toFixed(2)
            );

        return {
          qty: quantity,
          price: total,
        };
      },
      { qty: 0, price: 0 }
    );

    const { qty, price } = totalPrice;

    // console.log("totalprice--->",totalPrice);
    const _cart: ICartState = {
      products: cart.products,
      totalProductsCount: qty,
      totalProductsPrice: price,
      timestamp,
    };
    setCart(_cart);

    setCartItem(cart.products);
  };
  // ------end of fatih's function
  // --------------------------------------------------------------------------------

  const addToCart = (products: IProduct[]) => {
    console.log(products);
    const totalPrice = products.reduce(
      (acc, item) => {
        const quantity = acc.qty + item.qty;

        const total =
          acc.price +
          item.qty *
            parseFloat(
              parseFloat(
                currency === "CHF" ? item.price : String(item.euroPrice)
              ).toFixed(2)
            );

        return {
          qty: quantity,
          price: total,
        };
      },
      { qty: 0, price: 0 }
    );

    const { qty, price } = totalPrice;

    const _cart: ICartState = {
      products: products,
      totalProductsCount: qty,
      totalProductsPrice: price,
      timestamp,
    };
    Report.success(`${productAdded}`, "", "Ok");
    if (typeof window !== "undefined") {
      localStorage.setItem("inmotion:cart", JSON.stringify(_cart));
    }
    setCart(_cart);

    setCartItem(products);
  };

  const removeCartItem = (id: number) => {
    const newProductsCart = cartItem.filter((product) => product.id !== id);

    const newTotal = newProductsCart.reduce(
      (acc, item) => {
        const quantity = acc.qty - item.qty;
        const totalPrice =
          acc.price -
          item.qty *
            parseFloat(
              parseFloat(
                currency === "CHF" ? item.price : String(item.euroPrice)
              ).toFixed(2)
            );

        return {
          qty: quantity,
          price: totalPrice,
        };
      },
      {
        qty: 0,
        price: 0,
      }
    );

    const { qty, price } = newTotal;

    const _cart = {
      products: newProductsCart,
      totalProductsCount: Math.abs(qty),
      totalProductsPrice: Math.abs(price),
      timestamp,
    };
    Report.success(`${productRemoved}`, "", "Ok");

    if (typeof window !== "undefined") {
      if (_cart.totalProductsCount === 0) {
        localStorage.removeItem("inmotion:cart");
      } else {
        localStorage.setItem("inmotion:cart", JSON.stringify(_cart));
      }
    }

    setCart(_cart);

    setCartItem(newProductsCart);
  };

  const updateTotal = useCallback(
    (total: string) => {
      const _cart = {
        ...cart,
        totalWithCoupon: parseFloat(parseFloat(total).toFixed(2)),
      };

      setCart(_cart);
    },
    [cart]
  );

  return (
    <CartContext.Provider
      value={{
        cartItem,
        cart,
        addToCart,
        removeCartItem,
        updateTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
