"use client";

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Import Router components

// Import your page components
import ProductDetailPage from "./products/_components/ProductDetailPage";

// Import your Header and Footer
import Header from "./_components/Header";
import Footer from "./_components/Footer";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route
              path="/products/:productId"
              element={<ProductDetailPage />}
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
