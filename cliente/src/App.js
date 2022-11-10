import "./index.css"

import { Route, Routes } from "react-router-dom";

import Navbar from "./Components/Navbar/navbar";

import LoginPage from "./Components/LoginPage/loginPage.jsx";
import Register from "./Components/Register/register";
import ForgotPassword from "./Components/ForgotPassword/forgotPassword.jsx"
import Contact from "./Components/Contact/contact.jsx"

import Home from "./Components/Home/home.jsx"
import Profile from "./Components/Profile/profile.jsx"
import NewPassword from "./Components/NewPassword/newPassword";

import Dashboard from "./Components/AdminDashboard/dashboard.jsx"
import Backoffice from "./Components/AdminDashboard/Backoffice/backoffice.jsx"

import UserRoutes from "./routes/userRoutes";
import AdminRoute from "./routes/adminRoutes";

function App() {

  return (
    <>
      <Navbar />
         
      <Routes>
        <Route exact path="/" element={<Register />} />
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/contact" element={<Contact />} />
        <Route exact path="/forgot-password" element={<ForgotPassword />} />

        <Route element={<UserRoutes />}>
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/new-password" element={<NewPassword />} />
        </Route>

        <Route element={<AdminRoute />}>
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/backoffice" element={<Backoffice />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
