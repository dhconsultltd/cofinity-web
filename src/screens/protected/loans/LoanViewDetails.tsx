// src/pages/loans/[id].tsx
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { ArrowLeft, Check, X, FileText, DollarSign, User, Calendar, AlertCircle, File, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import apiClient from "@/lib/api-client";
import { toast } from "sonner";
import { useState } from "react";
import { queryClient } from "@/lib/queryClient";

export default function LoanDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [scheduleOpen, setScheduleOpen] = useState(false);

  const { data: loan, isLoading } = useQuery({
    queryKey: ["loan", id],
    queryFn: () => apiClient.get(`/api/loans/${id}`).then(res => res.data),
  });

  const approveMutation = useMutation({
    mutationFn: () => apiClient.post(`/api/loans/${id}/approve`),
    onSuccess: () => {
      toast.success("Loan approved");
      queryClient.invalidateQueries({ queryKey: ["loan", id] });
    },
  });

  const declineMutation = useMutation({
    mutationFn: () => apiClient.post(`/api/loans/${id}/decline`),
    onSuccess: () => {
      toast.success("Loan declined");
      queryClient.invalidateQueries({ queryKey: ["loan", id] });
    },
  });

  const exportMutation = useMutation({
    mutationFn: () => apiClient.get(`/api/loans/${id}/export-schedule`),
    onSuccess: (res) => {
      toast.success("Schedule exported and emailed");
      window.open(res.data.pdf_url, '_blank');
    },
  });

  if (isLoading) return <div className="text-center py-12">Loading...</div>;

  if (!loan) return <div className="text-center py-12 text-gray-500">Loan not found</div>;

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: "secondary",
      approved: "outline",
      disbursed: "default",
      repaid: "default",
      defaulted: "destructive",
    } as const;

    return <Badge variant={variants[status] || "secondary"}>{status.charAt(0).toUpperCase() + status.slice(1)}</Badge>;
  };

  const formatCurrency = (amount: number) => new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(amount);

  return (
    <div className="py-5 lg:p-8 max-w-6xl mx-auto">
      <Button variant="ghost" onClick={() => navigate("/loans")} className="mb-6">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Loans
      </Button>

      <div className="space-y-8">
        {/* Overview */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Loan Overview</CardTitle>
            {getStatusBadge(loan.status)}
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-1">
              <p className="text-sm text-gray-600">Loan ID</p>
              <p className="font-medium">{loan.loan_id}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-600">Product</p>
              <p className="font-medium">{loan.product.name}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-600">Term</p>
              <p className="font-medium">{loan.term} {loan.term_period}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-600">Principal</p>
              <p className="font-bold">{formatCurrency(loan.principal_amount)}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-600">Total Payable</p>
              <p className="font-bold">{formatCurrency(loan.total_payable)}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-600">Outstanding</p>
              <p className="font-bold text-red-600">{formatCurrency(loan.outstanding_balance)}</p>
            </div>
          </CardContent>
        </Card>

        {/* Member & Savings */}
        <Card>
          <CardHeader>
            <CardTitle>Member & Savings Account</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-4">
              <User className="w-6 h-6 text-gray-600" />
              <div>
                <p className="font-medium">{loan.member.first_name} {loan.member.last_name}</p>
                <p className="text-sm text-gray-500">#{loan.member.member_number}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <CreditCard className="w-6 h-6 text-gray-600" />
              <div>
                <p className="font-medium">Linked Savings Account</p>
                <p className="text-sm">Account Number: {loan.savingsAccount?.account_number}</p>
                <p className="text-sm text-gray-500">Balance: {formatCurrency(loan.savingsAccount?.balance)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Guarantors */}
        <Card>
          <CardHeader>
            <CardTitle>Guarantors</CardTitle>
          </CardHeader>
          <CardContent>
            {loan.guarantors?.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Member</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Accepted At</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loan.guarantors.map((g: any) => (
                    <TableRow key={g.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-xs">
                            {/* {g?.member.first_name[0]}{g?.member.last_name[0]} */} ode
                          </div>
                          <div>
                            {/* <p className="font-medium">{g?.member.first_name} {g?.member.last_name}</p>
                            <p className="text-xs text-gray-500">#{g?.member.member_number}</p> */}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(g.status)}</TableCell>
                      <TableCell>{g.accepted_at ? new Date(g.accepted_at).toLocaleDateString() : "—"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <p className="text-center text-gray-500 py-4">No guarantors assigned</p>
            )}
          </CardContent>
        </Card>

        {/* Repayments */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Repayments</CardTitle>
            <Button variant="outline" onClick={() => setScheduleOpen(true)}>
              <FileText className="w-4 h-4 mr-2" />
              View Schedule
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>#</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Amount Due</TableHead>
                  <TableHead>Paid</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loan.repayments?.map((rep: any) => (
                  <TableRow key={rep.id}>
                    <TableCell>{rep.id}</TableCell>
                    <TableCell>{new Date(rep.due_date).toLocaleDateString()}</TableCell>
                    <TableCell>{formatCurrency(rep.total_due)}</TableCell>
                    <TableCell>{formatCurrency(rep.amount_paid)}</TableCell>
                    <TableCell>{getStatusBadge(rep.status)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {loan.status === "disbursed" && (
              <div className="mt-4 flex justify-end">
                <Button onClick={() => exportMutation.mutate()}>
                  <FileText className="w-4 h-4 mr-2" />
                  Export Schedule
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex gap-4">
          {loan.status === "pending" && (
            <>
              <Button onClick={() => approveMutation.mutate()} disabled={approveMutation.isPending}>
                <Check className="w-4 h-4 mr-2" />
                Approve
              </Button>
              <Button variant="destructive" onClick={() => declineMutation.mutate()} disabled={declineMutation.isPending}>
                <X className="w-4 h-4 mr-2" />
                Decline
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Payment Schedule Modal */}
      <Dialog open={scheduleOpen} onOpenChange={setScheduleOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Payment Schedule</DialogTitle>
          </DialogHeader>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Principal Due</TableHead>
                <TableHead>Interest Due</TableHead>
                <TableHead>Total Due</TableHead>
                <TableHead>Paid</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loan.repayments?.map((rep: any) => (
                <TableRow key={rep.id}>
                  <TableCell>{rep.id}</TableCell>
                  <TableCell>{new Date(rep.due_date).toLocaleDateString()}</TableCell>
                  <TableCell>{formatCurrency(rep.principal_due)}</TableCell>
                  <TableCell>{formatCurrency(rep.interest_due)}</TableCell>
                  <TableCell className="font-medium">{formatCurrency(rep.total_due)}</TableCell>
                  <TableCell>{formatCurrency(rep.amount_paid)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </DialogContent>
      </Dialog>
    </div>
  );
}