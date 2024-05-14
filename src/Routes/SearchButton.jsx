import React, { useState } from "react";
import Loading from "../components/Loading";
import AllUsers from "../components/AllUsers";
import UserNotFound from "../components/UserNotFound";
import gitImage from "../assets/gitImage.jpg";
import Footer from "../components/Footer";

const SearchButton = () => {
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState();
  const [noUserFound, setNoUserFound] = useState(false);

  let handleChange = (event) => {
    setUser(event.target.value);
  };

  async function findUser() {
    setLoading(true);
    setNoUserFound(false); // Reset noUserFound state

    if (user !== "") {
      const res = await fetch(
        `https://api.github.com/search/users?q=${user}&client_id=${
          import.meta.env.VITE_REACT_APP_GITHUB_CLIENT_ID
        }&client_secret=${import.meta.env.VITE_REACT_APP_GITHUB_CLIENT_SECRET}`
      );
      const data = await res.json();

      if (data.items.length === 0) {
        setNoUserFound(true);
      } else {
        setUserData(data?.items);
      }
    } else {
      window.location.reload();
    }
    setUser("");
    setLoading(false);
  }

  return (
    <>
      <div>
        <div className="flex justify-center items-center h-11 my-5">
          <input
            type="text"
            placeholder="Search github username..."
            onChange={handleChange}
            className="h-full md:w-1/3 w-2/3 text-gray-800 px-2 font-semobold outline-none "
            onKeyDown={(event) => event.key === "Enter" && findUser()}
          />

          <button
            onClick={findUser}
            value={user}
            className="bg-teal-500 font-semibold px-4 h-full  "
          >
            Search
          </button>
        </div>

        {!userData && !loading && !noUserFound && (
          <div className="flex justify-center">
            <img
              src={gitImage}
              alt="Git Logo"
              className="my-5 max-w-full h-auto"
            />
          </div>
        )}

        {loading ? (
          <Loading />
        ) : noUserFound ? (
          <UserNotFound />
        ) : (
          <AllUsers userData={userData} />
        )}
      </div>
      <Footer />
    </>
  );
};

export default SearchButton;
