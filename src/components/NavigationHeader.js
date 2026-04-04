import { GoHomeFill } from "react-icons/go";
import { FaBoxOpen, FaUserCircle } from "react-icons/fa";
import { MdOutlineInventory } from "react-icons/md";
import Icon from "./Icon";
import { useNavigate } from "react-router-dom";
import logo from "../assets/Logo.svg";
import { useUser } from "../context/user.js";

function NavigationHeader() {
    const navigate = useNavigate();
    const { user, logout } = useUser();

    const handleClick = (to) => (event) => {
        event.preventDefault();
        navigate(to);
    };

    const handleLogout = async () => {
        await logout()
        navigate("/login")
    }

    return (
        <header className="bg-white border-b shadow-sm">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

                {/* LEFT: App Navigation */}
                <div className="flex items-center gap-6">
                    <Icon
                        onClick={handleClick("/")}
                        className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition cursor-pointer"
                    >
                        <GoHomeFill className="text-xl" />
                        <span className="font-semibold">Items</span>
                    </Icon>

                    <Icon
                        onClick={handleClick("/cart")}
                        className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition cursor-pointer"
                    >
                        <FaBoxOpen className="text-xl" />
                        <span className="font-semibold">Cart</span>
                    </Icon>

                    <Icon
                        onClick={handleClick("/Purchased")}
                        className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition cursor-pointer"
                    >
                        <MdOutlineInventory className="text-xl" />
                        <span className="font-semibold">Purchased</span>
                    </Icon>
                </div>

                {/* RIGHT */}
                <div className="flex items-center gap-4">

                    {user ? (
                        // logged in — show avatar + logout
                        <>
                            <img
                                src={user.avatar}
                                alt={user.username}
                                onClick={handleClick("/profile")}
                                className="h-9 w-9 rounded-full object-cover cursor-pointer hover:ring-2 hover:ring-blue-500 transition"
                            />
                            <button
                                onClick={handleLogout}
                                className="px-4 py-1.5 text-sm font-semibold text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition cursor-pointer"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        // not logged in — show login/register
                        <>
                            <button
                                onClick={handleClick("/login")}
                                className="px-4 py-1.5 text-sm font-semibold text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition cursor-pointer"
                            >
                                Login
                            </button>
                            <button
                                onClick={handleClick("/register")}
                                className="px-4 py-1.5 text-sm font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 transition cursor-pointer"
                            >
                                Register
                            </button>
                        </>
                    )}

                    {/* Logo */}
                        <a 
                            href="https://www.youtube.com" 
                            target="_blank" 
                            rel="noreferrer"
                            className="cursor-pointer select-none"
                        >
                            <img
                                src={logo}
                                alt="Amazing logo"
                                className="h-9 w-auto transition-transform duration-200 hover:scale-105"
                            />
                        </a>
                </div>
            </div>
        </header>
    );
}

export default NavigationHeader;