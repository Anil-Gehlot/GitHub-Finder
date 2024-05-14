import React from "react";
import notFound from "../assets/notFound.svg";

const UserNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center ">
      <img src={notFound}  className="w-2/5 h-1/2  " />
      <h2 className="text-2xl font-semibold">Oops! User Not Found</h2>
    </div>
  );
};

export default UserNotFound;

