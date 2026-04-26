import { createContext, useState } from "react";

const PurchasedContext = createContext();

export function PurchasedProvider({ children }) {
  const [purchases, setPurchases] = useState([]);
  const isPurchasesLoading = false;

  const buildGuestPurchase = (cartItems) => {
    const totalAmount = cartItems.reduce(
      (sum, item) => sum + item.price * (item.quantity || 1),
      0
    );

    return {
      id: crypto.randomUUID(),
      time: new Date().toISOString(),
      items: cartItems.map((item) => ({
        ...item,
        productId: item._id || item.productId || item.id,
        quantity: item.quantity || 1,
      })),
      total: totalAmount,
      status: "placed",
    };
  };

  const prependPurchase = (purchase) => {
    setPurchases((prev) => [
      purchase,
      ...prev.filter((existingPurchase) => existingPurchase.id !== purchase.id),
    ]);
  };

  const refreshPurchases = async () => purchases;

  const purchaseItems = async (cartItems) => {
    const normalizedItems = cartItems.map((item) => ({
      ...item,
      productId: item._id || item.productId || item.id,
      quantity: item.quantity || 1,
    }));

    if (!normalizedItems.length) {
      return null;
    }

    const purchase = buildGuestPurchase(normalizedItems);
    prependPurchase(purchase);
    return purchase;
  };

  return (
    <PurchasedContext.Provider
      value={{
        purchases,
        purchaseItems,
        prependPurchase,
        refreshPurchases,
        isPurchasesLoading,
      }}
    >
      {children}
    </PurchasedContext.Provider>
  );
}

export default PurchasedContext;
