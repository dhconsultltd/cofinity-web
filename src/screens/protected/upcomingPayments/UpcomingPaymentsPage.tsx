// src/pages/payments/upcoming.tsx
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  Search, Download, Send, Eye, AlertCircle, Clock, AlertTriangle, CheckCircle2 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import apiClient from "@/lib/api-client";
import { toast } from "sonner";

const UPCOMING_PAYMENTS_API = "/api/loan-repayments/upcoming";

export default function UpcomingPaymentsPage() {
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const { data: response, isLoading } = useQuery({
    queryKey: ["upcoming-payments"],
    queryFn: () => apiClient.get(UPCOMING_PAYMENTS_API).then(res => res),
  });

  const payments = response?.data || [];

  const filtered = payments.filter(p => {
    const matchesSearch = 
      p.loan.loan_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.loan.member.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.loan.member.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.loan.member.member_number.includes(searchQuery);
    
    const matchesStatus = statusFilter === "all" || 
      (statusFilter === "overdue" && p.is_overdue) ||
      (statusFilter === "due" && p.is_due_today) ||
      (statusFilter === "upcoming" && !p.is_overdue && !p.is_due_today);

    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: payments.length,
    overdue: payments.filter(p => p.is_overdue).length,
    dueToday: payments.filter(p => p.is_due_today).length,
    upcoming: payments.filter(p => !p.is_overdue && !p.is_due_today).length,
    totalAmount: payments.reduce((sum, p) => sum + p.total_due, 0),
    overdueAmount: payments.filter(p => p.is_overdue).reduce((sum, p) => sum + p.total_due, 0),
  };

  const getStatusBadge = (payment) => {
    if (payment.is_overdue) {
      return <Badge className="bg-red-100 text-red-800">Overdue ({payment.days_overdue}d)</Badge>;
    }
    if (payment.is_due_today) {
      return <Badge className="bg-amber-100 text-amber-800">Due Today</Badge>;
    }
    return <Badge className="bg-blue-100 text-blue-800">Upcoming</Badge>;
  };

  const formatCurrency = (amount) => new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(amount);
  const formatDate = (date) => new Date(date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

  const sendReminder = useMutation({
    mutationFn: (repaymentId) => apiClient.post(`/api/loan-repayments/${repaymentId}/reminder`),
    onSuccess: () => toast.success("Reminder sent"),
  });

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Upcoming Payments</h1>
          <p className="text-gray-600 mt-1">Track and manage loan repayment schedules</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button>
            <Send className="w-4 h-4 mr-2" />
            Send Bulk Reminders
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Total Due</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{stats.total}</p>
            <p className="text-sm text-gray-600">{formatCurrency(stats.totalAmount)}</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-red-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-1">
              <AlertCircle className="w-4 h-4" /> Overdue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-red-600">{stats.overdue}</p>
            <p className="text-sm text-red-600">{formatCurrency(stats.overdueAmount)}</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-amber-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-1">
              <AlertTriangle className="w-4 h-4" /> Due Today
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-amber-600">{stats.dueToday}</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-1">
              <Clock className="w-4 h-4" /> Upcoming
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-600">{stats.upcoming}</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search by loan ID, member..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Payments</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
                <SelectItem value="due">Due Today</SelectItem>
                <SelectItem value="upcoming">Upcoming</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Loan ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Member</TableHead>
                <TableHead className="text-right">Amount Due</TableHead>
                <TableHead className="text-right">Principal</TableHead>
                <TableHead className="text-right">Interest</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((p) => (
                <TableRow key={p.id}>
                  <TableCell className="font-medium">{p.loan.loan_id}</TableCell>
                  <TableCell>{formatDate(p.due_date)}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{p.loan.member.first_name} {p.loan.member.last_name}</p>
                      <p className="text-xs text-gray-500">#{p.loan.member.member_number}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-semibold">
                    {formatCurrency(p.total_due)}
                  </TableCell>
                  <TableCell className="text-right">{formatCurrency(p.principal_due)}</TableCell>
                  <TableCell className="text-right">{formatCurrency(p.interest_due)}</TableCell>
                  <TableCell>{getStatusBadge(p)}</TableCell>
                  <TableCell>
                    <Button 
                      size="sm" 
                      variant="ghost"
                      onClick={() => sendReminder.mutate(p.id)}
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}