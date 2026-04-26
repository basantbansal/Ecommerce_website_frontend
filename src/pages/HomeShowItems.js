import Button from "../components/Button";
import CartContext from "../context/cart";
import {useContext }from 'react';
import {useNavigate} from 'react-router-dom'

function HomeShowItems({currItems,onClickButton,onClickImage, emptyMessage = "No products found."}){
const { cartItems } = useContext(CartContext);
const navigate = useNavigate();

    const handleClickButton=(item)=>{
        onClickButton(item);
    }

    const handleClickImage=(item)=>{
        onClickImage(item);
    }

    const items = currItems.map(item => { // works as a for loop 
        const productId = item._id || item.id;
        const existing = cartItems.find(prev=>(prev._id || prev.productId || prev.id)===productId);
        const isOutOfStock = item.stock === 0;
        return (
          <div
            key={productId}
            className="bg-white p-4 rounded-lg shadow flex flex-col"
          >
            <img
            onClick = {()=>handleClickImage(item)}
              src={item.thumbnail || item.images?.[0]}
              alt={item.title}
              className="w-full h-32 object-contain mb-2 cursor-pointer"
            />

            <h2 className="text-sm font-medium line-clamp-2">
              {item.title}
            </h2>

            <p className="text-lg font-bold mt-1">
              ${item.price}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              {item.stock > 0 ? `${item.stock} available` : "Out of stock"}
            </p>
            {existing ? (
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
          </div>
        )})

    return (
      <>
        {currItems.length === 0 ? (
          <div className="max-w-5xl mx-auto mt-8 rounded-lg border border-gray-200 bg-white px-4 py-8 text-center text-gray-500">
            {emptyMessage}
          </div>
        ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">{items}</div>
        )}
      </>
    )
}

export default HomeShowItems;
