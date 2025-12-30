// src/components/member/LoansTab.tsx
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import {
  Landmark,
  AlertCircle,
  Calendar,
  DollarSign,
  CreditCard,
  CheckCircle2,
  Clock,
  Ban,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { apiClient } from "@/lib/api-client";
import { MEMBERS_API } from "@/constants";
import { cn } from "@/lib/utils";

interface Loan {
  id: number;
  reference: string;
  purpose?: string;
  amount: number;
  outstanding_balance: number;
  monthly_repayment?: number;
  next_payment_due?: string;
  status: "active" | "paid" | "overdue" | "defaulted" | "pending" | string;
  created_at?: string;
}

export default function LoansTab({ memberId }: { memberId: number }) {
  const { data, isLoading, isError } = useQuery<Loan[]>({
    queryKey: ["member-loans", memberId],
    queryFn: async () => {
      const res = await apiClient.get(MEMBERS_API.LOANS(memberId));
      return res.data?.loans || res.data || [];
    },
  });

  const loans = data || [];

  // Quick summary stats
  const activeLoans = loans.filter((l) => l.status === "active").length;
  const totalOutstanding = loans.reduce(
    (sum, l) => sum + Number(l.outstanding_balance || 0),
    0
  );

  if (isLoading) {
    return <LoansTabSkeleton />;
  }

  if (isError) {
    return (
      <Card className="p-10 text-center border-destructive/30">
        <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-destructive">
          Failed to load loans
        </h3>
        <p className="text-muted-foreground mt-2">Please try again later</p>
      </Card>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header + Summary */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
            Loan Portfolio
          </h2>
          <p className="text-muted-foreground mt-1">
            {activeLoans} active loan{activeLoans !== 1 ? "s" : ""}
            {activeLoans > 0 &&
              ` • ₦${totalOutstanding.toLocaleString()} outstanding`}
          </p>
        </div>

        {/* Optional: Add new loan button (if your system allows admins to initiate loans from here) */}
        {/* <Button variant="outline" size="sm">
          <Plus className="w-4 h-4 mr-2" />
          New Loan
        </Button> */}
      </div>

      {loans.length === 0 ? (
        <EmptyLoansState />
      ) : (
        <div className="grid gap-6">
          {loans.map((loan) => (
            <LoanCard key={loan.id} loan={loan} />
          ))}
        </div>
      )}
    </div>
  );
}

function LoanCard({ loan }: { loan: Loan }) {
  const repaidAmount = Number(loan.amount) - Number(loan.outstanding_balance);
  const progress =
    Number(loan.amount) > 0 ? (repaidAmount / Number(loan.amount)) * 100 : 0;

  const statusConfig = {
    active: {
      color: "bg-emerald-100 text-emerald-800 border-emerald-200",
      icon: Clock,
    },
    paid: {
      color: "bg-blue-100 text-blue-800 border-blue-200",
      icon: CheckCircle2,
    },
    overdue: {
      color: "bg-amber-100 text-amber-800 border-amber-200",
      icon: AlertCircle,
    },
    defaulted: { color: "bg-red-100 text-red-800 border-red-200", icon: Ban },
    pending: {
      color: "bg-purple-100 text-purple-800 border-purple-200",
      icon: Calendar,
    },
  };

  const statusStyle = statusConfig[
    loan.status as keyof typeof statusConfig
  ] || {
    color: "bg-gray-100 text-gray-800 border-gray-200",
    icon: CreditCard,
  };

  const StatusIcon = statusStyle.icon;

  return (
    <Card className="overflow-hidden border shadow-sm hover:shadow-md transition-shadow">
      <div className="p-6 md:p-7">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Landmark className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Loan #{loan.reference}
                </h3>
                <p className="text-sm text-muted-foreground mt-0.5">
                  {loan.purpose || "General Purpose"}
                </p>
              </div>
            </div>
          </div>

          <Badge
            variant="outline"
            className={cn(
              "text-sm font-medium px-4 py-1.5 border",
              statusStyle.color
            )}
          >
            <StatusIcon className="w-3.5 h-3.5 mr-1.5" />
            {loan.status.toUpperCase()}
          </Badge>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-7">
          <StatItem
            icon={DollarSign}
            label="Principal"
            value={`₦${Number(loan.amount).toLocaleString()}`}
            valueClass="text-emerald-700"
          />
          <StatItem
            icon={AlertCircle}
            label="Outstanding"
            value={`₦${Number(loan.outstanding_balance).toLocaleString()}`}
            valueClass="text-amber-700 font-semibold"
          />
          <StatItem
            icon={Calendar}
            label="Monthly"
            value={
              loan.monthly_repayment
                ? `₦${Number(loan.monthly_repayment).toLocaleString()}`
                : "—"
            }
          />
          <StatItem
            icon={Clock}
            label="Next Due"
            value={
              loan.next_payment_due
                ? format(new Date(loan.next_payment_due), "dd MMM yyyy")
                : "—"
            }
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Repayment Progress</span>
            <span className="font-medium">{Math.round(progress)}%</span>
          </div>
          <Progress
            value={progress}
            className="h-3"
            indicatorClassName={
              progress === 100 ? "bg-emerald-600" : "bg-primary"
            }
          />
        </div>
      </div>
    </Card>
  );
}

function StatItem({
  icon: Icon,
  label,
  value,
  valueClass = "",
}: {
  icon: any;
  label: string;
  value: string;
  valueClass?: string;
}) {
  return (
    <div className="text-center p-4 bg-muted/40 rounded-lg">
      <Icon className="w-5 h-5 mx-auto mb-2 text-muted-foreground" />
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className={cn("text-lg font-semibold mt-1", valueClass)}>{value}</p>
    </div>
  );
}

function EmptyLoansState() {
  return (
    <Card className="p-12 md:p-16 text-center border-dashed">
      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted/50 mb-6">
        <Landmark className="w-10 h-10 text-muted-foreground" />
      </div>
      <h3 className="text-2xl font-semibold mb-3">No Loans Yet</h3>
      <p className="text-muted-foreground max-w-md mx-auto mb-6">
        This member has a clean credit record with no active or previous loans.
      </p>
      {/* <Button variant="outline">
        View Loan Products
      </Button> */}
    </Card>
  );
}

function LoansTabSkeleton() {
  return (
    <div className="space-y-8">
      <Skeleton className="h-10 w-64" />
      <div className="space-y-6">
        {[...Array(2)].map((_, i) => (
          <Card key={i} className="p-7">
            <div className="flex justify-between items-start mb-6">
              <div className="space-y-3">
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-5 w-64" />
              </div>
              <Skeleton className="h-8 w-24 rounded-full" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-8">
              {[...Array(4)].map((_, j) => (
                <div key={j} className="text-center space-y-3">
                  <Skeleton className="h-5 w-16 mx-auto" />
                  <Skeleton className="h-8 w-32 mx-auto" />
                </div>
              ))}
            </div>
            <Skeleton className="h-4 w-full" />
          </Card>
        ))}
      </div>
    </div>
  );
}
