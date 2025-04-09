import Navbar from "@/components/Navbar";
import React from "react";
import { Outlet, useLocation } from "react-router-dom";

const MainLayout = () => {
  const location = useLocation();

  const hideNavbarRoutes = ["/", "/teacher-registration"];

  return (
    <div className="flex flex-col min-h-screen">
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}
      <div
        className={`flex-1 ${
          !hideNavbarRoutes.includes(location.pathname) ? "mt-16" : ""
        }`}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
