import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { logoutAction } from "../redux/features/user/userSlice";

const PrivateRoutes = () => {
  const user = useAppSelector((user) => user);
  let location = useLocation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user.jwt !== "") {
      const tokenExpireDate: any = jwtDecode(user.jwt)?.exp;
      if (tokenExpireDate * 1000 < Date.now().valueOf()) {
        dispatch(logoutAction());
      }
    }
  }, [location]);
  return user?.jwt !== "" ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
