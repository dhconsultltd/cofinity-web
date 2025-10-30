import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

interface LayouttProps {
  children: React.ReactNode;
  navbarTitle?: string;
  rightContent?: React.ReactNode;
}

const Layoutt: React.FC<LayouttProps> = ({
  children,
  navbarTitle,
  rightContent,
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen flex bg-gray-50 overflow-hidden">
      <div
        className={`fixed inset-y-0 left-0 z-40 transform bg-white transition-transform duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        lg:translate-x-0 lg:static lg:w-64`}
      >
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <Navbar
          setSidebarOpen={setSidebarOpen}
          title={navbarTitle}
          rightContent={rightContent}
        />

        <main className="flex-1 overflow-y-auto px-4 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layoutt;
