// src/pages/savings/accounts/[id].tsx
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowUpRight,
  ArrowDownRight,
  Download,
} from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import { apiClient } from "@/lib/api-client";
import { SAVINGACCOUNT_API, SAVINGTRANSACTION_API } from "@/constants";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";

interface SavingsAccount {
  id: string;
  account_number: string;
  product_name: string;
  balance: number;
  opened_at: string;
  updated_at: string;
  status: "active" | "inactive" | "dormant" | "closed";
  member: {
    id: string | number;
    name: string;
    bank_accounts: MemberBankAccount[]; // Fetched with account details
  };
  product: {
    id: string | number;
    name: string;
  };
}

interface Transaction {
  id: string;
  type: "deposit" | "withdrawal" | "interest" | "fee";
  amount: number;
  description: string;
  created_at: string;
  status: "completed" | "pending" | "failed";
}

interface MemberBankAccount {
  id: string;
  bank_name: string;
  account_number: string;
  account_name: string;
}

const transactionSchema = z.object({
  amount: z.coerce.number().min(0.01, "Amount must be > 0"),
  description: z.string().optional(),
  member_bank_account_id: z.string().optional(), // For withdrawals
});

export default function SavingsAccountDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [depositOpen, setDepositOpen] = useState(false);
  const [withdrawalOpen, setWithdrawalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch Account Details
  const { data: account, isLoading: accountLoading } = useQuery<SavingsAccount>({
    queryKey: ["savings-account", id],
    queryFn: () => apiClient.get(`${SAVINGACCOUNT_API.LIST}/${id}`).then((res) => res.data),
  });

  // Fetch Transactions
  const { data: transactionsResponse, isLoading: transactionsLoading } = useQuery({
    queryKey: ["savings-transactions", id, currentPage, search],
    queryFn: () =>
      apiClient
        .get(`${SAVINGACCOUNT_API.LIST}/${id}/transactions`, {
          params: { page: currentPage, search },
        })
        .then((res) => res.data),
  });

  const transactions: Transaction[] = transactionsResponse?.data || [];
  const totalPages = transactionsResponse?.meta?.last_page || 1;

  // Forms
  const depositForm = useForm<z.infer<typeof transactionSchema>>({
    resolver: zodResolver(transactionSchema),
  });

  const withdrawalForm = useForm<z.infer<typeof transactionSchema>>({
    resolver: zodResolver(transactionSchema),
  });

  // Mutation for Transactions
  const transactionMutation = useMutation({
    mutationFn: ({ type, data }: { type: "deposit" | "withdrawal"; data: z.infer<typeof transactionSchema> }) => {
      const endpoint = type === "deposit" ? SAVINGACCOUNT_API.DEPOSIT : SAVINGACCOUNT_API.WITHDRAW;
      return apiClient.post(`${SAVINGACCOUNT_API.LIST}/${id}${endpoint}`, data);
    },
    onSuccess: (_, vars) => {
      queryClient.invalidateQueries({ queryKey: ["savings-account", id] });
      queryClient.invalidateQueries({ queryKey: ["savings-transactions", id] });
      toast.success(`${vars.type === "deposit" ? "Deposit" : "Withdrawal"} recorded successfully`);
      vars.type === "deposit" ? setDepositOpen(false) : setWithdrawalOpen(false);
      depositForm.reset();
      withdrawalForm.reset();
    },
    onError: (err: any) => toast.error(err.response?.data?.message || "Transaction failed"),
  });

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN" }).format(value);

  const formatDate = (date: string) => new Date(date).toLocaleString();

  // Export to PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text(`Transactions for Account ${account?.account_number}`, 14, 20);
    autoTable(doc, {
      startY: 30,
      head: [["Date", "Type", "Amount", "Description", "Status"]],
      body: transactions.map((tx) => [
        formatDate(tx.created_at),
        tx.type.charAt(0).toUpperCase() + tx.type.slice(1),
        formatCurrency(tx.amount),
        tx.description || "-",
        tx.status.charAt(0).toUpperCase() + tx.status.slice(1),
      ]),
    });
    doc.save(`account_${account?.account_number}_transactions.pdf`);
  };

  if (accountLoading) {
    return (
      <div className="p-6 space-y-8">
        <Skeleton className="h-8 w-32" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (!account) {
    return <div className="p-6 text-center text-red-600">Account not found</div>;
  }

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => navigate("/savings")} className="p-0">
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-2xl font-bold">Savings Account Details</h1>
        </div>
        <Button onClick={exportToPDF} variant="outline" className="flex items-center gap-2">
          <Download className="w-4 h-4" />
          Export Transactions (PDF)
        </Button>
      </div>

      {/* Account Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <p className="text-sm text-gray-600">Account Number</p>
          <p className="text-xl font-bold">{account.account_number}</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-gray-600">Balance</p>
          <p className="text-xl font-bold">{formatCurrency(account.balance)}</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-gray-600">Member</p>
          <p className="text-xl font-bold">{account.member.name}</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-gray-600">Product</p>
          <p className="text-xl font-bold">{account.product.name}</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-gray-600">Status</p>
          <Badge variant={account.status === "active" ? "default" : "secondary"}>
            {account.status.charAt(0).toUpperCase() + account.status.slice(1)}
          </Badge>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-gray-600">Opened At</p>
          <p className="text-xl">{formatDate(account.opened_at)}</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-gray-600">Last Updated</p>
          <p className="text-xl">{formatDate(account.updated_at)}</p>
        </Card>
      </div>

      {/* Actions */}
      <div className="flex gap-4">
        <Button onClick={() => setDepositOpen(true)} className="bg-green-600 hover:bg-green-700 text-white">
          <ArrowUpRight className="w-4 h-4 mr-2" />
          Credit Account (Deposit)
        </Button>
        <Button onClick={() => setWithdrawalOpen(true)} className="bg-red-600 hover:bg-red-700 text-white">
          <ArrowDownRight className="w-4 h-4 mr-2" />
          Debit Account (Withdrawal)
        </Button>
      </div>

      {/* Transactions Search */}
      <div className="flex gap-4">
        <Input
          placeholder="Search transactions by description or amount"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-md"
        />
      </div>

      {/* Transactions Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactionsLoading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-12">
                  Loading transactions...
                </TableCell>
              </TableRow>
            ) : transactions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-12">
                  No transactions found
                </TableCell>
              </TableRow>
            ) : (
              transactions.map((tx) => (
                <TableRow key={tx.id}>
                  <TableCell>{formatDate(tx.created_at)}</TableCell>
                  <TableCell>
                    {tx.type === "deposit" ? (
                      <Badge variant="success">Deposit</Badge>
                    ) : tx.type === "withdrawal" ? (
                      <Badge variant="destructive">Withdrawal</Badge>
                    ) : (
                      <Badge>{tx.type.charAt(0).toUpperCase() + tx.type.slice(1)}</Badge>
                    )}
                  </TableCell>
                  <TableCell>{formatCurrency(tx.amount)}</TableCell>
                  <TableCell>{tx.description || "-"}</TableCell>
                  <TableCell>
                    <Badge variant={tx.status === "completed" ? "default" : "secondary"}>
                      {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center">
          {/* Implement pagination similar to savings/index.tsx */}
        </div>
      )}

      {/* Deposit Modal */}
      <Dialog open={depositOpen} onOpenChange={setDepositOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Credit Account (Deposit)</DialogTitle>
          </DialogHeader>
          <form
            onSubmit={depositForm.handleSubmit((data) =>
              transactionMutation.mutate({ type: "deposit", data })
            )}
            className="space-y-4"
          >
            <div>
              <Label>Amount *</Label>
              <Input
                type="number"
                step="0.01"
                placeholder="0.00"
                {...depositForm.register("amount", { valueAsNumber: true })}
              />
              {depositForm.formState.errors.amount && (
                <p className="text-sm text-red-600 mt-1">
                  {depositForm.formState.errors.amount.message}
                </p>
              )}
            </div>
            <div>
              <Label>Description (optional)</Label>
              <Textarea {...depositForm.register("description")} />
            </div>
            <div className="flex justify-end gap-3">
              <Button type="button" variant="outline" onClick={() => setDepositOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={transactionMutation.isPending} className="bg-green-600 hover:bg-green-700">
                {transactionMutation.isPending ? "Processing..." : "Record Deposit"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Withdrawal Modal */}
      <Dialog open={withdrawalOpen} onOpenChange={setWithdrawalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Debit Account (Withdrawal)</DialogTitle>
          </DialogHeader>
          <form
            onSubmit={withdrawalForm.handleSubmit((data) =>
              transactionMutation.mutate({ type: "withdrawal", data })
            )}
            className="space-y-4"
          >
            <div>
              <Label>Amount *</Label>
              <Input
                type="number"
                step="0.01"
                placeholder="0.00"
                {...withdrawalForm.register("amount", { valueAsNumber: true })}
              />
              {withdrawalForm.formState.errors.amount && (
                <p className="text-sm text-red-600 mt-1">
                  {withdrawalForm.formState.errors.amount.message}
                </p>
              )}
            </div>
            {account.member.bank_accounts?.length > 0 && (
              <div>
                <Label>Withdraw to Bank Account (optional)</Label>
                <Select onValueChange={(v) => withdrawalForm.setValue("member_bank_account_id", v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select bank account" />
                  </SelectTrigger>
                  <SelectContent>
                    {account.member.bank_accounts.map((ba) => (
                      <SelectItem key={ba.id} value={ba.id}>
                        {ba.bank_name} - {ba.account_number} ({ba.account_name})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            <div>
              <Label>Description (optional)</Label>
              <Textarea {...withdrawalForm.register("description")} />
            </div>
            <div className="flex justify-end gap-3">
              <Button type="button" variant="outline" onClick={() => setWithdrawalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={transactionMutation.isPending} className="bg-red-600 hover:bg-red-700">
                {transactionMutation.isPending ? "Processing..." : "Record Withdrawal"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}