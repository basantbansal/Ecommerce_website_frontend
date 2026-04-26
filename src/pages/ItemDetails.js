import { useParams,useNavigate } from "react-router-dom";
import { useEffect, useState,useContext } from "react";
import { fetchItemById } from "../api";
import CartContext from "../context/cart";
import PopUp from "../components/PopUp";
import Button from "../components/Button";
import PurchasedContext from '../context/Purchased';

function ItemDetails() {
  const { purchaseItems } = useContext(PurchasedContext);
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(''); // empty means no popUp , then we got the messages LOL
  const { createItem,cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  const isInCart = 
  item && cartItems.some(cartItem => (cartItem._id || cartItem.productId || cartItem.id) === (item._id || item.id));


  useEffect(() => {
    const loadItem = async () => {
      try {
        const data = await fetchItemById(id);
        setItem(data);
      } catch (error) {
        setItem(null);
      } finally {
        setLoading(false);
      }
    };
    loadItem();
  }, [id]);

  const handleClickButton = async (item) => {
    try {
      await createItem(item);
      setShowPopup("✅ Item added to cart");
    } catch (error) {
      setShowPopup(error.response?.data?.message || "Unable to add item to cart");
    }
  };
  
 const handlePurchase = async () => {
  try {
    await purchaseItems([
      {
        ...item,
        quantity: 1
      }
    ]);

    setShowPopup("✅ Purchase completed successfully!");
  } catch (error) {
    setShowPopup(error.response?.data?.message || "Unable to complete purchase");
  }
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

  const reviewCount = item.reviews?.length ?? 0;
  const ratingValue =
    typeof item.rating === "number" ? item.rating.toFixed(2) : "N/A";
  const filledStars = Math.max(
    0,
    Math.min(5, Math.round(Number(item.rating) || 0))
  );
  const originalPrice = item.discountPercentage
    ? (item.price / (1 - item.discountPercentage / 100)).toFixed(2)
    : null;
  const isOutOfStock = item.stock === 0;

  const productFacts = [
    { label: "SKU", value: item.sku },
    { label: "Stock", value: typeof item.stock === "number" ? `${item.stock} left` : null },
    { label: "Weight", value: item.weight ? `${item.weight} kg` : null },
    {
      label: "Dimensions",
      value: item.dimensions
        ? `${item.dimensions.width}W x ${item.dimensions.height}H x ${item.dimensions.depth}D`
        : null,
    },
    { label: "Shipping", value: item.shippingInformation },
    { label: "Warranty", value: item.warrantyInformation },
    { label: "Returns", value: item.returnPolicy },
    {
      label: "Minimum Order",
      value: item.minimumOrderQuantity
        ? `${item.minimumOrderQuantity} units`
        : null,
    },
  ].filter(fact => fact.value);

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
              src={item.thumbnail || item.images?.[0]}
              alt={item.title}
              className="max-h-[450px] object-contain"
            />
          </div>

          {/* DETAILS SECTION */}
          <div className="flex flex-col">

            {/* CATEGORY + STATUS */}
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <span className="inline-block w-fit px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-700 capitalize">
                {item.category}
              </span>

              {item.availabilityStatus && (
                <span className="inline-block w-fit px-3 py-1 text-sm rounded-full bg-green-100 text-green-700">
                  {item.availabilityStatus}
                </span>
              )}
            </div>

            {/* TITLE */}
            <h1 className="text-3xl font-semibold text-gray-800 leading-snug">
              {item.title}
            </h1>

            {/* RATING */}
            <div className="flex items-center gap-3 mt-3">
              <div className="flex items-center text-yellow-400">
                {"★".repeat(filledStars)}
                <span className="text-gray-300 ml-1">
                  {"★".repeat(5 - filledStars)}
                </span>
              </div>
              <span className="text-sm text-gray-600">
                {ratingValue} ({reviewCount} reviews)
              </span>
            </div>

            {/* PRICE */}
            <div className="mt-6 bg-white rounded-xl shadow p-5 w-fit min-w-[220px]">
              <p className="text-3xl font-bold text-green-600">
                ${item.price}
              </p>
              <div className="mt-2 space-y-1 text-sm text-gray-500">
                {originalPrice && (
                  <p>
                    MRP <span className="line-through">${originalPrice}</span>
                    {" · "}
                    <span className="text-green-600 font-medium">
                      {item.discountPercentage}% off
                    </span>
                  </p>
                )}
                {item.minimumOrderQuantity && (
                  <p>Minimum order: {item.minimumOrderQuantity}</p>
                )}
              </div>
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

            {/* TAGS */}
            {item.tags?.length > 0 && (
              <div className="mt-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-3">
                  Tags
                </h2>
                <div className="flex flex-wrap gap-2">
                  {item.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* PRODUCT FACTS */}
            <div className="mt-8">
              <h2 className="text-lg font-semibold text-gray-800 mb-3">
                Product Details
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {productFacts.map(fact => (
                  <div
                    key={fact.label}
                    className="bg-white rounded-xl shadow-sm border p-4"
                  >
                    <p className="text-sm text-gray-500">{fact.label}</p>
                    <p className="text-gray-800 font-medium mt-1">{fact.value}</p>
                  </div>
                ))}
              </div>
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
                disabled={isOutOfStock}
                onClick={() => handleClickButton(item)}
              >
                {isOutOfStock ? "Out of Stock" : "Add to Cart"}
              </Button>
              )}

              <Button
                success
                rounded
                className="w-full justify-center mt-6"
                disabled={isOutOfStock}
                onClick={handlePurchase}
               >
                {isOutOfStock ? "Unavailable" : "Purchase"}
              </Button>
            </div>

          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default ItemDetails;
