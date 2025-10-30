import React from "react";
import { cn } from "../lib/utils";
import { useState } from "react";
import { useEffect } from "react";

import {
  Menu,
  X,
  LayoutDashboard,
  Users,
  CreditCard,
  PiggyBank,
  Coins,
  Receipt,
  Shield,
  FileText,
  Settings,
  Bell,
  Landmark,
  IdCard,
  Search,
  Download,
  Wallet,
  TrendingDown,
  Clock,
  AlertTriangle,
  UserCheck,
  BarChart3,
  Gift,
} from "lucide-react";

const Shares = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const menuItems = [
    { name: "Dashboard", icon: <LayoutDashboard size={18} /> },
    { name: "Members", icon: <Users size={18} /> },
    { name: "Loans", icon: <CreditCard size={18} /> },
    { name: "Savings", icon: <PiggyBank size={18} /> },
    { name: "Shares", icon: <Coins size={18} /> },
    { name: "Transactions", icon: <Receipt size={18} /> },
    { name: "KYC", icon: <Shield size={18} /> },
    { name: "Report", icon: <FileText size={18} /> },
    { name: "Users", icon: <Users size={18} /> },
    { name: "Settings", icon: <Settings size={18} /> },
  ];

  const members = [
    {
      name: "Crowther's Foundation",
      id: "1,123",
      product: "$30,000,000,000",
      kyc: "Active",
      activity: "21-06-2025",
    },
    {
      name: "Growth Fund 24",
      id: "56",
      product: "$24,000",
      kyc: "Inactive",
      activity: "21-06-2025",
    },
    {
      name: "Educational Savings Plan",
      id: "38",
      product: "$5,434,343",
      kyc: "Active",
      activity: "21-06-2025",
    },
    {
      name: "Retirement",
      id: "2,234",
      product: "$3,940,343",
      kyc: "Active",
      activity: "21-06-2025",
    },
    {
      name: "Legacy Fund 23",
      id: "903",
      product: "$23,000",
      kyc: "Inactive",
      activity: "21-06-2025",
    },
    {
      name: "Mason Funds",
      id: "86",
      product: "$4,000,000",
      kyc: "Active",
      activity: "21-06-2025",
    },
    {
      name: "Mideva Summit",
      id: "19",
      product: "$30,000,00",
      kyc: "Inactive",
      activity: "21-06-2025",
    },
    {
      name: "Etha Holdings",
      id: "30",
      product: "$4,443,489",
      kyc: "Active",
      activity: "21-06-2025",
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = members.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(members.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="h-screen bg-gray-100 flex flex-col lg:grid lg:grid-cols-[250px_1fr] overflow-hidden">
      {/* Mobile Navbar */}
      <div className="flex items-center justify-between bg-black text-white p-4 lg:hidden">
        <h1 className="text-lg font-bold">CoopName</h1>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-white focus:outline-none"
        >
          {sidebarOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`bg-black text-white w-64 p-6 flex flex-col justify-between fixed lg:static inset-y-0 left-0 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform duration-300 ease-in-out z-40`}
      >
        <div>
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
            <h1 className="text-xl font-bold">CoopName</h1>
          </div>

          <nav className="flex flex-col gap-2">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href="#"
                className="flex items-center gap-3 px-4 py-2 rounded-lg font-semibold text-gray-300 hover:bg-gray-800 hover:text-white transition"
              >
                {item.icon}
                {item.name}
              </a>
            ))}
          </nav>
        </div>

        <button className="mt-6 px-4 py-2 rounded-lg bg-gray-900 border border-gray-800 hover:bg-gray-800 transition font-semibold">
          Log out
        </button>
      </aside>

      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm md:hidden z-30"
        />
      )}

      {/* Main Content */}
      <main className="p-6 overflow-y-auto h-screen lg:h-auto">
        <div className=" flex items-center justify-between border-b-1 border-gray-200 pb-2">
          <h1 className="font-bold text-2xl text-black">Shares Management</h1>

          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <button className="gap-2 items-center flex bg-black rounded-lg py-2 px-4 hover:bg-gray-950 transition-colors cursor-pointer">
              <Download size={18} /> Export
            </button>
          </div>
        </div>

        <div className="md:flex  justify-between">
          <div className="flex flex-col-2 mt-4 gap-4">
            <div className="relative w-50 md:w-48 mt-4 md:mt-0">
              <select
                className="w-full appearance-none border border-gray-300 rounded-lg py-2 px-3 text-sm text-gray-700 focus:ring-1 focus:ring-gray-300 focus:outline-none"
                defaultValue=""
              >
                <option value="" disabled>
                  All Members
                </option>
                <option value="recent">Most Recent</option>
                <option value="name">Name (A–Z)</option>
                <option value="kyc">KYC Status</option>
                <option value="contribution">Highest Contribution</option>
              </select>

              <svg
                className="absolute right-3 top-3 w-4 h-4 text-gray-400 pointer-events-none"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
            <div className="relative w-50 md:w-48 mt-4 md:mt-0">
              <select
                className="w-full appearance-none border border-gray-300 rounded-lg py-2 px-3 text-sm text-gray-700 focus:ring-1 focus:ring-gray-300 focus:outline-none"
                defaultValue=""
              >
                <option value="" disabled>
                  All Types
                </option>
                <option value="recent">Most Recent</option>
                <option value="name">Name (A–Z)</option>
                <option value="kyc">KYC Status</option>
                <option value="contribution">Highest Contribution</option>
              </select>

              <svg
                className="absolute right-3 top-3 w-4 h-4 text-gray-400 pointer-events-none"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
          <div className="mt-4">
            <button className=" bg-black rounded-lg py-2 px-4 hover:bg-gray-900 transition-colors cursor-pointer">
              Add New Share Plan
            </button>
          </div>
        </div>

        {/* card */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          <div className="bg-white text-black p-4 rounded-xl shadow-sm hover:shadow-md flex flex-col justify-between h-36 hover:scale-105 transition-transform duration-300">
            <div>
              <Coins size={20} className="text-gray-700 mb-2" />
              <p className="text-sm text-gray-800">Total Share Value</p>
            </div>
            <div>
              <h1 className="text-2xl font-bold">$5,233</h1>
              <span className="text-green-500 text-xs font-medium">
                +11% This Month
              </span>
            </div>
          </div>

          <div className="bg-white text-black p-4 rounded-xl shadow-sm hover:shadow-md flex flex-col justify-between h-36 hover:scale-105 transition-transform duration-300">
            <div>
              <BarChart3 size={20} className="text-gray-700 mb-2" />
              <p className="text-sm text-gray-800">Active Share Plan</p>
            </div>
            <div>
              <h1 className="text-2xl font-bold">350</h1>
              <span className="text-green-500 text-xs font-medium">
                +5% This Month
              </span>
            </div>
          </div>

          <div className="bg-white text-black p-4 rounded-xl shadow-sm hover:shadow-md flex flex-col justify-between h-36 hover:scale-105 transition-transform duration-300">
            <div>
              <Clock size={20} className="text-gray-700 mb-2" />
              <p className="text-sm text-gray-800">Pending Withdrawals</p>
            </div>
            <div>
              <h1 className="text-2xl font-bold">$5,233</h1>
              <span className="text-green-500 text-xs font-medium">
                +15% This Month
              </span>
            </div>
          </div>
          <div className="bg-white text-black p-4 rounded-xl shadow-sm hover:shadow-md flex flex-col justify-between h-36 hover:scale-105 transition-transform duration-300">
            <div>
              <Gift size={20} className="text-gray-700 mb-2" />
              <p className="text-sm text-gray-800">Dividend Distributed</p>
            </div>
            <div>
              <h1 className="text-2xl font-bold">$5,233</h1>
              <span className="text-green-500 text-xs font-medium">
                +15% This Month
              </span>
            </div>
          </div>
        </div>

        <div className=" flex flex-col lg:grid lg:grid-cols-[1fr_300px] gap-6 ">
          <div>
            {/* search */}
            <div className=" md:flex gap-4 mt-8">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search members by name, ID, contact info"
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-1 focus:ring-gray-300 focus:outline-none text-sm text-black"
                />
                <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
              </div>
            </div>

            {/* table             */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 mt-8">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-blue-50">
                    <tr className="">
                      <th className="py-3 px-4 font-semibold text-sm text-black">
                        Share Plan
                      </th>
                      <th className="py-3 px-4 font-semibold text-sm text-black">
                        Member Count
                      </th>
                      <th className="py-3 px-4 font-semibold text-sm text-black">
                        Share Value
                      </th>
                      <th className="py-3 px-4 font-semibold text-sm text-black">
                        Status
                      </th>
                      <th className="py-3 px-4 font-semibold text-sm text-black">
                        Created Date
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {currentItems.map((member, index) => (
                      <tr key={index} className="border-b border-gray-200">
                        <td className="py-3 px-4 text-sm text-black">
                          {member.name}
                        </td>
                        <td className="py-3 px-4 text-sm text-black">
                          {member.id}
                        </td>

                        <td className="py-3 px-4 text-sm text-black">
                          {member.product}
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-1 text-xs font-semibold rounded-full ${
                              member.kyc === "Active"
                                ? "bg-green-500/20 text-green-700"
                                : "bg-yellow-500/20 text-yellow-700"
                            }`}
                          >
                            {member.kyc}
                          </span>
                        </td>

                        <td className="py-3 px-4 text-sm text-black">
                          {member.activity}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="flex items-center justify-between mt-4">
                  <p className="text-sm text-gray-500">
                    Showing {indexOfFirstItem + 1}–
                    {Math.min(indexOfLastItem, members.length)} of{" "}
                    {members.length} members
                  </p>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`px-3 py-1 rounded-lg border text-sm ${
                        currentPage === 1
                          ? "text-gray-400 border-gray-200"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      Prev
                    </button>

                    {[...Array(totalPages)].map((_, i) => (
                      <button
                        key={i}
                        onClick={() => handlePageChange(i + 1)}
                        className={`px-3 py-1 rounded-lg border text-sm ${
                          currentPage === i + 1
                            ? "bg-black text-white border-black"
                            : "text-gray-700 border-gray-200 hover:bg-gray-100"
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}

                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className={`px-3 py-1 rounded-lg border text-sm ${
                        currentPage === totalPages
                          ? "text-gray-400 border-gray-200"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 mt-8 text-black">
            <h2 className="text-lg font-bold mb-4">
              Performance Matrix (Shares)
            </h2>

            <div className="mb-6">
              <h4 className="text-sm font-semibold mb-2">
                Quarterly Share Growth
              </h4>
              <div className="w-full h-32 bg-gray-50 rounded-lg flex items-end p-2 gap-1">
                {[40, 55, 65, 80, 90, 75, 95].map((height, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-blue-500 rounded-t-lg"
                    style={{ height: `${height}%` }}
                  ></div>
                ))}
              </div>
              <p className="text-xs text-gray-500 text-right mt-1">
                Quarterly trend ↑
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <p className="text-sm font-semibold text-gray-700">
                  Dividend-to-Share Ratio
                </p>
                <p className="text-lg font-bold text-blue-600">5.1%</p>
                <p className="text-xs text-gray-500">
                  Healthy distribution rate
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-700">
                  Active-to-Total Ratio
                </p>
                <p className="text-lg font-bold text-green-600">82%</p>
                <p className="text-xs text-gray-500">Strong engagement</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Shares;
