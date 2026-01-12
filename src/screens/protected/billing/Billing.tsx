"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import {
  Shield,
  Clock,
  History,
  RefreshCw,
  Eye,
  Download,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  AlertTriangle,
  Wallet,
  CreditCard,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
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
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { apiClient } from "@/lib/api-client";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface BillingData {
  subscriptionStatus: "active" | "expired" | "canceled" | "none";
  currentPlan?: {
    id: string;
    name: string;
    formattedPrice: string;
    billingCycle: string;
    billingPeriod: string; // e.g., "Month", "Year"
    status: string;
    nextBillingDate?: string;
    subscriptionStart: string;
    subscriptionEnd: string;
    lastPayment: number;
    lastPaymentDate: string;
    overdueDays?: number;
  };
  usage: {
    members: { used: number; limit: number | string };
    admins: { used: number; limit: number | string };
    [key: string]: any;
  };
  invoices: Array<{
    id: string;
    date: string;
    amount: number;
    status: "paid" | "failed" | "void";
    description: string;
    dueDate: string;
    items: Array<{
      description: string;
      quantity: number;
      unitPrice: number;
      total: number;
    }>;
  }>;
  upcomingInvoice?: {
    id: string;
    amount: number;
    formattedPrice: string;
    billingPeriod: string;
    dueDate: string;
    description: string;
    items: Array<{
      description: string;
      quantity: number;
      unitPrice: number;
      total: number;
    }>;
  } | null;
}

