import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Tabs from "../components/Tabs";
import Repo from "../components/Repo";
import Loading from "../components/Loading";
import Followers from "../components/Followers";
import Footer from "../components/Footer";

const Userinfo = () => {
  const [user, setUser] = useState([]);
  const [type, setType] = useState("repos");
  const [loading, setLoading] = useState(null);
  const [infos, setInfos] = useState([]);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  let BaseUrl = "https://api.github.com/users";

  async function GetUserInfo() {
    setLoading(true);
    const res = await fetch(BaseUrl + pathname);
    const data = await res.json();

    setUser(() => [data]);
    setLoading(null);
  }

  async function GetUrls() {
    setLoading(true);

    const res = await fetch(BaseUrl + pathname + `/${type}`);
    const data = await res.json();
    setInfos(data);
    setLoading(null);
  }

  useEffect(() => {
    GetUserInfo();
    GetUrls();
  }, [pathname, type]);
  return (
    <div className="py-5">
      <button
        onClick={() => window.history.back()}
        className="px-5 py-1 font-medium mx-1 my-4 bg-teal-600 rounded text-gray-200"
      >
        Back
      </button>

      {user &&
        user?.map((uinfo, i) => (
          <div
            key={i}
            className="flex justify-center md:flex-row md:px-0 px-4 flex-col gap-10"
          >
            <img
              src={uinfo.avatar_url}
              className="w-[350px] border-4 border-teal-400 md:mx-0 mx-auto"
            />

            <div className="text-lg px-3 leading-10">
              <h1 className="text-3xl pb-4"> {uinfo?.name} </h1>
              <h1>
                <span className="text-teal-400 ">username </span>:{""}{" "}
                {uinfo?.login}
              </h1>

              <h1>
                <span className="text-teal-400 ">followers </span>:{""}{" "}
                {uinfo?.followers}
              </h1>

              <h1>
                <span className="text-teal-400 ">following </span>:{""}{" "}
                {uinfo?.following}
              </h1>

              <h1>
                <span className="text-teal-400 ">public repositories </span>:
                {""} {uinfo?.public_repos}
              </h1>

              {uinfo?.location && (
                <h1>
                  <span className="text-teal-400 ">location </span>:{""}{" "}
                  {uinfo?.location}
                </h1>
              )}

              {uinfo?.bio && (
                <h1>
                  <span className="text-teal-400 ">bio </span>:{""} {uinfo?.bio}
                </h1>
              )}

              <h1>
                <span className="text-teal-400 ">Joined on </span>:{""}{" "}
                {new Date(uinfo?.created_at).toLocaleDateString()}
              </h1>

              <a
                href={uinfo?.html_url}
                target="_blank"
                className="text-gray-200 font-semibold rounded cursor-pointer px-4 py-1 bg-teal-600 my-3 tracking-wide"
              >
                Visit
              </a>
            </div>
          </div>
        ))}

      <div className="flex border-b pb-4 gap-6 mt-[10%] mb-6 justify-center md:text-xl">
        <Tabs type={type} setType={setType} />
      </div>

      {loading && <Loading />}

      {type === "repos" && (
        <div className="grid md:grid-cols-2 grid-cols-1 gap-7 w-10/12 mx-auto ">
          {infos && <Repo repos={infos} />}
        </div>
      )}

      {type === "followers" && (
        <div>
          <Followers userData={infos} />
        </div>
      )}

      <h2 className="flex  items-center justify-center text-xl font-semibold mt-11">
        For more information, please visit the profile...
      </h2>

      <Footer />
    </div>
  );
};

export default Userinfo;
