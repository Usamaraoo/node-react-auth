import React from "react";
import axiosConfig from "../utils/axios";

export const GoogleLoginButton = () => {
  //   const googleClick = async () => {
  //     try {
  //       const res = await axiosConfig.get("/api/auth/login/federated/google");
  //       console.log("auth res", res);
  //     } catch (error) {
  //       console.log("err", error);
  //     }
  //   };
  const google = () => {
    window.open("http://localhost:5000/api/auth/google", "_self");
  };
  return (
    <>
      <div className="loginButton google" onClick={google}>
        Google
      </div>
      {/* <a href="http://localhost:5000/api/auth/login/federated/google">google</a> */}
      {/* <button onClick={googleClick} className="bg-red-400 px-5 py-3 rounded-md">
        Google
      </button> */}
    </>
  );
};
