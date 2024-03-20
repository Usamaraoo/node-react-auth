import { useEffect } from "react";
import { useAppSelector } from "../hooks/hooks";
import { NotificationManager } from "react-notifications";
import axiosConfig from "../utils/axios";

export const Profile = () => {
  const { name, email, jwt, image } = useAppSelector((user) => user);
  const copyTokenToClipboard = () => {
    navigator.clipboard.writeText(jwt);
    NotificationManager.success("Token copied");
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await axiosConfig.get(`/api/user/info/${name}`);
        console.log("res", res);
      } catch (error: any) {
        console.log(error?.response.status);
      }
    })();
  }, []);
  return (
    <div className="max-w-md mx-auto mt-8 bg-white p-8 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4">Profile Information</h2>
      <div>
        <div className="">

        {image && <img className="rounded-full  my-4" src={image} alt={name} />}
        </div>
        <p className="text-lg">
          <span className="font-semibold">Name:</span> {name}
        </p>
        <p className="text-lg">
          <span className="font-semibold">Email:</span> {email}
        </p>
        <div className="flex items-center">
          <span className="text-lg font-semibold mr-2">Token:</span>
          <span
            onClick={copyTokenToClipboard}
            className="text-lg overflow-hidden overflow-ellipsis cursor-pointer"
            style={{ maxWidth: "200px" }} // Limit width to prevent overflow
            title={jwt} // Tooltip with full jwt on hover
          >
            {jwt}
          </span>
        </div>
      </div>
    </div>
  );
};
