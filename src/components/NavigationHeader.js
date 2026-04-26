import { GoHomeFill } from "react-icons/go";
import { FaBoxOpen } from "react-icons/fa";
import { FiSearch, FiX } from "react-icons/fi";
import { MdOutlineInventory } from "react-icons/md";
import Icon from "./Icon";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/Logo.svg";
import { useUser } from "../context/user.js";

function NavigationHeader() {
    const navigate = useNavigate();
    const location = useLocation();
    const { user, logout } = useUser();
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        setSearchTerm(params.get("search") || "");
    }, [location.search]);

    const handleClick = (to) => (event) => {
        event.preventDefault();
        navigate(to);
    };

    const handleLogout = async () => {
        await logout()
        navigate("/login")
    }

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        const query = searchTerm.trim();
        navigate(query ? `/?search=${encodeURIComponent(query)}` : "/");
    };

    const handleClearSearch = () => {
        setSearchTerm("");
        navigate("/");
    };

    return (
        <header className="bg-white border-b shadow-sm">
            <div className="max-w-7xl mx-auto px-6 min-h-16 py-3 flex flex-wrap items-center justify-between gap-4">

                {/* LEFT: App Navigation */}
                <div className="flex flex-wrap items-center gap-4 sm:gap-6">
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

                    <Icon
                        onClick={handleClick("/seller")}
                        className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition cursor-pointer"
                    >
                        <MdOutlineInventory className="text-xl" />
                        <span className="font-semibold">Seller</span>
                    </Icon>

                </div>

                <form
                    onSubmit={handleSearchSubmit}
                    className="order-3 w-full md:order-none md:w-auto md:flex-1 md:max-w-md"
                >
                    <div className="flex h-10 items-center rounded-md border border-gray-300 bg-gray-50 px-3 focus-within:border-blue-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-100">
                        <FiSearch className="text-gray-400" />
                        <input
                            type="search"
                            value={searchTerm}
                            onChange={(event) => setSearchTerm(event.target.value)}
                            placeholder="Search products..."
                            className="min-w-0 flex-1 bg-transparent px-2 text-sm text-gray-700 outline-none placeholder:text-gray-400"
                        />
                        {searchTerm && (
                            <button
                                type="button"
                                onClick={handleClearSearch}
                                aria-label="Clear search"
                                className="grid h-7 w-7 place-items-center rounded-md text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition cursor-pointer"
                            >
                                <FiX className="icon-no-margin" />
                            </button>
                        )}
                    </div>
                </form>

                {/* RIGHT */}
                <div className="flex flex-wrap items-center gap-4">

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
                            href="https://portfolio-theta-five-tz0auun8g4.vercel.app" 
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
