import { AxiosResponse } from "axios";

export interface UserRegisterApiFunction {
  (name: string, email: string, password: string): Promise<AxiosResponse<any>>;
}

export interface UserLoginApiFunc {
    ( email: string, password: string): Promise<AxiosResponse<any>>;
  }
