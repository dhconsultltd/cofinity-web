// src/pages/savings/accounts/[id].tsx
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  ArrowLeft,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  Search,
  Copy,
  UserPlus,
  PiggyBank,
} from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import { apiClient } from "@/lib/api-client";
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
import { SAVINGACCOUNT_API, MEMBERS_API } from "@/constants";
import TopNav from "@/components/TopNav";

interface SavingsAccount {
  id: string;
  account_number: string;
  bank_name: string; // Added based on backend
  product_name: string;
  balance: number;
  opened_at: string;
  updated_at: string;
  status: "active" | "inactive" | "dormant" | "closed";
  member: {
    id: string | number;
    name: string;
  };
  product: { id: string | number; name: string };
}

interface Transaction {
  id: string;
  type: string; // e.g., "savings_deposit", "savings_withdrawal"
  amount: number;
  balance_after: number;
  description: string | null;
  created_at: string;
  status: string;
  meta: {
    savings_account_id?: string;
    member_bank_account_id?: string;
    account_number?: string;
  };
}

interface MemberBankAccount {
  id: string;
  bank_name: string;
  account_number: string;
  account_name: string;
}

interface Member {
  id: number;
  first_name: string;
  last_name: string;
  bank_accounts?: MemberBankAccount[];
}

const transactionSchema = z.object({
  amount: z.coerce.number().min(0.01, "Amount must be greater than 0"),
  description: z.string().optional(),
  member_bank_account_id: z.string().optional(),
});

