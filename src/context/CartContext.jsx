import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item, quantityToAdd = 1) => {
    setCartItems((prevCartItems) => {
      const existingItemIndex = prevCartItems.findIndex(
        (cartItem) => cartItem.id === item.id,
      );

      if (existingItemIndex !== -1) {
        const updatedCart = [...prevCartItems];
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
          quantity: updatedCart[existingItemIndex].quantity + quantityToAdd,
        };
        return updatedCart;
      }

      return [...prevCartItems, { ...item, quantity: quantityToAdd }];
    });
  };

  const removeFromCart = (itemId) => {
    setCartItems((prevCartItems) =>
      prevCartItems.filter((cartItem) => cartItem.id !== itemId),
    );
  };

  const updatedQuantity = (itemId, currentQuantity) => {
    if (currentQuantity <= 0) {
      setCartItems((prev) => prev.filter((item) => item.id !== itemId));
      return;
    }

    setCartItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, quantity: currentQuantity } : item,
      ),
    );
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updatedQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  return context;
};
