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
} from "lucide-react";

const Loans = () => {
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
    { name: "Settings", icon: <Settings size={18} /> },
  ];
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 4; // Number of rows per page

  // Dummy loan data (replace with your API data later)
  const loans = [
    {
      name: "Abdul Saakar",
      email: "abdul003@gmail.com",
      id: "LN-002",
      type: "Personal",
      amount: "$5,059",
      duration: "25 Months",
      status: "Verified",
      startDate: "21-3-2025",
      endDate: "25-8-2025",
    },
    {
      name: "Amina Bello",
      email: "amina@gmail.com",
      id: "LN-003",
      type: "Business",
      amount: "$8,700",
      duration: "18 Months",
      status: "Pending",
      startDate: "01-2-2025",
      endDate: "01-8-2026",
    },
    {
      name: "Amina Bello",
      email: "amina@gmail.com",
      id: "LN-003",
      type: "Business",
      amount: "$8,700",
      duration: "18 Months",
      status: "Pending",
      startDate: "01-2-2025",
      endDate: "01-8-2026",
    },
    {
      name: "Amina Bello",
      email: "amina@gmail.com",
      id: "LN-003",
      type: "Business",
      amount: "$8,700",
      duration: "18 Months",
      status: "Pending",
      startDate: "01-2-2025",
      endDate: "01-8-2026",
    },
    {
      name: "Abdul Saakar",
      email: "abdul003@gmail.com",
      id: "LN-002",
      type: "Personal",
      amount: "$5,059",
      duration: "25 Months",
      status: "Verified",
      startDate: "21-3-2025",
      endDate: "25-8-2025",
    },
    {
      name: "Abdul Saakar",
      email: "abdul003@gmail.com",
      id: "LN-002",
      type: "Personal",
      amount: "$5,059",
      duration: "25 Months",
      status: "Verified",
      startDate: "21-3-2025",
      endDate: "25-8-2025",
    },
  ];

  const totalPages = Math.ceil(loans.length / rowsPerPage);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentLoans = loans.slice(indexOfFirstRow, indexOfLastRow);

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
          Manage Sub Admin
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
        <div className="md:flex  items-center justify-between border-b-1 border-gray-200 pb-2">
          <h1 className="font-bold text-2xl text-black">Loans Management</h1>

          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <button className="gap-2 items-center flex bg-black rounded-lg py-2 px-4 hover:bg-gray-900 transition-colors cursor-pointer">
              <Download size={18} />
              Export Report
            </button>
            <button className="flex items-center border-2 border-black py-2 px-4 rounded-lg gap-2 text-black cursor-pointer hover:border-gray-900 transition-colors">
              {" "}
              <Settings size={18} />
              Settings
            </button>
          </div>
        </div>

        {/* card */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          <div className="bg-white text-black p-4 rounded-xl shadow-sm hover:shadow-md flex flex-col justify-between h-36 hover:scale-105 transition-transform duration-300">
            <div>
              <Wallet size={20} className="text-gray-700 mb-2" />
              <p className="text-sm text-gray-800">Total Loan Issued</p>
            </div>
            <div>
              <h1 className="text-2xl font-bold">5,233</h1>
              <span className="text-green-500 text-xs font-medium">
                +11% This Month
              </span>
            </div>
          </div>

          <div className="bg-white text-black p-4 rounded-xl shadow-sm hover:shadow-md flex flex-col justify-between h-36 hover:scale-105 transition-transform duration-300">
            <div>
              <TrendingDown size={20} className="text-gray-700 mb-2" />
              <p className="text-sm text-gray-800">Active Loans</p>
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
              <p className="text-sm text-gray-800">Pending Approvals</p>
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
              <AlertTriangle size={20} className="text-gray-700 mb-2" />
              <p className="text-sm text-gray-800">Overdue Loans</p>
            </div>
            <div>
              <h1 className="text-2xl font-bold">101</h1>
              <span className="text-red-500 text-xs font-medium">
                -3% This Month
              </span>
            </div>
          </div>
        </div>

        {/* search */}
        <div className="mt-8 md:flex gap-4 ">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search members by name, ID, contact info"
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-1 focus:ring-gray-300 focus:outline-none text-sm text-black"
            />
            <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
          </div>

          <div className="relative w-50 md:w-48 mt-4 md:mt-0">
            <select
              className="w-full appearance-none border border-gray-300 rounded-lg py-2 px-3 text-sm text-gray-700 focus:ring-1 focus:ring-gray-300 focus:outline-none"
              defaultValue=""
            >
              <option value="" disabled>
                Sort by
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

          <div className="w-full flex mt-4 md:mt-0  md:justify-end">
            <button className="bg-black px-4 py-2 rounded-lg hover:bg-gray-900">
              New Loan Application
            </button>
          </div>
        </div>

        {/* table             */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 mt-8">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-blue-50">
                <tr className="">
                  <th className="py-3 px-4 font-semibold text-sm text-black">
                    Member
                  </th>
                  <th className="py-3 px-4 font-semibold text-sm text-black">
                    Loan ID
                  </th>
                  <th className="py-3 px-4 font-semibold text-sm text-black">
                    Type
                  </th>
                  <th className="py-3 px-4 font-semibold text-sm text-black">
                    Amount
                  </th>
                  <th className="py-3 px-4 font-semibold text-sm text-black">
                    Duration
                  </th>
                  <th className="py-3 px-4 font-semibold text-sm text-black">
                    Status
                  </th>
                  <th className="py-3 px-4 font-semibold text-sm text-black">
                    Disbursed Date
                  </th>
                  <th className="py-3 px-4 font-semibold text-sm text-black">
                    Next Payment
                  </th>
                  <th className="py-3 px-4 font-semibold text-sm text-black">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {currentLoans.map((loan, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-200 text-black"
                  >
                    <td className="flex items-center gap-2 py-3 px-4">
                      <img
                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                          loan.name
                        )}&background=000000&color=ffffff`}
                        alt={loan.name}
                        className="w-8 h-8 rounded-full"
                      />
                      <div>
                        <p className="font-bold">{loan.name}</p>
                        <span className="text-gray-500 text-sm">
                          {loan.email}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm">{loan.id}</td>
                    <td className="py-3 px-4 text-sm">{loan.type}</td>
                    <td className="py-3 px-4 text-sm">{loan.amount}</td>
                    <td className="py-3 px-4 text-sm">{loan.duration}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          loan.status === "Verified"
                            ? "bg-green-500/20 text-green-700"
                            : "bg-yellow-500/20 text-yellow-700"
                        }`}
                      >
                        {loan.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm">{loan.startDate}</td>
                    <td className="py-3 px-4 text-sm">{loan.endDate}</td>
                    <td className="py-3 px-4 text-sm text-blue-500">
                      <a href="#">View</a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex justify-between items-center mt-4">
              <p className="text-sm text-gray-500">
                Showing {indexOfFirstRow + 1}–
                {Math.min(indexOfLastRow, loans.length)} of {loans.length} loans
              </p>

              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className={`px-3 py-1 border rounded-lg text-sm ${
                    currentPage === 1
                      ? "text-gray-400 cursor-not-allowed border-gray-200"
                      : "text-black border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  Prev
                </button>

                <span className="text-sm text-gray-600">
                  Page {currentPage} of {totalPages}
                </span>

                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className={`px-3 py-1 border rounded-lg text-sm ${
                    currentPage === totalPages
                      ? "text-gray-400 cursor-not-allowed border-gray-200"
                      : "text-black border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Loans;
