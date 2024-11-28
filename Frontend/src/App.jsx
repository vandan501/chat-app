import React, { useEffect } from "react";
import Navbar from "./components/Navbar.jsx";
import "./custom.css";
import { Toaster, toast } from "react-hot-toast";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SettingsPage from "./pages/SettingsPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import { useAuthStore } from "./store/useAuthStore.js";
import { Loader } from "lucide-react";
function App() {
  const { authUser, checkAuth, isCheckingAuth, isUpdatingProfile } =
    useAuthStore();

  useEffect(() => {
    toast.success("App loaded successfully!");
    checkAuth();
  }, [checkAuth, isUpdatingProfile]);
  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-14 animate-spin" />
      </div>
    );
  return (
    <div>
      <Navbar />
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to="/login" />}
        ></Route>
        <Route
          path="/signup"
          element={!authUser ? <SignUpPage /> : <Navigate to="/" />}
        ></Route>
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to="/" />}
        ></Route>
        <Route path="/settings" element={<SettingsPage />}></Route>
        <Route
          path="/profile"
          element={authUser ? <ProfilePage /> : <Navigate to="/login" />}
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
