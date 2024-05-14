import React, { useState } from "react";
import { Link } from "react-router-dom";

const AllUsers = ({ userData }) => {
  // console.log(userData)
  return (
    <>
      <div className="flex gap-5 flex-wrap justify-center py-5">
        {userData &&
          userData.map((user, idx) => (
            <div
              key={idx}
              className="flex w-[200px] border border-gray-500 bg-gray-900 p-3 flex-col items-center "
            >
              <img
                src={user?.avatar_url}
                className="w-24 mb-4 border-4  border-teal-400 rounded-full "
              />

              <h1 className="text-xl overflow-hidden whitespace-nowrap overflow-ellipsis w-full text-center ">
                {" "}
                {user?.login}{" "}
              </h1>

              <Link to={`/${user?.login}`}>
                <span className="text-gray-200 bg-teal-600 my-3 font-semibold block py-1 px-4 tracking-wide rounded ">
                  View
                </span>
              </Link>
            </div>
          ))}
      </div>
    </>
  );
};

export default AllUsers;
