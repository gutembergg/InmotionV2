import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";

import Notiflix, { Report } from "notiflix";
import useCurrency from "../../hooks/useCurrency";
import { IProduct } from "../../interfaces/IProducts";

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
}

export const CartContext = createContext<ICartContext>({} as ICartContext);

const CartProvider = ({ children }: Children) => {
  const { currency } = useCurrency();
  const [cartItem, setCartItem] = useState<IProduct[]>([]);
  const [cart, setCart] = useState<ICartState>({} as ICartState);

  const getLocalStorageData = useCallback(() => {
    if (typeof window !== "undefined") {
      const existsCart = localStorage.getItem("inmotion:cart");

      if (existsCart) {
        const cart: ICartState = JSON.parse(existsCart);
        setCart(cart);
        setCartItem(cart.products);
      }
    }
  }, []);

  useEffect(() => {
    getLocalStorageData();
    // eslint-disable-next-line
  }, []);

  const addToCart = (products: IProduct[]) => {
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
    };
    console.log("product", products);
    // Notiflix.Notify.success("produit ajouté au panier");
    Report.success(
      "Produit Ajouté au panier",
      "<p>Pensez à vous protéger! Voici ce que nous vous conseillons:</p><br /><br />",
      "Okay"
    );
    if (typeof window !== "undefined") {
      localStorage.setItem("inmotion:cart", JSON.stringify(_cart));
    }
    console.log("_cart", _cart);
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
    };
    Notiflix.Notify.success("produit retiré du panier");

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
      value={{ cartItem, cart, addToCart, removeCartItem, updateTotal }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
