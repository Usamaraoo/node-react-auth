import React, { FC, useEffect } from "react";
import "./App.css";
import "react-notifications/lib/notifications.css";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { NotificationContainer } from "react-notifications";
import PrivateRoutes from "./utils/PrivateRoute";
import Navbar from "./Layouts/Navbar";
import PublicRoute from "./utils/PublicRoute";
import { Profile } from "./pages/Profile";
import { jwtDecode } from "jwt-decode";
import { useAppDispatch } from "./hooks/hooks";
import { googleLogin, userInterface } from "./redux/features/user/userSlice";

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}
const App: FC = () => {
  let query = useQuery();
  const dispatch = useAppDispatch();

  // on google auth checking jwt and login user
  useEffect(() => {
    const token: any = query.get("token");
    if (token) {
      const user: userInterface = jwtDecode(token);
      console.log('user',user);
      
      dispatch(
        googleLogin({ name: user?.name, email: user?.email,image:user.image, jwt: token,loginMethod:user.loginMethod })
      );
    }
  }, []);
  return (
    <div>
      <NotificationContainer />
      <Navbar />
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
