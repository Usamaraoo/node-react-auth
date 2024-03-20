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
      <div className="px-6 sm:px-0 max-w-full">
        <button
          onClick={google}
          type="button"
          className="text-white w-full  bg-[#f46042] hover:bg-[#d04d33]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-between mr-2 mb-2"
        >
          <svg
            className="mr-2 -ml-1 w-4 h-4"
            aria-hidden="true"
            focusable="false"
            data-prefix="fab"
            data-icon="google"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 488 512"
          >
            <path
              fill="currentColor"
              d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
            ></path>
          </svg>
          Sign In with Google<div></div>
        </button>
      </div>
      {/* <a href="http://localhost:5000/api/auth/login/federated/google">google</a> */}
      {/* <button onClick={googleClick} className="bg-red-400 px-5 py-3 rounded-md">
        Google
      </button> */}
    </>
  );
};