export default function SavingsAccountDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [depositOpen, setDepositOpen] = useState(false);
  const [withdrawalOpen, setWithdrawalOpen] = useState(false);
  const [search, setSearch] = useState("");

  // Fetch Account
  const { data: account, isLoading: accountLoading } = useQuery<SavingsAccount>(
    {
      queryKey: ["savings-account", id],
      queryFn: () =>
        apiClient
          .get(SAVINGACCOUNT_API.SHOW(Number(id)))
          .then((res) => res.data), // Adjusted for wrapped response {success: true, data: {...}}
    }
  );

  // Fetch Member details separately to get bank_accounts
  const { data: member, isLoading: memberLoading } = useQuery<Member>({
    queryKey: ["member-bank-accounts", account?.member.id],
    queryFn: () =>
      apiClient
        .get(MEMBERS_API.SHOW(account?.member.id || "0"))
        .then((res) => res.data),
    enabled: !!account?.member.id,
  });

  const bankAccounts = member?.bank_accounts || [];

  // Fetch Transactions (from unified transactions table)
  const { data: transactionsData, isLoading: txLoading } = useQuery({
    queryKey: ["savings-account-transactions", id, search],
    queryFn: () =>
      apiClient
        .get(SAVINGACCOUNT_API.TRANSACTIONS(Number(id)), { params: { search } })
        .then((res) => res), // Assuming {data: [...], meta: {...}}
    enabled: !!id,
  });

  const transactions: Transaction[] = transactionsData?.data || [];
  const meta = transactionsData?.meta || {
    total: 0,
    current_page: 1,
    last_page: 1,
  };

  // Forms
  const depositForm = useForm<z.infer<typeof transactionSchema>>({
    resolver: zodResolver(transactionSchema),
  });
  const withdrawalForm = useForm<z.infer<typeof transactionSchema>>({
    resolver: zodResolver(transactionSchema),
  });

  // Mutations
  const transactionMutation = useMutation({
    mutationFn: ({
      type,
      data,
    }: {
      type: "deposit" | "withdrawal";
      data: z.infer<typeof transactionSchema>;
    }) => {
      const endpoint = type === "deposit" ? "deposit" : "withdraw";
      return apiClient.post(
        SAVINGACCOUNT_API.DEPOSIT_WITHDRAWAL(Number(id), endpoint),
        data
      );
    },
    onSuccess: (_, vars) => {
      queryClient.invalidateQueries({ queryKey: ["savings-account", id] });
      queryClient.invalidateQueries({
        queryKey: ["savings-account-transactions", id],
      });
      toast.success(
        `${
          vars.type === "deposit" ? "Deposit" : "Withdrawal"
        } recorded successfully`
      );
      vars.type === "deposit"
        ? setDepositOpen(false)
        : setWithdrawalOpen(false);
      depositForm.reset();
      withdrawalForm.reset();
    },
    onError: (err: any) =>
      toast.error(err.response?.data?.message || "Transaction failed"),
  });

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(value);

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-NG", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  const exportToPDF = () => {
    if (!account || transactions.length === 0) return;

    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(`Savings Account Statement`, 14, 20);
    doc.setFontSize(12);
    doc.text(
      `Account: ${account.account_number} | Member: ${account.member.name}`,
      14,
      30
    );
    doc.text(
      `Product: ${account.product.name} | Balance: ${formatCurrency(
        account.balance
      )}`,
      14,
      38
    );

    autoTable(doc, {
      startY: 50,
      head: [["Date", "Type", "Amount", "Balance After", "Description"]],
      body: transactions.map((tx) => [
        formatDate(tx.created_at),
        tx.type.replace("savings_", "").charAt(0).toUpperCase() +
          tx.type.replace("savings_", "").slice(1),
        formatCurrency(tx.amount),
        formatCurrency(tx.balance_after),
        tx.description || "-",
      ]),
    });

    doc.save(`statement_${account.account_number}.pdf`);
  };

  const copyAccountNumber = () => {
    if (account?.account_number) {
      navigator.clipboard.writeText(account.account_number);
      toast.success("Account number copied to clipboard");
    }
  };

  if (accountLoading || memberLoading) {
    return (
      <div className="p-6 space-y-8">
        <Skeleton className="h-10 w-64" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  if (!account)
    return (
      <div className="p-6 text-center text-red-600">Account not found</div>
    );

  return (
    <div className="py-6 px-2 space-y-8">
      {/* Header */}

      <TopNav
        title="Savings Account Details"
        description="View and manage savings account details"
        icon={<PiggyBank className="h-8 w-8 text-gray-400 hidden sm:block" />}
        link="/savings"
      />

      {/* Summary Cards - 6 cards, 2 rows of 3 on md+ */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-5">
          <div>
            <p className="text-sm text-gray-600">Account No.</p>
            <div className="flex items-center gap-2">
              <p className="font-bold">{account.account_number}</p>
              <Button
                variant="ghost"
                size="icon"
                onClick={copyAccountNumber}
                className="h-6 w-6"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
        <Card className="p-5">
          <div>
            <p className="text-sm text-gray-600">Bank Name</p>
            <p className="font-bold">{account.bank_name}</p>
          </div>
        </Card>
        <Card className="p-5">
          <div>
            <p className="text-sm text-gray-600">Balance</p>
            <p className="text-xl font-bold">
              {formatCurrency(account.balance)}
            </p>
          </div>
        </Card>
        <Card className="p-5">
          <div>
            <p className="text-sm text-gray-600">Member</p>
            <p className="font-bold">{account.member.name}</p>
          </div>
        </Card>
        <Card className="p-5">
          <div>
            <p className="text-sm text-gray-600">Product</p>
            <p className="font-bold">{account.product.name}</p>
          </div>
        </Card>
        <Card className="p-5">
          <div>
            <p className="text-sm text-gray-600">Status</p>
            <Badge
              variant={account.status === "active" ? "default" : "secondary"}
            >
              {account.status}
            </Badge>
          </div>
        </Card>
      </div>

      {/* Actions */}
      <div className="flex gap-4">
        <div className="flex flex-wrap gap-3">
          <Button
            onClick={() => setWithdrawalOpen(true)}
            className="text-white"
          >
            <ArrowDownRight className="w-4 h-4 mr-2" />
            Record Withdrawal
          </Button>
          <Button
            onClick={() => setDepositOpen(true)}
            className="bg-green-700 hover:bg-green-900 text-white"
          >
            <ArrowUpRight className="w-4 h-4 mr-2" />
            Record Deposit
          </Button>

          <Button
            onClick={exportToPDF}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Export Statement (PDF)
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="flex items-center gap-4 max-w-md">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search transactions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Transactions Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Balance After</TableHead>
              <TableHead>Description</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {txLoading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-12">
                  Loading...
                </TableCell>
              </TableRow>
            ) : transactions.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center py-12 text-gray-500"
                >
                  No transactions yet
                </TableCell>
              </TableRow>
            ) : (
              transactions.map((tx) => (
                <TableRow key={tx.id}>
                  <TableCell>{formatDate(tx.created_at)}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        tx.type.includes("deposit") ? "default" : "destructive"
                      }
                    >
                      {tx.type.replace("savings_", "").charAt(0).toUpperCase() +
                        tx.type.replace("savings_", "").slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium">
                    {formatCurrency(tx.amount)}
                  </TableCell>
                  <TableCell>{formatCurrency(tx.balance_after)}</TableCell>
                  <TableCell className="text-sm text-gray-600">
                    {tx.description || "-"}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>

      {/* Deposit Modal */}
      <Dialog open={depositOpen} onOpenChange={setDepositOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Credit Account (Deposit)</DialogTitle>
          </DialogHeader>
          <form
            onSubmit={depositForm.handleSubmit((d) =>
              transactionMutation.mutate({ type: "deposit", data: d })
            )}
          >
            <div className="space-y-4">
              <div className="space-y-3">
                <Label>Amount (₦)</Label>
                <Input
                  type="number"
                  step="0.01"
                  {...depositForm.register("amount", { valueAsNumber: true })}
                  placeholder="0.00"
                />
                {depositForm.formState.errors.amount && (
                  <p className="text-sm text-red-600">
                    {depositForm.formState.errors.amount.message}
                  </p>
                )}
              </div>
              <div className="space-y-3">
                <Label>Description (optional)</Label>
                <Textarea
                  {...depositForm.register("description")}
                  placeholder="e.g., Monthly contribution"
                />
              </div>
              <div className="flex justify-end gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setDepositOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={transactionMutation.isPending}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Record Deposit
                </Button>
              </div>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Withdrawal Modal */}
      <Dialog open={withdrawalOpen} onOpenChange={setWithdrawalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Debit Account (Withdrawal)</DialogTitle>
          </DialogHeader>
          <form
            onSubmit={withdrawalForm.handleSubmit((d) =>
              transactionMutation.mutate({ type: "withdrawal", data: d })
            )}
          >
            <div className="space-y-4">
              <div className="space-y-3">
                <Label>Amount (₦)</Label>
                <Input
                  type="number"
                  step="0.01"
                  {...withdrawalForm.register("amount", {
                    valueAsNumber: true,
                  })}
                  placeholder="0.00"
                />
                {withdrawalForm.formState.errors.amount && (
                  <p className="text-sm text-red-600">
                    {withdrawalForm.formState.errors.amount.message}
                  </p>
                )}
              </div>

              {bankAccounts.length > 0 && (
                <div className="space-y-3">
                  <Label>Pay to Bank Account (optional)</Label>
                  <Select
                    onValueChange={(value) =>
                      withdrawalForm.setValue(
                        "member_bank_account_id",
                        value || undefined
                      )
                    }
                    value={
                      withdrawalForm.watch("member_bank_account_id") ??
                      undefined
                    }
                    // ^^^ This makes the Select controlled and shows the selected value
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select bank account" />
                    </SelectTrigger>
                    <SelectContent>
                      {/* Optional: Add a clear option */}
                      <SelectItem
                        value="none"
                        className="text-muted-foreground"
                      >
                        No bank account (manual withdrawal)
                      </SelectItem>

                      {bankAccounts.map((ba) => (
                        <SelectItem key={ba.id} value={String(ba.id)}>
                          {ba.bank_name} - {ba.account_number} (
                          {ba.account_name})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {/* Optional: Show currently selected bank account details below */}
                  {withdrawalForm.watch("member_bank_account_id") &&
                    withdrawalForm.watch("member_bank_account_id") !==
                      "none" && (
                      <>
                        <p className="text-xs text-muted-foreground">
                          Selected:{" "}
                          {
                            bankAccounts.find(
                              (b) =>
                                String(b.id) ===
                                withdrawalForm.watch("member_bank_account_id")
                            )?.bank_name
                          }{" "}
                          -{" "}
                          {
                            bankAccounts.find(
                              (b) =>
                                String(b.id) ===
                                withdrawalForm.watch("member_bank_account_id")
                            )?.account_number
                          }
                        </p>

                        <div className="rounded-md bg-yellow-50 border border-yellow-200 p-3">
                          <p className="text-sm text-yellow-800">
                            ⚠️ We will automatically pay this member if there is
                            sufficient balance in the cooperative wallet.
                          </p>
                        </div>
                      </>
                    )}
                </div>
              )}

              <div className="space-y-3">
                <Label>Description (optional)</Label>
                <Textarea
                  {...withdrawalForm.register("description")}
                  placeholder="e.g., Withdrawal request"
                />
              </div>
              <div className="flex justify-end ga</>p-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setWithdrawalOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={transactionMutation.isPending}
                  className="bg-red-600 hover:bg-red-700"
                >
                  Record Withdrawal
                </Button>
              </div>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
