import { createContext, useState } from "react";

const PurchasedContext = createContext();

export function PurchasedProvider({ children }) {
  const [purchases, setPurchases] = useState([]);

  const addPurchase = (cartItems) => {
    // cartItems should already have quantity
    const totalAmount = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const newPurchase = {
      id: crypto.randomUUID(),
      time: new Date().toISOString(),
      items: cartItems,
      total: totalAmount
    };

    setPurchases(prev => [newPurchase, ...prev]);
  };

  return (
    <PurchasedContext.Provider value={{ purchases, addPurchase }}>
      {children}
    </PurchasedContext.Provider>
  );
}

export default PurchasedContext;