export default function BillingPage() {
  const router = useNavigate();
  const [data, setData] = useState<BillingData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [renewDialogOpen, setRenewDialogOpen] = useState(false);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    const fetchBillingData = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get("/api/billing/overview");

        if (!response.success) {
          throw new Error(
            response.message || "Failed to load billing information"
          );
        }

        setData(response.data);
      } catch (err: any) {
        console.error("Billing fetch error:", err);
        setError(err.message || "Could not load billing information");
        toast.error("Failed to load billing data");
      } finally {
        setLoading(false);
      }
    };

    fetchBillingData();
  }, []);

  const handleChooseNewPlan = () => {
    router("/billing/upgrade"); // Your plan selection page
  };

  const handleRenew = async (method: "wallet" | "card") => {
    if (!data?.currentPlan) return;

    setProcessing(true);
    try {
      toast.loading(`Processing renewal via ${method}...`, {
        id: "renew-toast",
      });

      const response = await apiClient.post("/api/billing/renew", {
        payment_method: method,
        billing_cycle: data.currentPlan.billingCycle,
        plan_id: data.currentPlan.id,
      });

      console.log(response);

      toast.dismiss("renew-toast");

      if (!response.success)
        throw new Error(response.message || "Renewal failed");

      if (response.data.payment_url) {
        //add a 5 sec delay before redireting
        toast.success("Redirecting to payment gateway...");
        await new Promise((resolve) => setTimeout(resolve, 2000));
        window.location.href = response.data.payment_url;
        return;
      }

      toast.success("Subscription renewed successfully! 🎉");

      setRenewDialogOpen(false);
      window.location.reload();
    } catch (err: any) {
      toast.error(err.message || "Renewal failed");
    } finally {
      toast.dismiss("renew-toast");
      setProcessing(false);
    }
  };

  const formatCurrency = (amount: number) => `₦${amount.toLocaleString()}`;

  if (loading) {
    return (
      <div className="p-6 space-y-8">
        <Skeleton className="h-10 w-64" />
        <div className="grid gap-6">
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-96 w-full" />
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="p-6">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {error || "Failed to load billing information"}
          </AlertDescription>
        </Alert>
        <Button className="mt-4" onClick={() => window.location.reload()}>
          Retry
        </Button>
      </div>
    );
  }

  const { subscriptionStatus, currentPlan, upcomingInvoice } = data;
  const isActive = subscriptionStatus === "active";
  const isExpired =
    subscriptionStatus === "expired" || subscriptionStatus === "canceled";

  // Renewal preview – use upcomingInvoice if active, otherwise fall back to currentPlan
  const renewalAmount =
    upcomingInvoice?.amount ?? currentPlan?.lastPayment ?? 0;
  const renewalFormatted =
    upcomingInvoice?.formattedPrice ?? currentPlan?.formattedPrice ?? "";
  const renewalPeriod =
    upcomingInvoice?.billingPeriod ??
    currentPlan?.billingPeriod ??
    currentPlan?.billingCycle ??
    "";
  const renewalDescription =
    upcomingInvoice?.description ?? `${currentPlan?.name} Plan Renewal`;

  return (
    <div className="p-6 space-y-8 bg-gray-50 min-h-screen">
      <div>
        <h1 className="text-3xl font-bold">Billing & Subscription</h1>
        <p className="text-muted-foreground mt-1">
          Manage your cooperative's plan, view invoices, and payment history
        </p>
      </div>

      {/* Expired / Canceled Banner */}
      {isExpired && currentPlan && (
        <Alert variant="destructive" className="border-red-200 bg-red-50">
          <AlertTriangle className="h-5 w-5" />
          <AlertTitle className="text-lg font-semibold">
            Your subscription has{" "}
            {subscriptionStatus === "expired" ? "expired" : "been canceled"}
          </AlertTitle>
          <AlertDescription className="mt-3 space-y-4">
            <p>
              Access ended on{" "}
              <strong>
                {format(new Date(currentPlan.subscriptionEnd), "dd MMMM yyyy")}
              </strong>
              {currentPlan.overdueDays
                ? ` (${currentPlan.overdueDays} days ago)`
                : ""}
              .
            </p>
            <div className="flex flex-wrap gap-3">
              <Dialog open={renewDialogOpen} onOpenChange={setRenewDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Renew Same Plan
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Renew {currentPlan.name} Plan</DialogTitle>
                    <DialogDescription>
                      {renewalDescription}
                      <br />
                      <strong className="text-xl">
                        {renewalFormatted} per {renewalPeriod}
                      </strong>
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <Button
                      className="w-full"
                      variant="outline"
                      disabled={processing}
                      onClick={() => handleRenew("wallet")}
                    >
                      <Wallet className="mr-2 h-5 w-5" />
                      Pay from Wallet
                    </Button>
                    <Button
                      className="w-full"
                      disabled={processing}
                      onClick={() => handleRenew("card")}
                    >
                      <CreditCard className="mr-2 h-5 w-5" />
                      Pay with Card | Bank Transfer | USSD
                    </Button>
                  </div>
                  <DialogFooter className="text-sm text-muted-foreground">
                    Wallet payments are instant. Card payments are processed
                    securely via Nomba.
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Button variant="default" onClick={handleChooseNewPlan}>
                Choose New Plan / Upgrade
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* No Subscription Ever */}
      {subscriptionStatus === "none" && (
        <Alert>
          <AlertCircle className="h-5 w-5" />
          <AlertTitle>No Active Plan</AlertTitle>
          <AlertDescription className="mt-3">
            Get started by choosing a plan.
            <Button onClick={handleChooseNewPlan} className="ml-4">
              Choose Plan
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {/* Current / Previous Plan Card */}
      {currentPlan && (
        <Card className={!isActive ? "opacity-75" : ""}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              {isActive ? "Current Plan" : "Previous Plan"}
            </CardTitle>
            <CardDescription>
              {isActive
                ? `Your cooperative is on the ${currentPlan.name} plan`
                : `Your last plan was ${currentPlan.name}`}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="text-sm text-muted-foreground">Plan</p>
                <p className="text-2xl font-bold flex items-center gap-2">
                  {currentPlan.name}
                  <Badge variant={isActive ? "default" : "secondary"}>
                    {isActive ? "Active" : "Expired"}
                  </Badge>
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Billing Cycle</p>
                <p className="text-lg font-medium capitalize">
                  {currentPlan.billingPeriod || currentPlan.billingCycle}
                </p>
                {isActive && currentPlan.nextBillingDate && (
                  <p className="text-sm text-muted-foreground mt-1">
                    Next billing:{" "}
                    {format(
                      new Date(currentPlan.nextBillingDate),
                      "dd MMM yyyy"
                    )}
                  </p>
                )}
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Price</p>
                <p className="text-2xl font-bold">
                  {currentPlan.formattedPrice} per{" "}
                  {currentPlan.billingPeriod || currentPlan.billingCycle}
                </p>
              </div>
            </div>

            <div className="pt-6 border-t">
              <h3 className="font-semibold mb-4">Subscription Details</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
                <div>
                  <p className="text-muted-foreground">Start Date</p>
                  <p className="font-medium">
                    {format(
                      new Date(currentPlan.subscriptionStart),
                      "dd MMM yyyy"
                    )}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Period Ended</p>
                  <p className="font-medium">
                    {format(
                      new Date(currentPlan.subscriptionEnd),
                      "dd MMM yyyy"
                    )}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Last Payment</p>
                  <p className="font-medium">
                    {formatCurrency(currentPlan.lastPayment)}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Last Paid</p>
                  <p className="font-medium">
                    {format(
                      new Date(currentPlan.lastPaymentDate),
                      "dd MMM yyyy"
                    )}
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons – shown when active */}
            {isActive && (
              <div className="flex flex-wrap gap-4 pt-6 border-t">
                <Dialog
                  open={renewDialogOpen}
                  onOpenChange={setRenewDialogOpen}
                >
                  <DialogTrigger asChild>
                    <Button variant="default">
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Renew Same Plan
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Renew {currentPlan.name} Plan</DialogTitle>
                      <DialogDescription>
                        {renewalDescription}
                        <br />
                        <strong className="text-xl">
                          {renewalFormatted} per {renewalPeriod}
                        </strong>
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <Button
                        className="w-full"
                        variant="outline"
                        disabled={processing}
                        onClick={() => handleRenew("wallet")}
                      >
                        <Wallet className="mr-2 h-5 w-5" />
                        Pay from Wallet
                      </Button>
                      <Button
                        className="w-full"
                        disabled={processing}
                        onClick={() => handleRenew("card")}
                      >
                        <CreditCard className="mr-2 h-5 w-5" />
                        Pay with Card
                      </Button>
                    </div>
                    <DialogFooter className="text-sm text-muted-foreground">
                      Wallet payments are instant. Card payments are processed
                      securely via Nomba.
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <Button variant="outline" onClick={handleChooseNewPlan}>
                  Choose New Plan / Upgrade
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Upcoming Invoice Alert (only for active) */}
      {isActive && upcomingInvoice && (
        <Alert>
          <Clock className="h-4 w-4" />
          <AlertTitle>Upcoming Renewal</AlertTitle>
          <AlertDescription className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              Next invoice <strong>{upcomingInvoice.id}</strong> for{" "}
              <strong>
                {upcomingInvoice.formattedPrice} per{" "}
                {upcomingInvoice.billingPeriod}
              </strong>{" "}
              due on {format(new Date(upcomingInvoice.dueDate), "dd MMMM yyyy")}
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="link" className="px-0">
                  View Preview →
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>
                    Invoice Preview – {upcomingInvoice.id}
                  </DialogTitle>
                  <DialogDescription>
                    Due{" "}
                    {format(new Date(upcomingInvoice.dueDate), "dd MMMM yyyy")}
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-6">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Description</TableHead>
                        <TableHead className="text-right">Qty</TableHead>
                        <TableHead className="text-right">Unit Price</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {upcomingInvoice.items.map((item, i) => (
                        <TableRow key={i}>
                          <TableCell>{item.description}</TableCell>
                          <TableCell className="text-right">
                            {item.quantity}
                          </TableCell>
                          <TableCell className="text-right">
                            {formatCurrency(item.unitPrice)}
                          </TableCell>
                          <TableCell className="text-right">
                            {formatCurrency(item.total)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <div className="flex justify-end gap-3">
                    <Button variant="outline">
                      <Download className="mr-2 h-4 w-4" />
                      Download PDF
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </AlertDescription>
        </Alert>
      )}

      {/* Payment History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="h-5 w-5" />
            Payment History
          </CardTitle>
          <CardDescription>
            View your past invoices and payment records
          </CardDescription>
        </CardHeader>
        <CardContent>
          {data.invoices.length === 0 ? (
            <div className="text-center py-10 text-muted-foreground">
              No payment history available yet
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.invoices.map((inv) => (
                  <TableRow key={inv.id}>
                    <TableCell className="font-medium">{inv.id}</TableCell>
                    <TableCell>
                      {format(new Date(inv.date), "dd MMM yyyy")}
                    </TableCell>
                    <TableCell>{inv.description}</TableCell>
                    <TableCell>{formatCurrency(inv.amount)}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          inv.status === "paid" ? "default" : "secondary"
                        }
                      >
                        {inv.status === "paid" && (
                          <CheckCircle2 className="mr-1 h-3 w-3" />
                        )}
                        {inv.status.charAt(0).toUpperCase() +
                          inv.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <Eye className="mr-1 h-4 w-4" />
                            View
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Invoice – {inv.id}</DialogTitle>
                            <DialogDescription>
                              Issued{" "}
                              {format(new Date(inv.date), "dd MMMM yyyy")}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-6">
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Description</TableHead>
                                  <TableHead className="text-right">
                                    Qty
                                  </TableHead>
                                  <TableHead className="text-right">
                                    Unit Price
                                  </TableHead>
                                  <TableHead className="text-right">
                                    Total
                                  </TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {inv.items.map((item, i) => (
                                  <TableRow key={i}>
                                    <TableCell>{item.description}</TableCell>
                                    <TableCell className="text-right">
                                      {item.quantity}
                                    </TableCell>
                                    <TableCell className="text-right">
                                      {formatCurrency(item.unitPrice)}
                                    </TableCell>
                                    <TableCell className="text-right">
                                      {formatCurrency(item.total)}
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                            <div className="flex justify-end">
                              <Button variant="outline">
                                <Download className="mr-2 h-4 w-4" />
                                Download PDF
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
