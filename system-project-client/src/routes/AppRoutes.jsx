import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Pets from "../pages/Pets";
import NotFound from "../pages/NotFound";
import MainLayout from "../layouts/MainLayout";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Wrap routes inside MainLayout */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/pets" element={<Pets />} />
      </Route>
      {/* 404 Page */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
