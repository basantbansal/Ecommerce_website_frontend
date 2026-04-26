// App.js
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import ItemDetails from "./pages/ItemDetails";
import NavigationHeader from "./components/NavigationHeader";
import PurchasedPage from './pages/PurchasedPage';
//import ShowMe from './pages/ShowMe';
//import SplinePage from "./pages/SplinePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage"
import SellerPage from "./pages/SellerPage"
// import Portfolio from "./pages/Portfolio";

function App() {
  return (
    <>
      <NavigationHeader />

      <Routes>
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/product/:id" element={<ItemDetails />} />
        <Route path="/Purchased" element={<PurchasedPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/seller" element={<SellerPage />} />
        {/* <Route path="/ShowMe" element={<ShowMe />} /> */}
      </Routes>
    </>
  );
}

export default App;
