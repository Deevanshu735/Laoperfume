import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "/src/components/Navbar.jsx";
import Footer from "/src/components/Footer.jsx";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {/* The <Outlet> component from react-router-dom renders the current page */}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
