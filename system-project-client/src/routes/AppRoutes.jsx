import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Pets from "../pages/Pets";
import Register from "../pages/Register";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import MainLayout from "../layouts/MainLayout"; // Import MainLayout
import PetList from "../pages/PetList"; // New PetList Route
import AddPet from "../pages/AddPet";   // New AddPet Route
import AdoptionProcess from "../pages/AdoptionProcess";
import Success from "../pages/Success";
import Failure from "../pages/Failure";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Wrap routes inside MainLayout */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/pets" element={<PetList />} />
        <Route path="/add-pet" element={<AddPet />} />
        <Route path="/adopt/:id" element={<AdoptionProcess />} />
        <Route path="/success" element={<Success />} /> {/* Success Route */}
        <Route path="/failure" element={<Failure />} /> {/* Failure Route */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Route>
      {/* Public routes outside MainLayout */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
