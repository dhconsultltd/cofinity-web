import React from "react";
import { useLocation, Link, useNavigate, matchPath } from "react-router-dom";

import {
  Home,
  Users,
  DollarSign,
  FileText,
  Settings,
  PiggyBank,
  Coins,
  Receipt,
  Shield,
  LogOut,
} from "lucide-react";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    {
      name: "Dashboard",
      icon: <Home size={18} />,
      href: "/dashboard",
      paths: ["/dashboard"],
    },
    {
      name: "Branches",
      icon: <Home size={18} />,
      href: "/branches",
      paths: ["/branches"],
    },
    {
      name: "Members",
      icon: <Users size={18} />,
      href: "/members",
      paths: ["/members", "/add-member", "/members/:id"],
    },
    {
      name: "Loans",
      icon: <DollarSign size={18} />,
      href: "/loans",
      paths: ["/loans", "/loans/create", "/loans/:id", "/loan-products"],
    },
    {
      name: "Savings",
      icon: <PiggyBank size={18} />,
      href: "/savings",
      paths: ["/savings", "/savings-products", "/savings/accounts/:id"],
    },
    {
      name: "Shares",
      icon: <Coins size={18} />,
      href: "/shares",
      paths: ["/shares", "/shares-plan"],
    },
    {
      name: "Dividends",
      icon: <Coins size={18} />,
      href: "/dividends",
      paths: ["/dividends"],
    },
    {
      name: "Upcoming Payments",
      icon: <DollarSign size={18} />,
      href: "/upcoming-payments",
      paths: ["/upcoming-payments"],
    },
    {
      name: "Loan Repayment",
      icon: <DollarSign size={18} />,
      href: "/loan-repayments",
      paths: ["/loan-repayments"],
    },
    {
      name: "Transactions",
      icon: <Receipt size={18} />,
      href: "/transactions",
      paths: ["/transactions"],
    },
    {
      name: "Expenses",
      icon: <Shield size={18} />,
      href: "/expenses",
      paths: ["/expenses"],
    },
    {
      name: "Report",
      icon: <FileText size={18} />,
      href: "/report",
      paths: ["/report"],
    },
    {
      name: "Users",
      icon: <Users size={18} />,
      href: "/user",
      paths: ["/user"],
    },
    {
      name: "Settings",
      icon: <Settings size={18} />,
      href: "/settings",
      paths: ["/settings"],
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login", { replace: true });
  };

  return (
    <>
      <aside
        className={`bg-black text-white w-64 p-6 fixed inset-y-0 left-0 z-40
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:static lg:h-screen flex flex-col`}
      >
        {/* Top section */}
        <div className="flex flex-col flex-1 min-h-0">
          {/* Logo */}
          <div className="hidden lg:flex items-center gap-3 mb-8">
            <svg
              className="w-8 h-8 text-primary"
              fill="none"
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M39.5563 34.1455V13.8546C39.5563 15.708 36.8773 17.3437 32.7927 18.3189C30.2914 18.916 27.263 19.2655 24 19.2655C20.737 19.2655 17.7086 18.916 15.2073 18.3189C11.1227 17.3437 8.44365 15.708 8.44365 13.8546V34.1455C8.44365 35.9988 11.1227 37.6346 15.2073 38.6098C17.7086 39.2069 20.737 39.5564 24 39.5564C27.263 39.5564 30.2914 39.2069 32.7927 38.6098C36.8773 37.6346 39.5563 35.9988 39.5563 34.1455Z"
                fill="currentColor"
              />
            </svg>
            <h1 className="text-xl font-bold">Cofinity</h1>
          </div>

          {/* Scrollable menu */}
          <nav className="flex-1 overflow-y-auto min-h-0 flex flex-col gap-2 pr-1 no-scrollbar">
            {menuItems.map((item) => {
              const isActive = item.paths.some((path) =>
                matchPath({ path, end: false }, location.pathname)
              );

              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-2 rounded-lg font-semibold transition
          ${
            isActive
              ? "bg-gray-800 text-gray-50"
              : "text-gray-400 hover:bg-gray-800 hover:text-white"
          }`}
                >
                  <span className={isActive ? "text-gray-50" : "text-gray-500"}>
                    {item.icon}
                  </span>
                  <span className="truncate">{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="mt-6 px-4 py-2 rounded-lg bg-gray-900 border border-gray-800 hover:bg-gray-800 transition font-semibold flex items-center justify-center gap-2"
        >
          <LogOut size={16} />
          Log out
        </button>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm md:hidden z-30"
        />
      )}
    </>
  );
};

export default Sidebar;
