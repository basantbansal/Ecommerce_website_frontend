import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
// import { NavigationProvider } from './context/navigation'; using the react router now :) 
import { CartProvider } from './context/Cart';
import { BrowserRouter } from "react-router-dom";
import {PurchasedProvider} from './context/Purchased';

const el = document.getElementById('root');
const root = ReactDOM.createRoot(el);

root.render(
    <PurchasedProvider>
        <CartProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </CartProvider>
    </PurchasedProvider>
);