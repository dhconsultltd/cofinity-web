// src/pages/ViewMember.tsx
"use client";

import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import {
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Shield,
  Building2,
  CreditCard,
  FileText,
  MessageCircle,
  Edit3,
  ArrowLeft,
  Landmark,
  IdCard,
  Home,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { apiClient } from "@/lib/api-client";

import MemberDetailsSkeleton from "@/screens/Components/skeletons/MemberDetailsSkeleton";
import TransactionsSkeleton from "@/screens/Components/skeletons/TransactionsSkeleton";
import LoansSkeleton from "@/screens/Components/skeletons/LoansSkeleton";
import KYCSkeleton from "@/screens/Components/skeletons/KYCSkeleton";
import BankSkeleton from "@/screens/Components/skeletons/BankSkeleton";
import NextOfKinSkeleton from "@/screens/Components/skeletons/NextOfKinSkeleton";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { MEMBERS_API } from "@/constants";

// Lazy load tab content
const MemberDetails = React.lazy(
  () => import("@/screens/protected/members/member/c/MemberDetails")
);
const AccountOverview = React.lazy(
  () => import("@/screens/protected/members/member/c/AccountOverview")
);
const TransactionsTab = React.lazy(
  () => import("@/screens/protected/members/member/c/TransactionsTab")
);
const LoansTab = React.lazy(
  () => import("@/screens/protected/members/member/c/LoansTab")
);
const KYCDocuments = React.lazy(
  () => import("@/screens/protected/members/member/c/KYCDocuments")
);
const Bank = React.lazy(
  () => import("@/screens/protected/members/member/c/Bank")
);
const NextOfKin = React.lazy(
  () => import("@/screens/protected/members/member/c/NextOfKin")
);
const SendEmail = React.lazy(
  () => import("@/screens/protected/members/member/c/SendEmail")
);
const SendSMS = React.lazy(
  () => import("@/screens/protected/members/member/c/SendSMS")
);
const EditMember = React.lazy(
  () => import("@/screens/protected/members/member/c/EditMember")
);

export default function ViewMember() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: member, isLoading } = useQuery({
    queryKey: ["member", id],
    queryFn: async () => {
      const res = await apiClient.get(MEMBERS_API.SHOW(Number(id)));
      return res.data;
    },
  });

  // Local state that we will mutate when KYC changes
  const [memberData, setMemberData] = useState<any>(null);
  const [profilePreviewOpen, setProfilePreviewOpen] = useState(false);

  useEffect(() => {
    // initialize local copy when query returns
    if (member) setMemberData(member);
  }, [member]);

  if (isLoading || !memberData) {
    return (
      <div className="min-h-screen bg-neutral-50 p-6">
        <div className="mx-auto">
          <Skeleton className="h-12 w-64 mb-6" />
          <div className="bg-white rounded-2xl shadow-sm p-8">
            <div className="flex items-center gap-6 mb-8">
              <Skeleton className="w-32 h-32 rounded-full" />
              <div>
                <Skeleton className="h-8 w-64 mb-2" />
                <Skeleton className="h-5 w-40" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!memberData) {
    return <div className="p-8 text-center text-red-600">Member not found</div>;
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* HEADER - FULL WIDTH */}
      <header className="w-full bg-gradient-to-r from-black to-gray-800 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
          {/* Back Button */}
          <Button
            variant="ghost"
            size="icon"
            className="mb-6 text-white hover:bg-white/20"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>

          {/* Profile Section */}
          <div className="flex flex-col md:flex-row md:items-end gap-6 md:gap-10">
            {/* Profile Image + Status */}
            <div className="relative mx-auto md:mx-0">
              {/* clickable profile image */}
              <img
                src={memberData.passport_photo || "/placeholder-user.png"}
                alt="Profile"
                onClick={() => {
                  if (memberData.passport_photo) setProfilePreviewOpen(true);
                }}
                className={`w-28 h-28 sm:w-32 sm:h-32 object-cover border-4 border-white rounded-full shadow-xl cursor-pointer ${
                  memberData.passport_photo ? "hover:opacity-90" : "bg-gray-300"
                }`}
              />
              <Badge className="absolute bottom-0 right-0" variant="default">
                {memberData.status}
              </Badge>
            </div>

            {/* Name + Info */}
            <div className="text-center md:text-left">
              <h1 className="text-3xl sm:text-4xl font-bold">
                {memberData.first_name} {memberData.last_name}
              </h1>
              <p className="text-lg opacity-90">
                ID: {memberData.membership_id}
              </p>

              <div className="flex flex-wrap justify-center md:justify-start items-center gap-3 mt-3">
                <Badge
                  variant={
                    memberData.bvn_verified || memberData.nin_verified
                      ? "default"
                      : "secondary"
                  }
                >
                  {memberData.bvn_verified || memberData.nin_verified
                    ? "KYC Verified"
                    : "KYC Pending"}
                </Badge>

                {memberData.branch && (
                  <Badge variant="outline" className="text-white border-white">
                    <Building2 className="w-3 h-3 mr-1" />
                    {memberData.branch.name}
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className=" mx-auto px-6 -m-6">
        <Tabs defaultValue="details" className="w-full">
          <TabsList className="grid grid-cols-5 w-full h-auto p-1 bg-white rounded-xl shadow-lg">
            {/* ... your TabsTrigger elements unchanged ... */}
            <TabsTrigger
              value="details"
              className="flex flex-col items-center gap-1 text-[10px] sm:text-xs lg:text-sm"
            >
              <User className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>Details</span>
            </TabsTrigger>
            <TabsTrigger
              value="overview"
              className="flex flex-col items-center gap-1 text-[10px] sm:text-xs lg:text-sm"
            >
              <CreditCard className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger
              value="transactions"
              className="flex flex-col items-center gap-1 text-[10px] sm:text-xs lg:text-sm"
            >
              <FileText className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>Transactions</span>
            </TabsTrigger>
            <TabsTrigger
              value="loans"
              className="flex flex-col items-center gap-1 text-[10px] sm:text-xs lg:text-sm"
            >
              <Landmark className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>Loans</span>
            </TabsTrigger>
            <TabsTrigger
              value="kyc"
              className="flex flex-col items-center gap-1 text-[10px] sm:text-xs lg:text-sm"
            >
              <IdCard className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>KYC Docs</span>
            </TabsTrigger>
            <TabsTrigger
              value="bank"
              className="flex flex-col items-center gap-1 text-[10px] sm:text-xs lg:text-sm"
            >
              <Landmark className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>Bank</span>
            </TabsTrigger>
            <TabsTrigger
              value="nextofkin"
              className="flex flex-col items-center gap-1 text-[10px] sm:text-xs lg:text-sm"
            >
              <User className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>Next of Kin</span>
            </TabsTrigger>
            <TabsTrigger
              value="email"
              className="flex flex-col items-center gap-1 text-[10px] sm:text-xs lg:text-sm"
            >
              <Mail className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>Email</span>
            </TabsTrigger>
            <TabsTrigger
              value="sms"
              className="flex flex-col items-center gap-1 text-[10px] sm:text-xs lg:text-sm"
            >
              <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>SMS</span>
            </TabsTrigger>
            <TabsTrigger
              value="edit"
              className="flex flex-col items-center gap-1 text-[10px] sm:text-xs lg:text-sm"
            >
              <Edit3 className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>Edit</span>
            </TabsTrigger>
          </TabsList>

          <div className=" bg-white mt-2  p-6 min-h-screen">
            <React.Suspense fallback={<MemberDetailsSkeleton />}>
              <TabsContent value="details">
                <MemberDetails member={memberData} />
              </TabsContent>
            </React.Suspense>

            <React.Suspense
              fallback={
                <div className="space-y-4">
                  <Skeleton className="h-32 w-full" />
                  <Skeleton className="h-32 w-full" />
                </div>
              }
            >
              <TabsContent value="overview">
                <AccountOverview member={memberData} />
              </TabsContent>
            </React.Suspense>

            <React.Suspense fallback={<TransactionsSkeleton />}>
              <TabsContent value="transactions">
                <TransactionsTab memberId={memberData.id} />
              </TabsContent>
            </React.Suspense>

            <React.Suspense fallback={<LoansSkeleton />}>
              <TabsContent value="loans">
                <LoansTab memberId={memberData.id} />
              </TabsContent>
            </React.Suspense>

            <React.Suspense fallback={<KYCSkeleton />}>
              <TabsContent value="kyc">
                {/* <-- PASS setMemberData to KYCDocuments so it can update parent state */}
                <KYCDocuments
                  member={memberData}
                  onUpdateMember={setMemberData}
                />
              </TabsContent>
            </React.Suspense>

            <React.Suspense fallback={<BankSkeleton />}>
              <TabsContent value="bank">
                <Bank />
              </TabsContent>
            </React.Suspense>

            <React.Suspense fallback={<NextOfKinSkeleton />}>
              <TabsContent value="nextofkin">
                <NextOfKin />
              </TabsContent>
            </React.Suspense>

            <React.Suspense
              fallback={
                <div className="text-center p-12">
                  <Skeleton className="h-64 w-full mx-auto" />
                </div>
              }
            >
              <TabsContent value="email">
                <SendEmail member={memberData} />
              </TabsContent>
            </React.Suspense>

            <React.Suspense
              fallback={
                <div className="text-center p-12">
                  <Skeleton className="h-64 w-full mx-auto" />
                </div>
              }
            >
              <TabsContent value="sms">
                <SendSMS member={memberData} />
              </TabsContent>
            </React.Suspense>

            <React.Suspense fallback={<MemberDetailsSkeleton />}>
              <TabsContent value="edit">
                <EditMember member={memberData} />
              </TabsContent>
            </React.Suspense>
          </div>
        </Tabs>
      </div>

      {/* Profile Image Preview Dialog */}
      <Dialog open={profilePreviewOpen} onOpenChange={setProfilePreviewOpen}>
        <DialogContent className="max-w-2xl max-h-screen overflow-auto">
          <DialogHeader>
            <DialogTitle>Profile Image</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <img
              src={memberData.passport_photo}
              alt="Profile Preview"
              className="w-full h-auto rounded-lg shadow-2xl"
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
