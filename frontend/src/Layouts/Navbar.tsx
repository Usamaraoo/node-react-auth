import { useAppSelector } from "../hooks/hooks";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutAction } from "../redux/features/user/userSlice";
import axiosConfig from "../utils/axios";
import { NotificationManager } from "react-notifications";

const Navbar = () => {
  const user = useAppSelector((user) => user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = () => {
    // Logic for login
    navigate("/");
  };

  const handleLogout =async () => {
    dispatch(logoutAction());
    if (user.loginMethod === "oauth") {
      const res = await axiosConfig.get('http://localhost:5000/api/auth/logout')
      console.log('logout',res.data);
    }
    NotificationManager.success("User logout");
  };
  const googlelogout = () => {};
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
              <>
                <Link
                  to="/profile"
                  className="text-white mr-4 hover:text-gray-300 hover:underline "
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 py-2 rounded-md shadow-md mr-4"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={handleLogin}
                className="bg-green-500 text-white px-4 py-2 rounded-md shadow-md mr-4"
              >
                Login
              </button>
            )}

            {/* <li className="listItem text-white" onClick={googlelogout}>
              Logout
            </li> */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
