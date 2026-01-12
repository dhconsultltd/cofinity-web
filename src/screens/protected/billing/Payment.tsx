"use client";

import { useEffect, useState } from "react";
import {
  CheckCircle2,
  XCircle,
  Loader2,
  ArrowRight,
  RefreshCw,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { apiClient } from "@/lib/api-client";
import { toast } from "sonner";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function BillingStatusPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const status = searchParams.get("status") || "processing";
  const reference = searchParams.get("ref") || "";

  const [currentStatus, setCurrentStatus] = useState<
    "processing" | "success" | "failed" | "pending"
  >(status as any);
  const [isPolling, setIsPolling] = useState(
    status === "processing" || status === "pending"
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  //if no ref and status, redirect to billing page
  useEffect(() => {
    if (reference == null || reference === "") {
      toast.error("Invalid payment reference. Redirecting to billing page.");
      navigate("/billing");
    }
  }, [reference, status, navigate]);

  // Poll backend for real status (especially useful when callback redirect is unreliable)
  useEffect(() => {
    if (!reference || !isPolling) return;

    const checkStatus = async () => {
      try {
        const res = await apiClient.get(
          `/api/billing/payment-status?ref=${reference}`
        );

        if (!res.success) throw new Error(res.message || "Status check failed");

        const { paymentStatus } = res.data;

        if (paymentStatus === "success") {
          setCurrentStatus("success");
          setIsPolling(false);
          toast.success("Payment completed successfully!");
        } else if (paymentStatus === "failed") {
          setCurrentStatus("failed");
          setIsPolling(false);
          setErrorMessage(res.data.message || "Payment failed");
        }
        // pending/processing → keep polling
      } catch (err: any) {
        console.error("Status poll error:", err);
        setErrorMessage(err.message || "Could not check payment status");
      }
    };

    checkStatus(); // First check immediately

    const interval = setInterval(checkStatus, 5000); // Every 5 seconds

    return () => clearInterval(interval);
  }, [reference, isPolling]);

  const handleRetry = () => {
    navigate("/billing"); // or wherever user can retry
  };

  const handleBackToDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <Card className="w-full max-w-lg shadow-none">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4">
            {currentStatus === "success" && (
              <div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                <CheckCircle2 className="h-12 w-12 text-green-600" />
              </div>
            )}
            {currentStatus === "failed" && (
              <div className="h-20 w-20 rounded-full bg-red-100 flex items-center justify-center mx-auto">
                <XCircle className="h-12 w-12 text-red-600" />
              </div>
            )}
            {(currentStatus === "processing" ||
              currentStatus === "pending") && (
              <div className="h-20 w-20 rounded-full bg-blue-100 flex items-center justify-center mx-auto animate-pulse">
                <Loader2 className="h-12 w-12 text-blue-600 animate-spin" />
              </div>
            )}
          </div>

          <CardTitle className="text-2xl font-bold">
            {currentStatus === "success" && "Payment Successful!"}
            {currentStatus === "failed" && "Payment Failed"}
            {(currentStatus === "processing" || currentStatus === "pending") &&
              "Processing Payment..."}
          </CardTitle>

          <CardDescription className="mt-2 text-base">
            {currentStatus === "success" &&
              "Your subscription has been activated/renewed successfully."}
            {currentStatus === "failed" &&
              "There was an issue processing your payment."}
            {(currentStatus === "processing" || currentStatus === "pending") &&
              "Please wait while we confirm your payment. This may take a few moments..."}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6 text-center">
          {errorMessage && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Attention</AlertTitle>
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}

          {currentStatus === "success" && (
            <div className="space-y-4">
              <p className="text-muted-foreground">
                You now have full access to all features of your plan.
              </p>
              <Button
                size="lg"
                onClick={handleBackToDashboard}
                className="w-full sm:w-auto"
              >
                Go to Dashboard
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          )}

          {currentStatus === "failed" && (
            <div className="space-y-4">
              <p className="text-muted-foreground">
                Your payment was not successful. Please try again or use a
                different payment method.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="outline" onClick={handleRetry}>
                  Try Again
                  <RefreshCw className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="default" onClick={handleBackToDashboard}>
                  Back to Dashboard
                </Button>
              </div>
            </div>
          )}

          {(currentStatus === "processing" || currentStatus === "pending") && (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Do not close this page. We're confirming your payment with our
                provider.
              </p>
              <Button
                variant="outline"
                onClick={() => window.location.reload()}
              >
                Refresh Status
                <RefreshCw className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
