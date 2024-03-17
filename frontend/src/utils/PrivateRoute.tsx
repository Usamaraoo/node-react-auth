import { Outlet, Navigate } from "react-router-dom";
import { useAppSelector } from "../hooks/hooks";

const PrivateRoutes = () => {
  let auth = { token: false };
  const user = useAppSelector((user) => user);

  return user?.jwt !== "" ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
