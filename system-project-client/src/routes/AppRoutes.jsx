import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import MainLayout from "../layouts/MainLayout"; // Import MainLayout
import PetList from "../pages/PetList"; // New PetList Route
import AddPet from "../pages/AddPet"; // New AddPet Route
import AdoptionProcess from "../pages/AdoptionProcess";
import Success from "../pages/Success";
import Failure from "../pages/Failure";
import VolunteerRegister from "../pages/volunteer/VolunteerRegister";
import VolunteerLogin from "../pages/volunteer/VolunteerLogin";
import AdminLogin from "../pages/admin/AdminLogin";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../pages/admin/DashboardLayout";
import Volunteers from "../pages/admin/Volunteers";
import Pets from "../pages/admin/Pets";
import Requests from "../pages/admin/Requests";
import VolunteerPrivateRoute from "./VolunteerPrivateRoute";
import VolunteerDashboardLayout from "../pages/volunteer/VolunteerDashboardLayout";
import VolunteerProfile from "../pages/volunteer/VolunteerProfile";
import VolunteerTasks from "../pages/volunteer/VolunteerTasks";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes - MainLayout */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/pets" element={<PetList />} />
        <Route path="/add-pet" element={<AddPet />} />
        <Route path="/adopt/:id" element={<AdoptionProcess />} />
        <Route path="/success" element={<Success />} /> {/* Success Route */}
        <Route path="/failure" element={<Failure />} /> {/* Failure Route */}
        <Route path="/volunteer-register" element={<VolunteerRegister />} />
        <Route path="/volunteer-login" element={<VolunteerLogin />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Route>

      {/* Admin Login */}
      <Route path="/admin-login" element={<AdminLogin />} />

      {/* Protected Volunteer Dashboard */}
      <Route
        path="/volunteer"
        element={
          <VolunteerPrivateRoute>
            <VolunteerDashboardLayout />
          </VolunteerPrivateRoute>
        }
      >
        <Route path="profile" element={<VolunteerProfile />} />
        <Route path="tasks" element={<VolunteerTasks />} />
      </Route>

      {/* Admin Dashboard Routes - Protected by PrivateRoute */}
      <Route
        path="/admin"
        element={
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        }
      >
        <Route path="volunteers" element={<Volunteers />} />
        <Route path="pets" element={<Pets />} />
        <Route path="requests" element={<Requests />} />
      </Route>

      {/* Not Found Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
