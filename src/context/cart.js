import { createContext, useContext, useState } from "react";
import PurchasedContext from "./Purchased";

const CartContext = createContext();

function CartProvider({ children }) {
  const { purchaseItems } = useContext(PurchasedContext);
  const [cartItems, setCartItems] = useState([]);
  const isCartLoading = false;

  const getProductId = (item) => {
    return item._id || item.productId || item.id;
  };

  const loadCart = async () => cartItems;

  // add / create item
  const createItem = async (item) => {
    const productId = getProductId(item);

    setCartItems((prev) => {
      const existing = prev.find(
        (cartItem) => getProductId(cartItem) === productId
      );

      if (existing) {
        return prev.map((cartItem) =>
          getProductId(cartItem) === productId
            ? { ...cartItem, quantity: (cartItem.quantity || 1) + 1 }
            : cartItem
        );
      }

      return [...prev, { ...item, productId, quantity: 1 }];
    });
  };

  // increase / decrease
  const itemIOD = async (item, x) => {
    const productId = getProductId(item);

    setCartItems((prev) =>
      prev
        .map((currItem) => {
          if (getProductId(currItem) === productId) {
            return { ...currItem, quantity: (currItem.quantity || 1) + x };
          }
          return currItem;
        })
        .filter((currItem) => currItem.quantity > 0)
    );
  };

  // delete item
  const deleteEvent = async (item) => {
    const productId = getProductId(item);

    setCartItems((prev) =>
      prev.filter((cartItem) => getProductId(cartItem) !== productId)
    );
  };

  // purchase + clear cart
  const clearCart = async () => {
    const order = await purchaseItems(cartItems);

    setCartItems([]);
    return order;
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isCartLoading,
        createItem,
        itemIOD,
        deleteEvent,
        clearCart,
        loadCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export { CartProvider };
export default CartContext;
