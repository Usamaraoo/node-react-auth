import React, { useState } from "react";
import { useAppSelector } from "../hooks/hooks";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutAction } from "../redux/features/user/userSlice";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const user = useAppSelector((user) => user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = () => {
    // Logic for login
    navigate("/");
  };

  const handleLogout = () => {
    // Logic for logout
    dispatch(logoutAction());
    setIsLoggedIn(false);
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="text-white text-lg font-semibold">
              AuthApp
            </Link>
          </div>
          <div className="flex items-center">
            {user.jwt ? (
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-md shadow-md mr-4"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={handleLogin}
                className="bg-green-500 text-white px-4 py-2 rounded-md shadow-md mr-4"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
