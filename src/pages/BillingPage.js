import { useContext } from "react";
import CartContext from "../context/Cart";
import Button from "../components/Button";

function BillingPage({ showSuccess }) {
  const { cartItems, clearCart } = useContext(CartContext);

  const totalItems = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handlePurchase = () => {
    clearCart();
    showSuccess();
  };

  return (
    <div className="bg-white border rounded-lg p-6 shadow-sm h-fit">
      <h2 className="text-xl font-bold mb-6">Order Summary</h2>

      <div className="space-y-3 text-gray-700">
        <div className="flex justify-between">
          <span>Items</span>
          <span>{totalItems}</span>
        </div>

        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>

        <div className="border-t pt-3 flex justify-between font-semibold text-lg">
          <span>Total</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
      </div>

      <Button
        success
        rounded
        className="w-full justify-center mt-6"
        onClick={handlePurchase}
      >
        Purchase
      </Button>
    </div>
  );
}

export default BillingPage;
