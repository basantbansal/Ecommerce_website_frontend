import { useContext } from "react";
import PurchasedContext from "../context/Purchased";
import {useNavigate} from 'react-router-dom';

function PurchasedPage() {
  const { purchases } = useContext(PurchasedContext);
const navigate = useNavigate();
  const handleClickImage = (item)=>{
    navigate(`/product/${item.id}`)
  }

  if (purchases.length === 0) {
    return (
      <div className="flex justify-center items-center h-[60vh] text-gray-500">
        You haven’t purchased anything yet.
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-8">Your Purchases</h1>

      <div className="space-y-10">
        {purchases.map(purchase => (
          <div
            key={purchase.id}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            {/* ORDER HEADER */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <p className="font-semibold text-lg">
                  Order #{purchase.id.slice(0, 8)}
                </p>
                <p className="text-sm text-gray-500">
                  {new Date(purchase.time).toLocaleString()}
                </p>
              </div>

              {/* <p className="text-xl font-bold text-green-600">
                Total: ${purchase.total.toFixed(2)}
              </p> */}
            </div>

            {/* TABLE HEADER */}
            <div className="grid grid-cols-6 font-semibold text-gray-600 border-b pb-2">
              <span className="col-span-3">Item</span>
              <span className="text-center">Price</span>
              <span className="text-center">Qty</span>
              <span className="text-right">Subtotal</span>
            </div>

            {/* ITEMS */}
            {purchase.items.map(item => (
              <div
                key={item.id}
                className="grid grid-cols-6 items-center py-4 border-b last:border-b-0"
              >
                <div className="col-span-3 flex items-center gap-4">
                  <img
                    onClick = {()=>handleClickImage(item)}
                    src={item.image}
                    alt={item.title}
                    className="w-14 h-14 object-contain cursor-pointer"
                  />
                  <p className="line-clamp-1">{item.title}</p>
                </div>

                <p className="text-center">${item.price}</p>
                <p className="text-center">{item.quantity}</p>
                <p className="text-right font-medium">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}

            {/* FOOTER */}
            <div className="flex justify-end mt-6">
              <div className="text-right">
                <p className="text-gray-500">Grand Total</p>
                <p className="text-2xl font-bold text-green-600">
                  ${purchase.total.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PurchasedPage;
