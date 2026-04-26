import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./index.css"
import { BrowserRouter } from "react-router-dom"
import { CartProvider } from "./context/cart"
import { PurchasedProvider } from "./context/Purchased"
import { UserProvider } from "./context/user"

ReactDOM.createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <UserProvider>
            <PurchasedProvider>
                <CartProvider>
                    <App />
                </CartProvider>
            </PurchasedProvider>
        </UserProvider>
    </BrowserRouter>
)

