import { createContext, useCallback, useContext, useEffect, useState } from "react";
import {
  createOrder,
  createRazorpayOrder,
  getOrders,
  resetProductCache,
  verifyRazorpayPayment
} from "../api";
import { useUser } from "./user";

const PurchasedContext = createContext();

export function PurchasedProvider({ children }) {
  const { user, isLoadingUser } = useUser();
  const [purchases, setPurchases] = useState([]);
  const [isPurchasesLoading, setIsPurchasesLoading] = useState(false);

  const formatOrders = useCallback((orders) => {
    return (orders || []).map((order) => ({
      id: order._id,
      time: order.createdAt,
      total: order.total,
      status: order.status,
      items: (order.items || [])
        .filter((item) => item.product)
        .map((item) => ({
          ...item.product,
          productId: item.product._id,
          quantity: item.quantity,
          price: item.price
        }))
    }));
  }, []);

  const loadPurchases = useCallback(async () => {
    if (!user) {
      setPurchases([]);
      return [];
    }

    setIsPurchasesLoading(true);

    try {
      const response = await getOrders();
      const formattedOrders = formatOrders(response.data.data);
      setPurchases(formattedOrders);
      return formattedOrders;
    } finally {
      setIsPurchasesLoading(false);
    }
  }, [user, formatOrders]);

  useEffect(() => {
    if (isLoadingUser) return;

    if (!user) {
      setPurchases([]);
      return;
    }

    loadPurchases();
  }, [user, isLoadingUser, loadPurchases]);

  const loadRazorpayCheckout = () => {
    return new Promise((resolve, reject) => {
      if (window.Razorpay) {
        resolve();
        return;
      }

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = resolve;
      script.onerror = () => reject(new Error("Unable to load Razorpay checkout"));
      document.body.appendChild(script);
    });
  };

  const openRazorpayCheckout = async (checkout) => {
    await loadRazorpayCheckout();

    return await new Promise((resolve, reject) => {
      const razorpay = new window.Razorpay({
        key: checkout.keyId,
        amount: checkout.amount,
        currency: checkout.currency,
        name: checkout.name,
        description: checkout.description,
        order_id: checkout.razorpayOrderId,
        prefill: {
          name: user?.fullName,
          email: user?.email
        },
        handler: resolve,
        modal: {
          ondismiss: () => reject(new Error("Payment was cancelled"))
        },
        theme: {
          color: "#3b82f6"
        }
      });

      razorpay.open();
    });
  };

  const purchaseItems = async (items, idempotencyKey = crypto.randomUUID()) => { // here items are undefined because we are taking them from cart on backend, so we don't need to pass them explicitly
    const orderItems = items?.map((item) => ({
      productId: item._id || item.productId || item.id,
      quantity: item.quantity || 1
    }));
    const response = await createOrder(orderItems, idempotencyKey); // here orderItems are undefined because we are taking them from cart on backend, so we don't need to pass them explicitly
    const payment = response.data.data.payment;
    const razorpayOrderResponse = await createRazorpayOrder(payment._id);
    const razorpayPayment = await openRazorpayCheckout(razorpayOrderResponse.data.data);
    const confirmedPayment = await verifyRazorpayPayment(payment._id, razorpayPayment);
    resetProductCache();
    const order = formatOrders([confirmedPayment.data.data])[0];

    setPurchases((prev) => [
      order,
      ...prev.filter((existingPurchase) => existingPurchase.id !== order.id),
    ]);

    return order;
  };

  return (
    <PurchasedContext.Provider
      value={{
        purchases,
        purchaseItems,
        loadPurchases,
        isPurchasesLoading,
      }}
    >
      {children}
    </PurchasedContext.Provider>
  );
}

export default PurchasedContext;
export const usePurchased = () => useContext(PurchasedContext);
