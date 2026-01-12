
import { useEffect, useState, useContext } from "react";
import CartContext from "../context/Cart";
// import NavigationContext from '../context/navigation';
import PopUp from "../components/PopUp";
import fetchItems from '../api';
import HomeShowItems from './HomeShowItems';
import {useNavigate} from 'react-router-dom';


function HomePage() {
  const navigate = useNavigate();
  const { createItem } = useContext(CartContext);
  const [currItems, setItems] = useState([]); // here we are fetching currItems through an external api or url... 
  const [showPopup, setShowPopup] = useState(false);
  //const [showDetails,setShowDetails] = useState(null); might be used for making the handleClickImage in state-design way ...

  const handleClickButton = (item) => {
    createItem(item);
    setShowPopup(true);       
  };

  const handleClickImage = (item)=>{
    // we could have use two ways to show the image detail here , those two are state-design and navigate-design , i am going with the navigate one before is simple and more scalable. 
    navigate(`/product/${item.id}`);
  }

  useEffect(() => {
    const loadItems = async () => {
    const data = await fetchItems(); 
    setItems(data);
  };

  loadItems();
  }, []);

  return (
    <>
      {/* POPUP */}
      {showPopup && (
        <PopUp onClose={() => setShowPopup(false)}>
          ✅ Item added to cart
        </PopUp>
      )}

      {/* PRODUCTS GRID */}
        <HomeShowItems currItems={currItems} onClickButton={handleClickButton} onClickImage={handleClickImage} />
    </>
  );
}

export default HomePage;
