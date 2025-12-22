// src/screens/protected/members/member/c/SavingsAccountTab.tsx
"use client";

import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import {
  Wallet,
  Plus,
  History,
  CreditCard,
  Loader2,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import { apiClient } from "@/lib/api-client";
import { MEMBERS_API } from "@/constants";

// Expected shapes
type SavingsAccount = {
  id: number;
  account_number: string;
  product_name: string; // From savings_product
  balance: number;
  total_deposits: number;
  total_withdrawals: number;
  interest_earned: number;
  status: "active" | "dormant" | "closed";
  opened_at: string;
  last_transaction_at?: string | null;
};

type Member = {
  id: number;
  savings_accounts?: SavingsAccount[];
};

interface SavingsAccountTabProps {
  memberId: number;
}

export default function SavingsAccountTab({
  memberId,
}: SavingsAccountTabProps) {
  const queryClient = useQueryClient();

  const { data: member, isLoading } = useQuery({
    queryKey: ["member-savings", memberId],
    queryFn: async () => {
      const res = await apiClient.get(MEMBERS_API.SHOW(memberId));
      return res.data as Member;
    },
  });

  const savingsAccounts = member?.savings_accounts || [];

  const formatCurrency = (amount: number) =>
    `₦${amount.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-8 bg-gray-200 rounded w-64 animate-pulse" />
        <div className="grid gap-4">
          {[1, 2].map((i) => (
            <Card key={i}>
              <CardHeader>
                <div className="h-6 bg-gray-200 rounded w-48 animate-pulse" />
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Wallet className="w-6 h-6" />
            Savings Accounts
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            View all savings products and balances for this member
          </p>
        </div>

        {/* Optional: Button to open "Create Savings Account" modal if your flow allows admins to create on behalf of member */}
        {/* <Button>
          <Plus className="w-4 h-4 mr-2" />
          Open New Account
        </Button> */}
      </div>

      {savingsAccounts.length === 0 ? (
        <Card>
          <CardContent className="text-center py-16">
            <Wallet className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <CardTitle className="text-lg text-gray-600">
              No Savings Accounts
            </CardTitle>
            <CardDescription className="mt-2">
              This member has not opened any savings account yet.
            </CardDescription>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          {savingsAccounts.map((account) => (
            <Card key={account.id} className="overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl flex items-center gap-2">
                      <CreditCard className="w-5 h-5" />
                      {account.product_name}
                    </CardTitle>
                    <CardDescription>
                      Account No:{" "}
                      <span className="font-mono">
                        {account.account_number}
                      </span>
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    <Badge
                      variant={
                        account.status === "active" ? "default" : "secondary"
                      }
                      className={
                        account.status === "active" ? "bg-green-600" : ""
                      }
                    >
                      {account.status === "active" ? (
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                      ) : (
                        <AlertCircle className="w-3 h-3 mr-1" />
                      )}
                      {account.status.charAt(0).toUpperCase() +
                        account.status.slice(1)}
                    </Badge>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-6">
                {/* Balance Summary */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Current Balance</p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">
                      {formatCurrency(account.balance)}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Total Deposits</p>
                    <p className="text-2xl font-semibold text-green-600">
                      {formatCurrency(account.total_deposits)}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Interest Earned</p>
                    <p className="text-2xl font-semibold text-blue-600">
                      {formatCurrency(account.interest_earned)}
                    </p>
                  </div>
                </div>

                {/* Details Table */}
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Opened On</TableHead>
                      <TableHead>Last Transaction</TableHead>
                      <TableHead>Total Withdrawals</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        {format(new Date(account.opened_at), "dd MMM yyyy")}
                      </TableCell>
                      <TableCell>
                        {account.last_transaction_at
                          ? format(
                              new Date(account.last_transaction_at),
                              "dd MMM yyyy"
                            )
                          : "No transactions yet"}
                      </TableCell>
                      <TableCell className="text-red-600">
                        {formatCurrency(account.total_withdrawals)}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>

                {/* Action Buttons */}
                <div className="flex gap-3 mt-6">
                  <Button variant="outline">
                    <History className="w-4 h-4 mr-2" />
                    View Transactions
                  </Button>
                  {/* Future actions: Fund, Withdraw, Close Account, etc. */}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
