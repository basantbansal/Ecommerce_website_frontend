import { createContext, useCallback, useContext, useEffect, useState } from "react";
import PurchasedContext from "./Purchased";
import { addCartItem, getCart, removeCartItem, updateCartItem } from "../api";
import { useUser } from "./user";

const CartContext = createContext();

function CartProvider({ children }) {
  const { purchaseItems } = useContext(PurchasedContext);
  const { user, isLoadingUser } = useUser();
  const [cartItems, setCartItems] = useState([]);
  const [isCartLoading, setIsCartLoading] = useState(false);

  const getProductId = (item) => {
    return item._id || item.productId || item.id;
  };

  const formatCartItems = useCallback((cart) => {
    return (cart?.items || [])
      .filter((item) => item.product)
      .map((item) => ({
        ...item.product,
        productId: item.product._id,
        quantity: item.quantity,
      }));
  }, []);

  const updateCartState = useCallback((response) => {
    const formattedItems = formatCartItems(response.data.data);
    setCartItems(formattedItems);
    return formattedItems;
  }, [formatCartItems]);

  const loadCart = useCallback(async () => {
    if (!user) {
      setCartItems([]);
      return [];
    }

    setIsCartLoading(true);

    try {
      const response = await getCart();
      return updateCartState(response);
    } finally {
      setIsCartLoading(false);
    }
  }, [user, updateCartState]);

  useEffect(() => {
    if (isLoadingUser) return;

    if (!user) {
      setCartItems([]);
      return;
    }

    loadCart();
  }, [user, isLoadingUser, loadCart]);

  // add / create item
  const createItem = async (item) => {
    const productId = getProductId(item);
    const response = await addCartItem(productId);
    return updateCartState(response);
  };

  // increase / decrease
  const itemIOD = async (item, x) => {
    const productId = getProductId(item);
    const response = await updateCartItem(productId, x);
    return updateCartState(response);
  };

  // delete item
  const deleteEvent = async (item) => {
    const productId = getProductId(item);
    const response = await removeCartItem(productId);
    return updateCartState(response);
  };

  // purchase + clear cart
  const clearCart = async (idempotencyKey) => {
    const order = await purchaseItems(undefined, idempotencyKey); // undefined here because items are taken from cart on backend, so we don't need to pass them explicitly  

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
