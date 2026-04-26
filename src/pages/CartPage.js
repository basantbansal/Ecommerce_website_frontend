import { useContext, useState } from "react";
import CartContext from "../context/cart";
import CartShowItems from "./CartShowItems";
import BillingPage from "./BillingPage";
import PopUp from "../components/PopUp";
import { FaShoppingCart } from "react-icons/fa";

function CartPage() {
  const { cartItems } = useContext(CartContext);
  const [showPopup, setShowPopup] = useState(false);

  // EMPTY CART UI
  if (cartItems.length === 0) {
    return (
      <>
        {showPopup && (
          <PopUp onClose={() => setShowPopup(false)}>
            ✅ Purchase completed successfully!
          </PopUp>
        )}

        <div className="flex flex-col items-center justify-center mt-24 text-gray-500">
          <FaShoppingCart className="text-6xl mb-4 opacity-40" />
          <p className="text-xl font-semibold">Your cart is empty</p>
          <p className="text-sm mt-1">Add items to see them here</p>
        </div>
      </>
    );
  }

  return (
    <>

      <div className="max-w-5xl mx-auto p-6 grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-4">
          <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

          {cartItems.map(item => (
            <CartShowItems key={item._id || item.productId || item.id} item={item} />
          ))}
        </div>

        {/* Pass popup controls DOWN */}
        <BillingPage
          showSuccess={() => {
            setShowPopup(true);
          }}
        />
      </div>
    </>
  );
}

export default CartPage;
