import React, { type JSX } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { getData } from "@/lib/storageHelper";

type Props = {
  children: JSX.Element;
  requireCooperative?: boolean; // default: true
  redirectTo?: string;
};

export default function ProtectedRoute({
  children,
  requireCooperative = true,
  redirectTo = "/login",
}: Props) {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();
  const router = useNavigate();

  if (isLoading) return null; // or return a spinner

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }






    if (requireCooperative) {
    // check server state first, then local persisted selection
  

    const localSelected = getData<number | string>("selected_cooperative_id");
 
    console.log(localSelected); 

    if (  localSelected  == null) {
      router('/cooperative-selection')
      return ;
    }


 
  }

  return children;
}