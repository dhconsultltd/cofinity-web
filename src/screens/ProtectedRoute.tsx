// src/components/ProtectedRoute.tsx
import React, { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { getData } from "@/lib/storageHelper";
import { Skeleton } from "@/components/ui/skeleton";
import apiClient from "@/lib/api-client";
import { TENANT_API } from "@/constants";

type Props = {
  children: React.ReactNode;
  requireCooperative?: boolean;
  redirectTo?: string;
};

export default function ProtectedRoute({
  children,
  requireCooperative = true,
  redirectTo = "/login",
}: Props) {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [isCheckingCoop, setIsCheckingCoop] = useState(true);
  const [isCoopActive, setIsCoopActive] = useState<boolean | null>(null);

  // Get locally saved cooperative ID
  const localCoopId = getData<string | number>("selected_cooperative_id");

  useEffect(() => {
    const checkCooperativeStatus = async () => {
      if (!requireCooperative || !isAuthenticated || !localCoopId) {
        setIsCheckingCoop(false);
        return;
      }

      try {
        // Call your backend to verify this cooperative is active and belongs to user
        const response = await apiClient.post(TENANT_API.SWITCH, { tenant_id: localCoopId });

        if (response.success && response.data?.is_active) {
          setIsCoopActive(true);
        } else {
          // Invalid or inactive → force re-selection
          localStorage.removeItem("selected_cooperative_id");
          setIsCoopActive(false);
        }
      } catch (error) {
        console.warn("Failed to verify cooperative status:", error);
        // Optional: fallback to local if API down
        setIsCoopActive(true);
      } finally {
        setIsCheckingCoop(false);
      }
    };

    if (!authLoading) {
      checkCooperativeStatus();
    }
  }, [isAuthenticated, authLoading, localCoopId, requireCooperative]);

  // 1. Still loading auth
  if (authLoading || (requireCooperative && isCheckingCoop)) {
    return <ProtectedRouteSkeleton />;
  }

  // 2. Not authenticated
  if (!isAuthenticated) {
    return null //<Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // 3. Needs cooperative but none selected or invalid
  if (requireCooperative && (!localCoopId || isCoopActive === false)) {
    return <Navigate to="/cooperative-selection" replace />;
  }

  // 4. All good!
  return <>{children}</>;
}

// Beautiful skeleton while loading
function ProtectedRouteSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">
      {/* Mobile Top Bar Skeleton */}
      <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-4 flex items-center justify-between">
        <Skeleton className="h-9 w-9 rounded-full" />
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-9 w-9 rounded-full" />
      </div>

      {/* Sidebar - Hidden on mobile, visible on lg+ */}
      <aside className="hidden lg:block w-64 bg-white border-r border-gray-200 p-6 space-y-8">
        {/* Logo */}
        <Skeleton className="h-10 w-40 mx-auto" />

        {/* Nav Items */}
        <nav className="space-y-2">
          {[...Array(7)].map((_, i) => (
            <Skeleton key={i} className="h-11 w-full rounded-lg" />
          ))}
        </nav>

        {/* Logout button */}
        <Skeleton className="h-11 w-full rounded-lg mt-auto" />
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 lg:p-8 overflow-hidden">
        {/* Page Title */}
        <Skeleton className="h-10 w-64 mb-8 rounded-lg" />

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-32 rounded-xl" />
          ))}
        </div>

        {/* Table / Chart Area */}
        <div className="space-y-6">
          <Skeleton className="h-96 w-full rounded-xl" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Skeleton className="h-64 rounded-xl" />
            <Skeleton className="h-64 rounded-xl" />
          </div>
        </div>
      </main>

       
    </div>
  );
}