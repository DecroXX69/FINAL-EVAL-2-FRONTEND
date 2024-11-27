import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthPage from './components/AuthPage';
import Home from './components/Home';
import { AuthProvider } from './context/AuthContext'; // Import the context
import ProductPage from './components/ProductPage';
function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<AuthPage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/product" element={<ProductPage />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
