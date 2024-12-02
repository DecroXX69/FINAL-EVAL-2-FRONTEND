import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthPage from './components/AuthPage';
import Home from './components/Home';
import { AuthProvider } from './context/AuthContext'; // Import the context
import ProductPage from './components/ProductPage';
import CheckoutPage from './components/CheckoutPage';
import { CartProvider } from './context/CartContext';
import PaymentPage from './components/PaymentPage';
import UserProfile from './components/UserProfile';
function App() {
  return (
    
    <AuthProvider>
    <CartProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<AuthPage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/product" element={<ProductPage />} />
            <Route path="/checkout" element={<CheckoutPage/>} />
            <Route path="/shared-cart/:cartId" element={<CheckoutPage />} />
            <Route path="/payment" element={<PaymentPage />} />
          </Routes>
        </div>
      </Router>
      </CartProvider>
    </AuthProvider>
    
  );
}

export default App;
