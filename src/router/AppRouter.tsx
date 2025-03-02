import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "../components/Layout";
import ProductsPage from "../pages/ProductsPage/ProductsPage.tsx";
import AddProductPage from "../pages/AddProductPage/AddProductPage.tsx";
import ProductPage from "../pages/ProductPage/ProductPage.tsx";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage.tsx";

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<ProductsPage />} />
          <Route path="/add-product" element={<AddProductPage />} />
          <Route path="product/:productId" element={<ProductPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
