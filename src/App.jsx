import Logo from "./components/Logo";
import SearchButton from "./Routes/SearchButton";
import { Route, Routes } from "react-router-dom";
import Userinfo from "./Routes/Userinfo";

function App() {
  return (
    <>
      <div className="min-h-screen bg-black">
        <div className="container text-gray-200 py-3 ">
          <Logo />
          <Routes>
            <Route path="/" element={<SearchButton />}></Route>
            <Route path="/:name" element={<Userinfo />}></Route>
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
