"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

export type CartItem = {
  id: string;
  name: string;
  slug: string;
  price: number;
  imageUrl: string | null;
  quantity: number;
  stock: number;
};

type CartContextType = {
  items: CartItem[];
  totalQuantity: number;
  totalPrice: number;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  clearCart: () => void;
};

const CartContext =
  createContext<CartContextType | null>(null);

const STORAGE_KEY = "cetiner-store-cart";

export function CartProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const storedCart =
        localStorage.getItem(STORAGE_KEY);

      if (storedCart) {
        setItems(JSON.parse(storedCart));
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }

    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) {
      return;
    }

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(items)
    );
  }, [items, loaded]);

  function addItem(item: CartItem) {
    setItems((currentItems) => {
      const existingItem =
        currentItems.find(
          (current) => current.id === item.id
        );

      if (existingItem) {
        return currentItems.map((current) => {
          if (current.id !== item.id) {
            return current;
          }

          return {
            ...current,
            quantity: Math.min(
              current.quantity + 1,
              current.stock
            ),
          };
        });
      }

      return [
        ...currentItems,
        {
          ...item,
          quantity: Math.min(
            Math.max(item.quantity, 1),
            item.stock
          ),
        },
      ];
    });
  }

  function removeItem(id: string) {
    setItems((currentItems) =>
      currentItems.filter(
        (item) => item.id !== id
      )
    );
  }

  function increaseQuantity(id: string) {
    setItems((currentItems) =>
      currentItems.map((item) => {
        if (item.id !== id) {
          return item;
        }

        return {
          ...item,
          quantity: Math.min(
            item.quantity + 1,
            item.stock
          ),
        };
      })
    );
  }

  function decreaseQuantity(id: string) {
    setItems((currentItems) =>
      currentItems
        .map((item) => {
          if (item.id !== id) {
            return item;
          }

          return {
            ...item,
            quantity: item.quantity - 1,
          };
        })
        .filter((item) => item.quantity > 0)
    );
  }

  function clearCart() {
    setItems([]);
  }

  const totalQuantity = items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const totalPrice = items.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        totalQuantity,
        totalPrice,
        addItem,
        removeItem,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart yalnızca CartProvider içinde kullanılabilir."
    );
  }

  return context;
}