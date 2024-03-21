import { FC } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { NotificationManager } from "react-notifications";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks/hooks";
import { registerUser } from "../redux/features/user/userSlice";
import { GoogleLoginButton } from "../component/GoogleLoginButton";
import { GithubLoginButton } from "../component/GithubLoginButton";

type Inputs = {
  name: string;
  email: string;
  password: string;
  password2: string;
};

const Register: FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<Inputs>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      await dispatch(registerUser(data)).unwrap();
      NotificationManager.success("User register");
      reset();
      navigate("/");
    } catch (error: any) {
      NotificationManager.error(error);
      console.log(error);
    }
  };

  return (
    <div className=" min-h-screen flex items-start justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full ">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Register
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="name" className="sr-only">
                Name
              </label>
              <input
                className="appearance-none rounded-none relative block w-full px-5 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder={"Name"}
                {...register("name", {
                  required: "Name is required",
                  maxLength: {
                    value: 15,
                    message: "Username should note be more than 15 words",
                  },
                })}
              />
              {errors.name && (
                <p className="text-red-500 py-">{errors.name.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                className="appearance-none rounded-none relative block w-full px-5 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder={"Email"}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                    message: "Email format is not correct",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-500 py-">{errors?.email?.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                className="appearance-none rounded-none relative block w-full px-5 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder={"password"}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 15,
                    message:
                      "Password length should be more than 15 charactors",
                  },
                })}
              />
              {errors.password && (
                <p className="text-red-500 py-">{errors?.password?.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="confirmPassword" className="sr-only">
                Confirm Password
              </label>
              <input
                className="appearance-none rounded-none relative block w-full px-5 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder={"Conform password"}
                {...register("password2", {
                  required: "Confirm Password is required",
                  validate: (val) =>
                    val === watch("password") || "Password doesn't match",
                })}
              />
              {errors.password2 && (
                <p className="text-red-500 py-">{errors?.password2?.message}</p>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Register
            </button>
          </div>
        </form>
        <div className="mt-3">
          <GoogleLoginButton text="Sign Up with Google" />
          <GithubLoginButton text="Sign up with Github" />
        </div>
        <Link
          className="text-indigo-600 underline tracking-widest block mt-2"
          to="/login"
        >
          Or login
        </Link>
      </div>
    </div>
  );
};

export default Register;
