import axiosConfig from "../utils/axios";
import { UserLoginApiFunc, UserRegisterApiFunction } from "./types";

export const UserRegisterApi: UserRegisterApiFunction = async (
  name,
  email,
  password
) => {
  const res = await axiosConfig.post("/api/auth/register", {
    name,
    email,
    password,
  });
  return res;
};

export const UserLoginApi: UserLoginApiFunc = async (email, password) => {
  const res = await axiosConfig.post("/api/auth/login", { email, password });
  return res;
};
