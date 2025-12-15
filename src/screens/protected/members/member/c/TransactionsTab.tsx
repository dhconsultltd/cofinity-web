import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import {
  ArrowDownRight,
  ArrowUpRight,
  CreditCard,
  AlertCircle,
  Download,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { apiClient } from "@/lib/api-client";
import { MEMBERS_API } from "@/constants";

export default function TransactionsTab({ memberId }: { memberId: number }) {
  const { data, isLoading } = useQuery({
    queryKey: ["transactions", memberId],
    queryFn: async () => {
      const res = await apiClient.get(MEMBERS_API.TRANSACTIONS(memberId));
      return res.data;
    },
  });

  const transactions = data?.data || [];

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-10 w-64 bg-neutral-200 rounded-lg animate-pulse" />
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="h-20 bg-neutral-100 rounded-xl animate-pulse"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
        {/* Title + Subtitle */}
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 tracking-tight">
            Transaction History
          </h2>
          <p className="text-sm md:text-base text-neutral-600">
            All financial activities
          </p>
        </div>

        {/* Total + Button (Always one row) */}
        <div className="flex items-center sm:gap-3 justify-between">
          <Badge
            variant="outline"
            className="text-sm md:text-base px-4 py-2 border-neutral-400 whitespace-nowrap"
          >
            {transactions.length} Total
          </Badge>

          {/* not functioning yet */}
          <button
            // onClick={exportPDF}
            className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-neutral-900 shadow-lg transition-all text-sm md:text-base whitespace-nowrap"
          >
            <Download className="w-4 h-4" />
            Export PDF
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {transactions.length === 0 ? (
          <Card className="p-16 text-center border-dashed">
            <CreditCard className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
            <p className="text-neutral-600">No transactions yet</p>
          </Card>
        ) : (
          transactions.map((txn: any) => (
            <Card
              key={txn.id}
              className={`p-6 transition-all hover:shadow-none ${
                txn.type.includes("deposit")
                  ? "border-l-4 border-l-emerald-500"
                  : txn.type.includes("withdrawal")
                  ? "border-l-4 border-l-red-500"
                  : "border-l-4 border-l-blue-500"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-5">
                  <div
                    className={`w-14 h-14 rounded-full flex items-center justify-center ${
                      txn.type.includes("deposit")
                        ? "bg-emerald-100"
                        : txn.type.includes("withdrawal")
                        ? "bg-red-100"
                        : "bg-blue-100"
                    }`}
                  >
                    {txn.type.includes("deposit") ||
                    txn.type === "membership_fee" ? (
                      <ArrowDownRight className="w-8 h-8 text-emerald-600" />
                    ) : txn.type.includes("withdrawal") ? (
                      <ArrowUpRight className="w-8 h-8 text-red-600" />
                    ) : (
                      <CreditCard className="w-8 h-8 text-blue-600" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">
                      {txn.type.replace(/_/g, " ").toUpperCase()}
                    </h3>
                    <p className="text-neutral-600">{txn.reference}</p>
                    <p className="text-sm text-neutral-500">
                      {format(
                        new Date(txn.recorded_at),
                        "dd MMM yyyy 'at' hh:mm a"
                      )}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <p
                    className={`text-2xl font-bold ${
                      txn.type.includes("deposit")
                        ? "text-emerald-600"
                        : txn.type.includes("withdrawal")
                        ? "text-red-600"
                        : "text-blue-600"
                    }`}
                  >
                    {txn.type.includes("withdrawal") ? "- " : "+ "}₦
                    {Number(txn.amount).toLocaleString()}
                  </p>
                  <Badge
                    variant={
                      txn.status === "completed" ? "default" : "secondary"
                    }
                    className="mt-2"
                  >
                    {txn.status}
                  </Badge>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
