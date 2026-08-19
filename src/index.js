import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./index.css"
import { BrowserRouter } from "react-router-dom"
import { CartProvider } from "./context/cart"
import { PurchasedProvider } from "./context/Purchased"
import { UserProvider } from "./context/user"

import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.createRoot(document.getElementById("root")).render(
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <BrowserRouter>
            <UserProvider>
                <PurchasedProvider>
                    <CartProvider>
                        <App />
                    </CartProvider>
                </PurchasedProvider>
            </UserProvider>
        </BrowserRouter>
    </GoogleOAuthProvider>
)

