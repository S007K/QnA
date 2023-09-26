import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./../components/Navbar";
import { Toaster } from "react-hot-toast";
const Layout = () => {
  return (
    <div>
      <Navbar />
      <div className="laptop:mx-56 mobile:mx-3 min-h-screen shrink-0 bottom-0 flex flex-col">
        <Toaster position="top-center" />
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
