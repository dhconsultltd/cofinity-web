import React from "react";
import { Users, PiggyBank, Bell, Landmark, IdCard } from "lucide-react";
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

const Dashboard = () => {
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
    <div className="p-4 overflow-y-auto h-screen lg:h-auto bg-gray-50">
      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            icon: <Users size={20} className="text-gray-700 mb-2" />,
            label: "Total Members",
            value: "5,233",
            change: "+11% This Month",
            color: "text-green-500",
          },
          {
            icon: <Landmark size={20} className="text-gray-700 mb-2" />,
            label: "Active Loans",
            value: "350",
            change: "+5% This Month",
            color: "text-green-500",
          },
          {
            icon: <PiggyBank size={20} className="text-gray-700 mb-2" />,
            label: "Total Savings",
            value: "$5,233",
            change: "+15% This Month",
            color: "text-green-500",
          },
          {
            icon: <IdCard size={20} className="text-gray-700 mb-2" />,
            label: "Pending KYC",
            value: "101",
            change: "-3% This Month",
            color: "text-red-500",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-white text-black p-4 rounded-xl shadow-sm hover:shadow-md flex flex-col justify-between h-36 hover:scale-105 transition-transform duration-300"
          >
            <div>
              {item.icon}
              <p className="text-sm text-gray-800">{item.label}</p>
            </div>
            <div>
              <h1 className="text-2xl font-bold">{item.value}</h1>
              <span className={`${item.color} text-xs font-medium`}>
                {item.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
          <h3 className="font-bold text-lg text-white">
            Savings & Loan Trend (Monthly)
          </h3>
          <div className="h-64 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
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

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h3 className="font-bold text-lg text-gray-900">
            Loan Repayment Status
          </h3>
          <div className="h-64 mt-4 flex items-center justify-center">
            <div className="relative w-48 h-48">
              <svg className="w-full h-full" viewBox="0 0 36 36">
                <path
                  className="text-gray-200"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  strokeWidth="3"
                ></path>
                <path
                  className="text-green-500"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831"
                  fill="none"
                  strokeDasharray="85, 100"
                  strokeLinecap="round"
                  strokeWidth="3"
                ></path>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-gray-900">85%</span>
                <span className="text-sm text-gray-500">Paid</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6 mt-8">
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h3 className="font-bold text-lg text-black mb-4">
            Recent Activities
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-3 px-4 text-sm font-semibold text-black">
                    Member Name
                  </th>
                  <th className="py-3 px-4 text-sm font-semibold text-black">
                    Activity Type
                  </th>
                  <th className="py-3 px-4 text-sm font-semibold text-black">
                    Date
                  </th>
                  <th className="py-3 px-4 text-sm font-semibold text-black">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody>
                {[
                  {
                    name: "Sophia Clark",
                    activity: "Loan Application",
                    date: "2024-07-15",
                    status: "Pending",
                    color: "bg-yellow-500/20 text-yellow-700",
                  },
                  {
                    name: "Ethan Carter",
                    activity: "Savings Deposit",
                    date: "2024-07-14",
                    status: "Completed",
                    color: "bg-green-500/20 text-green-700",
                  },
                  {
                    name: "Olivia Bennett",
                    activity: "KYC Update",
                    date: "2024-07-13",
                    status: "Approved",
                    color: "bg-blue-500/20 text-blue-700",
                  },
                  {
                    name: "Liam Foster",
                    activity: "Share Purchase",
                    date: "2024-07-12",
                    status: "Completed",
                    color: "bg-green-500/20 text-green-700",
                  },
                  {
                    name: "Ava Hughes",
                    activity: "Loan Repayment",
                    date: "2024-07-11",
                    status: "Completed",
                    color: "bg-green-500/20 text-green-700",
                  },
                ].map((row, i) => (
                  <tr key={i} className="border-b border-gray-200">
                    <td className="py-3 px-4 text-sm text-black">{row.name}</td>
                    <td className="py-3 px-4 text-sm text-black">
                      {row.activity}
                    </td>
                    <td className="py-3 px-4 text-sm text-black">{row.date}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${row.color}`}
                      >
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white shadow-sm rounded-xl p-4">
          <h3 className="font-bold text-lg text-black mb-4">Quick Action</h3>
          <button className="bg-black text-white rounded-md py-2 w-full cursor-pointer mt-4 hover:bg-gray-900">
            + Add New Member
          </button>
          <button className="bg-blue-100 text-blue-500 rounded-md w-full py-2 mt-4 cursor-pointer hover:bg-gray-200">
            Approve Loan
          </button>
          <button className="bg-blue-100 text-blue-500 rounded-md w-full py-2 mt-4 cursor-pointer hover:bg-gray-200">
            Generate Report
          </button>

          <div className="mt-8">
            <h3 className="font-bold text-lg text-black mb-4">
              Recent Notifications
            </h3>
            {[
              { text: "New member application received", date: "2024-07-15" },
              { text: "Loan Repayment due for LN/001", date: "2024-07-15" },
              {
                text: "KYC approved for Michael Scoffield",
                date: "2024-07-15",
              },
            ].map((n, i) => (
              <div key={i} className="flex gap-4 mb-4">
                <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5 flex-shrink-0"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{n.text}</p>
                  <p className="text-xs text-gray-500">{n.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
