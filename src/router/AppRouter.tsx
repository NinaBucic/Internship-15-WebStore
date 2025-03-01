import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "../components/Layout";

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
