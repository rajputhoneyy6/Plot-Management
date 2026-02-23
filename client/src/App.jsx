import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import PlotGrid from "./pages/PlotGrid";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Home from "./pages/Home";

import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Routes>
      {/* All routes wrapped in Layout */}
      <Route element={<Layout />}>
        {/* Home / Dashboard */}
        <Route index element={<Home />} />

        {/* Authentication */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        {/* Admin Protected Route */}
        <Route
          path="admin"
          element={
            <PrivateRoute>
              <AdminDashboard />
            </PrivateRoute>
          }
        />

        {/* About, Plot and Contact Pages */}
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/plot-availability" element={<PlotGrid />} />

        {/* Optional: catch-all 404 page */}
        <Route path="*" element={<h2 className="text-center mt-5">404 - Page Not Found</h2>} />
      </Route>
    </Routes>
  );
}

export default App;