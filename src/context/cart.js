import { createContext, useState, useContext } from "react";
import PurchasedContext from "./Purchased";

const CartContext = createContext();

function CartProvider({ children }) {
  const { addPurchase } = useContext(PurchasedContext);
  const [cartItems, setCartItems] = useState([]);

  // add / create item
  const createItem = (item) => {
    setCartItems(prev => {
      const existing = prev.find(p => p.id === item.id);

      if (existing) {
        return prev.map(p =>
          p.id === item.id
            ? { ...p, quantity: p.quantity + 1 }
            : p
        );
      }

      return [...prev, { ...item, quantity: 1 }];
    });
  };

  // increase / decrease
  const itemIOD = (item, x) => {
    setCartItems(prev =>
      prev
        .map(currItem => {
          if (currItem.id === item.id) {
            return { ...currItem, quantity: currItem.quantity + x };
          }
          return currItem;
        })
        .filter(item => item.quantity > 0)
    );
  };

  // delete item
  const deleteEvent = (item) => {
    setCartItems(prev =>
      prev.filter(p => p.id !== item.id)
    );
  };

  // purchase + clear cart
  const clearCart = () => {
    addPurchase(cartItems);
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        createItem,
        itemIOD,
        deleteEvent,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export { CartProvider };
export default CartContext;
