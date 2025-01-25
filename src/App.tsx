import { Routes, Route, Outlet, useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { ThemeSwitch } from "./components/theme-switch";
import axios from "axios";
import { navigation } from "./lib/navs";
import RequireAuth from "./components/RequireAuth";
import logo from "./img/icon.svg";
import React from "react";
import { fetchUserData } from "./services/fetchUserData";
import Errorelement from "./components/Errorelement";

function Iconelement() {
  return (
    <>
      <div className="h-screen">
        <div className="flex items-center gap-4 box-border p-6 pb-0 lg:p-4 lg:justify-start justify-center">
          <img src={logo} alt="logo" className="h-8 w-8" />
          <h1 className="text-[24px] font-semibold">HD</h1>
        </div>
        <Outlet />
      </div>
    </>
  );
}

function App() {
  axios.defaults.baseURL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  React.useEffect(() => {
    fetchUserData(navigate);
    console.log("token", localStorage.getItem("token"));
  }, [localStorage.getItem("token")]);
  return (
    <>
      <ThemeSwitch />
      <Routes>
        <Route element={<RequireAuth />}>
          {navigation
            .filter((ele) => ele.protected)
            .map((ele, i) => (
              <Route key={i} element={ele.element} path={ele.path} />
            ))}
        </Route>
        <Route path="/" element={<Iconelement />}>
          {navigation
            .filter((items) => !items.protected)
            .map((items) => (
              <Route
                key={items.path}
                path={items.path}
                element={items.element}
                errorElement={items.errorElement}
              />
            ))}
        </Route>
        {/* 404 route */}
        <Route path="*" element={<Errorelement />} />
      </Routes>
      <Toaster position="top-center" />
    </>
  );
}

export default App;
