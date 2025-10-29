import React from "react";
import { cn } from "../lib/utils";
import { useState } from "react";
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
  ArrowDownCircle,
  ArrowUpCircle,
  Wallet,
  ChevronDown,
  Loader,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const Adashboard = () => {
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
  const data = [
    { month: "Jan", savings: 3000, loans: 2000 },
    { month: "Feb", savings: 4000, loans: 2500 },
    { month: "Mar", savings: 4200, loans: 2700 },
    { month: "Apr", savings: 3800, loans: 3100 },
    { month: "May", savings: 4600, loans: 3400 },
    { month: "Jun", savings: 5200, loans: 3900 },
    { month: "Jul", savings: 5800, loans: 4200 },
    { month: "Aug", savings: 6000, loans: 4500 },
  ];

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
        <div className="flex items-center justify-between border-b-1 border-gray-200 pb-2">
          <h1 className="font-bold text-2xl text-black">Welcome, Admin</h1>

          <div className="flex items-center gap-4">
            <Bell
              size={20}
              className="text-gray-900 cursor-pointer hover:text-gray-600"
            />
            <img
              src="https://ui-avatars.com/api/?name=John+Doe&background=000000&color=ffffff"
              alt="User Avatar"
              className="w-8 h-8 rounded-full object-cover border border-gray-300 cursor-pointer"
            />
          </div>
        </div>
        <div className=" flex flex-col md:grid md:grid-cols-[1fr_250px] gap-6 p-4 md:p-6 bg-gray-50">
          <div>
            {/* card */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white text-black p-4 rounded-xl shadow-sm hover:shadow-md flex flex-col justify-between h-36 hover:scale-105 transition-transform duration-300">
                <div>
                  <Users size={20} className="text-gray-700 mb-2" />
                  <p className="text-sm text-gray-800">Total Members</p>
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
                  <Landmark size={20} className="text-gray-700 mb-2" />
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
                  <PiggyBank size={20} className="text-gray-700 mb-2" />
                  <p className="text-sm text-gray-800">Total Savings</p>
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
                  <IdCard size={20} className="text-gray-700 mb-2" />
                  <p className="text-sm text-gray-800">Pending KYC</p>
                </div>
                <div>
                  <h1 className="text-2xl font-bold">101</h1>
                  <span className="text-red-500 text-xs font-medium">
                    -3% This Month
                  </span>
                </div>
              </div>
            </div>

            {/* chart */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
              <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                  Savings &amp; Loan Trend (Monthly)
                </h3>
                <div className="h-64 mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        className="stroke-gray-200 dark:stroke-gray-700"
                      />
                      <XAxis
                        dataKey="month"
                        stroke="#9ca3af"
                        tick={{ fontSize: 12 }}
                      />
                      <YAxis stroke="#9ca3af" tick={{ fontSize: 12 }} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#1f2937",
                          borderRadius: "8px",
                          border: "none",
                        }}
                        labelStyle={{ color: "#fff" }}
                        itemStyle={{ color: "#13ecb6" }}
                      />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="savings"
                        stroke="#13ecb6"
                        strokeWidth={3}
                        dot={false}
                      />
                      <Line
                        type="monotone"
                        dataKey="loans"
                        stroke="#f59e0b"
                        strokeWidth={3}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                  Loan Repayment Status
                </h3>
                <div className="h-64 mt-4 flex items-center justify-center">
                  <div className="relative w-48 h-48">
                    <svg className="w-full h-full" viewBox="0 0 36 36">
                      <path
                        className="text-gray-200 dark:text-gray-700"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        strokeWidth="3"
                      ></path>
                      <path
                        className="text-primary"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831"
                        fill="none"
                        strokeDasharray="85, 100"
                        strokeLinecap="round"
                        strokeWidth="3"
                      ></path>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-3xl font-bold text-gray-900 dark:text-white">
                        85%
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Paid
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* card-2 */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
              <div className="bg-green-50 text-black p-4 rounded-xl shadow-sm hover:shadow-md flex flex-col justify-between h-36 hover:scale-105 transition-transform duration-300">
                <div>
                  <ArrowDownCircle size={20} className="text-gray-700 mb-2" />
                  <p className="text-sm text-gray-800">
                    Total Deposit (This Month)
                  </p>
                </div>
                <div>
                  <h1 className="text-2xl font-bold">$95,233</h1>
                  <span className="text-green-500 text-xs font-medium">
                    +12% This Month
                  </span>
                </div>
              </div>

              <div className="bg-red-50 text-black p-4 rounded-xl shadow-sm hover:shadow-md flex flex-col justify-between h-36 hover:scale-105 transition-transform duration-300">
                <div>
                  <ArrowUpCircle size={20} className="text-gray-700 mb-2" />
                  <p className="text-sm text-gray-800">
                    Total Withdrawal (This Month)
                  </p>
                </div>
                <div>
                  <h1 className="text-2xl font-bold">$4,350</h1>
                  <span className="text-green-500 text-xs font-medium">
                    +5% This Month
                  </span>
                </div>
              </div>

              <div className="bg-blue-50 text-black p-4 rounded-xl shadow-sm hover:shadow-md flex flex-col justify-between h-36 hover:scale-105 transition-transform duration-300">
                <div>
                  <Wallet size={20} className="text-gray-700 mb-2" />
                  <p className="text-sm text-gray-800">Net Balance</p>
                </div>
                <div>
                  <h1 className="text-2xl font-bold">$5,233</h1>
                  <span className="text-green-500 text-xs font-medium">
                    +15% This Month
                  </span>
                </div>
              </div>
            </div>

            {/* table             */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 mt-8">
              <h3 className="font-bold text-lg text-black mb-4">
                Recent Activities
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="py-3 px-4 font-semibold text-sm text-black">
                        Member Name
                      </th>
                      <th className="py-3 px-4 font-semibold text-sm text-black">
                        Activity Type
                      </th>
                      <th className="py-3 px-4 font-semibold text-sm text-black">
                        Date
                      </th>
                      <th className="py-3 px-4 font-semibold text-sm text-black">
                        Status
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr className="border-b border-gray-200">
                      <td className="py-3 px-4 text-sm text-black">
                        Sophia Clark
                      </td>
                      <td className="py-3 px-4 text-sm text-black">
                        Loan Application
                      </td>
                      <td className="py-3 px-4 text-sm text-black">
                        2024-07-15
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-500/20 text-yellow-700 ">
                          Pending
                        </span>
                      </td>
                    </tr>

                    <tr className="border-b border-gray-200 ">
                      <td className="py-3 px-4 text-sm text-black">
                        Ethan Carter
                      </td>
                      <td className="py-3 px-4 text-sm text-black">
                        Savings Deposit
                      </td>
                      <td className="py-3 px-4 text-sm text-black">
                        2024-07-14
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-500/20 text-green-700 ">
                          Completed
                        </span>
                      </td>
                    </tr>

                    <tr className="border-b border-gray-200 ">
                      <td className="py-3 px-4 text-sm text-black">
                        Olivia Bennett
                      </td>
                      <td className="py-3 px-4 text-sm text-black">
                        KYC Update
                      </td>
                      <td className="py-3 px-4 text-sm text-black">
                        2024-07-13
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-500/20 text-blue-700 ">
                          Approved
                        </span>
                      </td>
                    </tr>

                    <tr className="border-b border-gray-200 ">
                      <td className="py-3 px-4 text-sm text-black">
                        Liam Foster
                      </td>
                      <td className="py-3 px-4 text-sm text-black">
                        Share Purchase
                      </td>
                      <td className="py-3 px-4 text-sm text-black">
                        2024-07-12
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-500/20 text-green-700 ">
                          Completed
                        </span>
                      </td>
                    </tr>

                    <tr>
                      <td className="py-3 px-4 text-sm text-black">
                        Ava Hughes
                      </td>
                      <td className="py-3 px-4 text-sm text-black">
                        Loan Repayment
                      </td>
                      <td className="py-3 px-4 text-sm text-black">
                        2024-07-11
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-500/20 text-green-700 dark:text-green-400">
                          Completed
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* sideaction */}
          <div className="bg-white shadow-sm rounded-xl p-4 w-full  ">
            <h3 className="font-bold text-lg text-black mb-4">Quick Action</h3>
            <button className="bg-black rounded-md py-2 w-full cursor-pointer mt-4 hover:bg-gray-900">
              + Add New Member
            </button>
            <button className="bg-blue-100 text-blue-500 rounded-md w-full py-2 mt-4 cursor-pointer hover:bg-gray-900">
              Approve Loan
            </button>
            <button className="bg-blue-100 text-blue-500 rounded-md w-full py-2 mt-4 cursor-pointer hover:bg-gray-900">
              Generate Report
            </button>
            <div className="mt-8">
              <h3 className="font-bold text-lg text-black mb-4">
                Recent Notifications
              </h3>
              <div className="flex gap-4 mb-4">
                <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5 flex-shrink-0"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    New member application received
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    2024-07-15
                  </p>
                </div>
              </div>
              <div className="flex gap-4 mb-4">
                <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5 flex-shrink-0"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Loan Repayment due for LN/001
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    2024-07-15
                  </p>
                </div>
              </div>
              <div className="flex gap-4 mb-4">
                <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5 flex-shrink-0"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    KYC approved for Michael Scoffield
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    2024-07-15
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Adashboard;
