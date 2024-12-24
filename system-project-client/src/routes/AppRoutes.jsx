import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Pets from "../pages/Pets";
import Register from "../pages/Register";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import MainLayout from "../layouts/MainLayout"; // Import MainLayout

const AppRoutes = () => {
  return (
    <Routes>
      {/* Wrap routes inside MainLayout */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/pets" element={<Pets />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Route>
      {/* Public routes outside MainLayout */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
