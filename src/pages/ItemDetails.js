import { useParams,useNavigate } from "react-router-dom";
import { useEffect, useState,useContext } from "react";
import { fetchItemById } from "../api";
import CartContext from "../context/Cart";
import PopUp from "../components/PopUp";
import Button from "../components/Button";
import PurchasedContext from '../context/Purchased';

function ItemDetails() {
  const {addPurchase} = useContext(PurchasedContext);
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(''); // empty means no popUp , then we got the messages LOL
  const { createItem,cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  const isInCart =
  item && cartItems.some(cartItem => cartItem.id === item.id);


  useEffect(() => {
    const loadItem = async () => {
      const data = await fetchItemById(id);
      setItem(data);
      setLoading(false);
    };
    loadItem();
  }, [id]);

  const handleClickButton = (item) => {
    createItem(item);
    setShowPopup("✅ Item added to cart");       
  };
  
 const handlePurchase = () => {
  addPurchase([
    {
      ...item,
      quantity: 1
    }
  ]);

  setShowPopup("✅ Purchase completed successfully!");
};

  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh] text-gray-500 text-lg">
        Loading product…
      </div>
    );
  }

  if (!item) {
    return (
      <div className="flex justify-center items-center h-[60vh] text-red-500">
        Product not found
      </div>
    );
  }

  return (
    <>
      {showPopup && (
        <PopUp onClose={() => setShowPopup('')}>
          {showPopup}
        </PopUp>
      )}
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14">

          {/* IMAGE SECTION */}
          <div className="bg-white rounded-2xl shadow p-8 flex items-center justify-center">
            <img
              src={item.image}
              alt={item.title}
              className="max-h-[450px] object-contain"
            />
          </div>

          {/* DETAILS SECTION */}
          <div className="flex flex-col">

            {/* CATEGORY */}
            <span className="inline-block w-fit mb-3 px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-700 capitalize">
              {item.category}
            </span>

            {/* TITLE */}
            <h1 className="text-3xl font-semibold text-gray-800 leading-snug">
              {item.title}
            </h1>

            {/* RATING */}
            <div className="flex items-center gap-3 mt-3">
              <div className="flex items-center text-yellow-400">
                {"★".repeat(Math.round(item.rating.rate))}
                <span className="text-gray-300 ml-1">
                  {"★".repeat(5 - Math.round(item.rating.rate))}
                </span>
              </div>
              <span className="text-sm text-gray-600">
                {item.rating.rate} ({item.rating.count} reviews)
              </span>
            </div>

            {/* PRICE */}
            <div className="mt-6 bg-white rounded-xl shadow p-5 w-fit">
              <p className="text-3xl font-bold text-green-600">
                ${item.price}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Inclusive of all taxes
              </p>
            </div>

            {/* DESCRIPTION */}
            <div className="mt-8">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                Product Description
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {item.description}
              </p>
            </div>

            {/* ACTION BUTTONS */}
            <div className="mt-10 flex gap-4">
              {isInCart ? (
              <Button
                success
                className="mt-auto w-full justify-center"
                onClick={() => navigate("/cart")}
              >
                Go to Cart
              </Button>
              ) : (
              <Button
                primary
                className="mt-auto w-full justify-center"
                onClick={() => handleClickButton(item)}
              >
                Add to Cart
              </Button>
              )}

              <Button
                success
                rounded
                className="w-full justify-center mt-6"
                onClick={handlePurchase}
               >
                Purchase
              </Button>
            </div>

            {/* TRUST INFO */}
            <div className="mt-10 grid grid-cols-2 gap-4 text-sm text-gray-600">
              <p>✔ Free delivery in 3–5 days</p>
              <p>✔ Cash on Delivery available</p>
              <p>✔ 7-day replacement policy</p>
              <p>✔ Secure payments</p>
            </div>

          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default ItemDetails;
