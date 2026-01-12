import { GoHomeFill } from "react-icons/go";
import { FaBoxOpen, FaUserAstronaut } from "react-icons/fa";
import { MdOutlineInventory } from "react-icons/md";
import Icon from "../components/Icon";
import { useNavigate } from "react-router-dom";
import logo from "../assets/Logo.svg";

function NavigationHeader() {
  const navigate = useNavigate();

  const handleClick = (to) => (event) => {
    event.preventDefault();
    navigate(to);
  };

  return (
    <header className="bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* LEFT: App Navigation */}
        <div className="flex items-center gap-6">
          <Icon
            onClick={handleClick("/")}
            className="flex items-center gap-2 text-gray-700 
                       hover:text-blue-600 transition cursor-pointer"
          >
            <GoHomeFill className="text-xl" />
            <span className="font-semibold">Items</span>
          </Icon>

          <Icon
            onClick={handleClick("/cart")}
            className="flex items-center gap-2 text-gray-700 
                       hover:text-blue-600 transition cursor-pointer"
          >
            <FaBoxOpen className="text-xl" />
            <span className="font-semibold">Cart</span>
          </Icon>

          <Icon
            onClick={handleClick("/Purchased")}
            className="flex items-center gap-2 text-gray-700 
                       hover:text-blue-600 transition cursor-pointer"
          >
            <MdOutlineInventory className="text-xl" />
            <span className="font-semibold">Purchased</span>
          </Icon>
        </div>

        {/* RIGHT: Creator + Logo */}
        <div className="flex items-center gap-6">

          {/* Creator (VISIBLE, readable, intentional) */}
          <Icon
            onClick={handleClick("/ShowMe")}
            className="flex items-center gap-2 text-gray-600
                       hover:text-cyan-600 transition cursor-pointer"
          >
            <FaUserAstronaut className="text-xl" />
            <span className="font-semibold">
              Creator
            </span>
          </Icon>

          {/* Logo */}
          <div
            onClick={handleClick("/")}
            className="cursor-pointer select-none"
          >
            <img
              src={logo}
              alt="Amazing logo"
              className="h-9 w-auto transition-transform duration-200 hover:scale-105"
            />
          </div>

        </div>

      </div>
    </header>
  );
}

export default NavigationHeader;
