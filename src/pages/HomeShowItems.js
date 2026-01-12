import Button from "../components/Button";
import CartContext from "../context/Cart";
import {useContext }from 'react';
import {useNavigate} from 'react-router-dom'

function HomeShowItems({currItems,onClickButton,onClickImage}){
const { cartItems } = useContext(CartContext);
const navigate = useNavigate();

    const handleClickButton=(item)=>{
        onClickButton(item);
    }

    const handleClickImage=(item)=>{
        onClickImage(item);
    }

    const items = currItems.map(item => {
        const existing = cartItems.find(prev=>prev.id===item.id);
        return (
          <div
            key={item.id}
            className="bg-white p-4 rounded-lg shadow flex flex-col"
          >
            <img
            onClick = {()=>handleClickImage(item)}
              src={item.image}
              alt={item.title}
              className="w-full h-32 object-contain mb-2 cursor-pointer"
            />

            <h2 className="text-sm font-medium line-clamp-2">
              {item.title}
            </h2>

            <p className="text-lg font-bold mt-1">
              ${item.price}
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
            onClick={() => handleClickButton(item)}
          >
            Add to Cart
          </Button>
        )}
          </div>
        )})

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">{items}</div>
    )
}

export default HomeShowItems;