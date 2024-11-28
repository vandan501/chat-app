import React from "react";
import { useAuthStore } from "../store/useAuthStore.js";
import logo from "../media/my-logo.svg";
import { Link } from "react-router-dom";
function Navbar() {
  const { authUser, logout, isLoggedIn } = useAuthStore();
  return (
    <div className="w-full">
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <img src={logo} />
            </div>
          </div>
          <a className="btn btn-ghost text-xl">
            {" "}
            <img src={logo} className="w-[100%] h-[100%]" />
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu flex flex-row gap-3 px-1">
            {authUser && (
              <li>
                <Link to="/">Home</Link>
              </li>
            )}
            {authUser && (
              <li>
                <Link to="/profile">Profile</Link>
              </li>
            )}
            <li>
              <Link to="/settings">Settings</Link>
            </li>
            {!authUser && (
              <li>
                <Link to="/login">Login</Link>
              </li>
            )}
            {!authUser && (
              <li>
                <Link to="/signup">SignUp</Link>
              </li>
            )}
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </div>
        {authUser && (
          <div className="navbar-end">
            <a className="btn hover:bg-none" onClick={logout}>
              Logout
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
