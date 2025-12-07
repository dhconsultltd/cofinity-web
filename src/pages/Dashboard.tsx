import React, { useState } from 'react';
import {
  Users,
  TrendingUp,
  PiggyBank,
  AlertTriangle,
  X,
  ChevronRight,
  Plus,
  ArrowUpRight,
  ArrowDownLeft,
  MoreVertical,
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';


// Mock data
const dashboardData = {
  metrics: [
    {
      id: 'members',
      label: 'Total Members',
      value: '5,233',
      change: '+11%',
      trend: 'up',
      icon: Users,
      color: 'bg-blue-50 text-blue-700',
    },
    {
      id: 'loans',
      label: 'Active Loans',
      value: '350',
      change: '+5%',
      trend: 'up',
      icon: TrendingUp,
      color: 'bg-green-50 text-green-700',
    },
    {
      id: 'savings',
      label: 'Total Savings',
      value: '₦5.2M',
      change: '+15%',
      trend: 'up',
      icon: PiggyBank,
      color: 'bg-amber-50 text-amber-700',
    },
    {
      id: 'kyc',
      label: 'Pending KYC',
      value: '101',
      change: '-3%',
      trend: 'down',
      icon: AlertTriangle,
      color: 'bg-red-50 text-red-700',
    },
  ],
  activities: [
    {
      id: 1,
      member: 'Sophia Clark',
      activity: 'Loan Application',
      date: '2024-07-15',
      status: 'pending',
      amount: '₦500,000',
    },
    {
      id: 2,
      member: 'Ethan Carter',
      activity: 'Savings Deposit',
      date: '2024-07-14',
      status: 'completed',
      amount: '₦100,000',
    },
    {
      id: 3,
      member: 'Olivia Bennett',
      activity: 'KYC Update',
      date: '2024-07-13',
      status: 'approved',
      amount: '—',
    },
    {
      id: 4,
      member: 'Liam Foster',
      activity: 'Share Purchase',
      date: '2024-07-12',
      status: 'completed',
      amount: '₦50,000',
    },
    {
      id: 5,
      member: 'Ava Hughes',
      activity: 'Loan Repayment',
      date: '2024-07-11',
      status: 'completed',
      amount: '₦150,000',
    },
  ],
  chartData: [
    { month: 'Jan', savings: 3000, loans: 2000 },
    { month: 'Feb', savings: 4000, loans: 2500 },
    { month: 'Mar', savings: 4200, loans: 2700 },
    { month: 'Apr', savings: 3800, loans: 3100 },
    { month: 'May', savings: 4600, loans: 3400 },
    { month: 'Jun', savings: 5200, loans: 3900 },
    { month: 'Jul', savings: 5800, loans: 4200 },
    { month: 'Aug', savings: 6000, loans: 4500 },
  ],
};

// Status badge component
const StatusBadge = ({ status }) => {
  const statusConfig = {
    pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Pending' },
    completed: { bg: 'bg-green-100', text: 'text-green-800', label: 'Completed' },
    approved: { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Approved' },
  };
  const config = statusConfig[status] || statusConfig.pending;
  return (
    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${config.bg} ${config.text}`}>
      {config.label}
    </span>
  );
};

// Metric card component
const MetricCard = ({ metric }) => {
  const Icon = metric.icon;
  return (
    <Card className="rounded-2xl border border-neutral-200 p-6 hover:shadow-lg transition-shadow">
      <div>
        <div className={`w-12 h-12 rounded-lg ${metric.color} flex items-center justify-center mb-4`}>
          <Icon className="w-6 h-6" />
        </div>
        <p className="text-sm font-medium text-neutral-600">{metric.label}</p>
        <h3 className="text-3xl font-bold text-neutral-900 mt-2">{metric.value}</h3>
        <div className="flex items-center gap-1 mt-2">
          {metric.trend === 'up' ? (
            <ArrowUpRight className="w-4 h-4 text-green-600" />
          ) : (
            <ArrowDownLeft className="w-4 h-4 text-red-600" />
          )}
          <span
            className={`text-xs font-semibold ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}
          >
            {metric.change} This Month
          </span>
        </div>
      </div>
    </Card>
  );
};

// Alert banner component
const AlertBanner = ({ onDismiss }) => {
  return (

    <>
 


    <Alert className="mb-6 rounded-xl border border-red-200 bg-red-50">
           <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
          <div>
            <AlertTitle className="text-red-900">Subscription Expired</AlertTitle>
            <AlertDescription className="text-red-700 text-xs mt-1">
              Your active subscription expired 23 days ago. Please renew to continue using this service.
            </AlertDescription>
          </div>
       
      


       
    </Alert>

    </>
  );
};

// Quick actions component
const QuickActions = () => {
  return (
    <Card className="rounded-2xl border border-neutral-200 p-6">
      <h2 className="text-lg font-bold text-neutral-900 mb-4">Quick Actions</h2>
      <div className="space-y-3">
        <Button className="w-full py-5 text-sm font-bold rounded-lg bg-black text-white hover:bg-neutral-900">
          <Plus className="w-4 h-4 mr-2" />
          Add New Member
        </Button>
        <Button
          variant="outline"
          className="w-full py-5 text-sm font-bold rounded-lg border-blue-200 text-blue-700 hover:bg-blue-50"
        >
          Approve Loan
        </Button>
        <Button
          variant="outline"
          className="w-full py-5 text-sm font-bold rounded-lg border-blue-200 text-blue-700 hover:bg-blue-50"
        >
          Generate Report
        </Button>
      </div>
    </Card>
  );
};

// Subscription usage component
const SubscriptionUsage = () => {
  return (
    <Card className="rounded-2xl border border-neutral-200 p-6">
      <h2 className="text-lg font-bold text-neutral-900 mb-4">Subscription Usage</h2>

      {/* Users usage */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-neutral-700" />
            <span className="text-sm font-semibold text-neutral-800">Users</span>
          </div>
          <span className="text-xs font-semibold text-neutral-700">2 of 10</span>
        </div>
        <div className="w-full bg-neutral-200 rounded-full h-2 overflow-hidden">
          <div className="h-full bg-teal-500 rounded-full" style={{ width: '20%' }} />
        </div>
        <p className="text-xs text-neutral-600 mt-2">8 users remaining. Upgrade to increase seats.</p>
      </div>

      {/* Sub-admins usage */}
      <div className="mb-6 pb-6 border-b border-neutral-200">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-neutral-700" />
            <span className="text-sm font-semibold text-neutral-800">Sub-Admins</span>
          </div>
          <span className="text-xs font-semibold text-neutral-700">3 of 5</span>
        </div>
        <div className="w-full bg-neutral-200 rounded-full h-2 overflow-hidden">
          <div className="h-full bg-orange-500 rounded-full" style={{ width: '60%' }} />
        </div>
        <p className="text-xs text-neutral-600 mt-2">2 sub-admin slots remaining.</p>
      </div>

      {/* Plan & upgrade */}
      <div className="space-y-3">
        <div>
          <p className="text-xs text-neutral-600">Current Plan</p>
          <p className="text-sm font-semibold text-neutral-900">Starter • ₦0/month</p>
        </div>
        <Button className="w-full py-5 text-sm font-bold rounded-lg bg-black text-white hover:bg-neutral-900">
          Upgrade Plan
        </Button>
        <p className="text-xs text-neutral-600">
          Upgrading increases user seats, sub-admin slots, and unlocks advanced features.
        </p>
      </div>
    </Card>
  );
};

// Main dashboard component
export default function CooperativeDashboard() {
  const [showAlert, setShowAlert] = useState(true);

  return (
    <div className="min-h-screen bg-neutral-50 py-2 md:p-6 lg:p-8 ">
      <div className="  mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900">Dashboard</h1>
          <p className="text-sm text-neutral-600 mt-1">Welcome back, Cooperative Admin</p>
        </div>

        

        {/* Alert Banner */}
        {showAlert && <AlertBanner onDismiss={() => setShowAlert(false)} />}

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {dashboardData.metrics.map((metric) => (
            <MetricCard key={metric.id} metric={metric} />
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Activities Table - Spans 2 columns */}
          <Card className="rounded-2xl border border-neutral-200 p-6 lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-neutral-900">Recent Activities</h2>
              <Button
                variant="ghost"
                size="sm"
                className="text-neutral-700 hover:bg-neutral-100 gap-1"
              >
                View All
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>

            <div className="overflow-x-auto">
              <Table className="w-full text-sm">
                <TableHeader className=" ">
                  <TableRow className="border-b border-neutral-200 w-full">
                    <TableHead className="text-left py-3 px-4 font-semibold text-neutral-700">Member</TableHead>
                    <TableHead className="text-left py-3 px-4 font-semibold text-neutral-700">Activity</TableHead>
                    <TableHead className="text-right py-3 px-4 font-semibold text-neutral-700">Amount</TableHead>
                    <TableHead className="text-left py-3 px-4 font-semibold text-neutral-700">Date</TableHead>
                    <TableHead className="text-left py-3 px-4 font-semibold text-neutral-700">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dashboardData.activities.map((activity) => (
                    <TableRow
                      key={activity.id}
                      className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors"
                    >
                      <TableCell className="py-3 px-4 text-neutral-900 font-medium">{activity.member}</TableCell>
                      <TableCell className="py-3 px-4 text-neutral-600">{activity.activity}</TableCell>
                      <TableCell className="py-3 px-4 text-right text-neutral-900 font-semibold">{activity.amount}</TableCell>
                      <TableCell className="py-3 px-4 text-neutral-600 text-xs">{activity.date}</TableCell>
                      <TableCell className="py-3 px-4">
                        <StatusBadge status={activity.status} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>

          {/* Sidebar - Quick Actions & Subscription */}
          <div className="flex flex-col gap-6">
            <QuickActions />
            <SubscriptionUsage />
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Savings & Loan Trend */}
          <Card className="rounded-2xl border border-neutral-200 p-6">
            <h2 className="text-lg font-bold text-neutral-900 mb-6">Savings & Loan Trend</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dashboardData.chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="savings"
                  stroke="#2563eb"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="loans"
                  stroke="#d97706"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Loan Repayment Status */}
          <Card className="rounded-2xl border border-neutral-200 p-6">
            <h2 className="text-lg font-bold text-neutral-900 mb-6">Loan Repayment Status</h2>
            <div className="flex items-center justify-center h-80">
              <div className="relative w-40 h-40">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <circle
                    cx="18"
                    cy="18"
                    r="15.915"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="3"
                  />
                  <circle
                    cx="18"
                    cy="18"
                    r="15.915"
                    fill="none"
                    stroke="#16a34a"
                    strokeWidth="3"
                    strokeDasharray="85 100"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold text-neutral-900">85%</span>
                  <span className="text-xs text-neutral-600">Paid</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}