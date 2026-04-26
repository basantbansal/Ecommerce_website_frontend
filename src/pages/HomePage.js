
import { useEffect, useMemo, useState, useContext } from "react";
import CartContext from "../context/cart";
// import NavigationContext from '../context/navigation';
import PopUp from "../components/PopUp";
import fetchItems from '../api';
import HomeShowItems from './HomeShowItems';
import {useNavigate, useSearchParams} from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { createItem } = useContext(CartContext); // here we are using the createItem function from the CartContext to add items to the cart when the button is clicked ...
  const [currItems, setItems] = useState([]); // here we are fetching currItems through an external api or url... 
  const [showPopup, setShowPopup] = useState(""); // this is for showing the popUp when we click the add to cart button , and it will be false when we close the popUp or after some time ...
  const [error, setError] = useState("");
  const searchTerm = (searchParams.get("search") || "").trim().toLowerCase();
  //const [showDetails,setShowDetails] = useState(null); might be used for making the handleClickImage in state-design way ...

  const handleClickButton = async (item) => {
    try {
      setError("");
      await createItem(item);
      setShowPopup("✅ Item added to cart");
    } catch (fetchError) {
      setShowPopup(fetchError.response?.data?.message || "Unable to add this item to cart");
    }
  };

  const handleClickImage = (item)=>{
    // we could have use two ways to show the image detail here , those two are state-design and navigate-design , i am going with the navigate one before is simple and more scalable. 
    navigate(`/product/${item._id || item.id}`);
  }

  useEffect(() => {
    const loadItems = async () => {
      try {
        setError("");
        const data = await fetchItems(); 
        setItems(data);
      } catch (fetchError) {
        setError(fetchError.response?.data?.message || "Unable to load products right now");
      }
    };

  loadItems();
  }, []);

  const filteredItems = useMemo(() => {
    if (!searchTerm) return currItems;

    return currItems.filter((item) => {
      const searchableText = [
        item.title,
        item.description,
        item.category,
        item.brand,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return searchableText.includes(searchTerm);
    });
  }, [currItems, searchTerm]);

  return (
    <>
      {/* POPUP */}
      {showPopup && (
        <PopUp onClose={() => setShowPopup("")}> 
          {showPopup}
        </PopUp>
      )}

      {error && (
        <div className="max-w-5xl mx-auto mt-8 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-600">
          {error}
        </div>
      )}

      {/* PRODUCTS GRID */}
        <HomeShowItems
          currItems={filteredItems}
          onClickButton={handleClickButton}
          onClickImage={handleClickImage}
          emptyMessage={
            searchTerm
              ? `No products found for "${searchParams.get("search")}".`
              : "No products found."
          }
        />
    </>
  );
}

export default HomePage;
