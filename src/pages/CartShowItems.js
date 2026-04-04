import { ImCross } from "react-icons/im";
import { useContext } from "react";
import CartContext from "../context/cart";
import {useNavigate} from 'react-router-dom'
import Button from '../components/Button'
function CartShowItems({ item }) {
  const { itemIOD, deleteEvent } = useContext(CartContext);
  const navigate = useNavigate();

  const handleClickImage = (item)=>{
    navigate(`/product/${item.id}`)
  }

  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm border">
      
      {/* Product Image */}
      <img
        src={item.thumbnail || item.images?.[0]}
        alt={item.title}
        className="w-20 h-20 object-contain cursor-pointer"
        onClick = {()=>{handleClickImage(item)}}
      />

      {/* Product Info */}
      <div className="flex-1">
        <p className="font-medium line-clamp-2">{item.title}</p>
        <p className="text-gray-600 mt-1">$ {item.price}</p>

        {/* Quantity Controls */}
        <div className="flex items-center gap-3 mt-3">
          <Button
            onClick={() => itemIOD(item, -1)}
            className="w-8 h-8 border rounded flex items-center justify-center hover:bg-gray-100"
          >
            −
          </Button>

          <span className="font-semibold">{item.quantity}</span>

          <Button
            onClick={() => itemIOD(item, 1)}
            className="w-8 h-8 border rounded flex items-center justify-center hover:bg-gray-100"
          >
            +
          </Button>
        </div>
      </div>

      {/* Price + Delete */}
      <div className="flex flex-col items-end gap-1">
  <p className="text-sm text-gray-500">
    $ {item.price} × {item.quantity}
  </p>

  <p className="font-semibold text-lg">
    $ {item.price * item.quantity}
  </p>

  <Button
    onClick={() => deleteEvent(item)}
    className="text-red-500 hover:text-red-700 mt-2"
  >
    <ImCross />
  </Button>
</div>

    </div>
  );
}

export default CartShowItems;
