import { Outlet, Navigate } from "react-router-dom";
import { useAppSelector } from "../hooks/hooks";

const PublicRoute = () => {
  let auth = { token: false };
  const user = useAppSelector((user) => user);

  return user?.jwt !== "" ? <Navigate to="/" /> : <Outlet />;
};

export default PublicRoute;
