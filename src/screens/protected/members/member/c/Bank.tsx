// src/pages/Bank.tsx
"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Pencil, Banknote, Landmark, Loader2 } from "lucide-react";

// ----------------------
// ZOD VALIDATION
// ----------------------
const BankSchema = z.object({
  bank_name: z.string().min(2, "Bank name is required"),
  account_name: z.string().min(2, "Account name is required"),
  account_number: z.string().min(10, "Account number must be at least 10 digits"),
});

type BankFormData = z.infer<typeof BankSchema>;

// ----------------------
// MOCK API FUNCTIONS
// ----------------------
async function fetchBankDetails() {
  // replace with real API: /api/member/bank
  return new Promise((resolve) =>
    setTimeout(
      () =>
        resolve({
          bank_name: "Access Bank",
          account_name: "John Bright",
          account_number: "0123456789",
        }),
      800
    )
  );
}

async function updateBankDetails(data: BankFormData) {
  // replace with PUT API
  return new Promise((resolve) =>
    setTimeout(() => resolve({ success: true }), 500)
  );
}

// ----------------------
// MAIN BANK COMPONENT
// ----------------------
export default function Bank() {
  const queryClient = useQueryClient();
  const [openEdit, setOpenEdit] = useState(false);

  // Fetch bank details
  const { data, isLoading } = useQuery({
    queryKey: ["bank-info"],
    queryFn: fetchBankDetails,
  });

  // Mutation for updating bank info
  const mutation = useMutation({
    mutationFn: updateBankDetails,
    onSuccess: () => {
      toast.success("Bank details updated");
      queryClient.invalidateQueries(["bank-info"]);
      setOpenEdit(false);
    },
  });

  // React Hook Form Setup
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BankFormData>({
    resolver: zodResolver(BankSchema),
  });

  // Handle open edit modal
  const handleOpenEdit = () => {
    reset({
      bank_name: data?.bank_name ?? "",
      account_name: data?.account_name ?? "",
      account_number: data?.account_number ?? "",
    });
    setOpenEdit(true);
  };

  return (
    <div className="p-6 space-y-6">

      {/* Page Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Landmark className="w-6 h-6 text-primary" />
          Bank Details
        </h2>

        <button
          onClick={handleOpenEdit}
          className="px-4 py-2 bg-primary text-white rounded-lg flex items-center gap-2 hover:bg-primary/80"
        >
          <Pencil className="w-4 h-4" /> Edit
        </button>
      </div>

      {/* Loading State */}
      {isLoading ? (
        <div className="flex justify-center py-10">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : (
        <div className="bg-white shadow rounded-xl p-6 space-y-4">

          {/* Bank Name */}
          <div>
            <p className="text-neutral-500 text-sm flex items-center gap-2">
              <Landmark className="w-4 h-4" />
              Bank Name
            </p>
            <p className="text-lg font-semibold">
              {data?.bank_name ?? "No bank info"}
            </p>
          </div>

          {/* Account Name */}
          <div>
            <p className="text-neutral-500 text-sm">Account Name</p>
            <p className="text-lg font-semibold">
              {data?.account_name ?? "N/A"}
            </p>
          </div>

          {/* Account Number */}
          <div>
            <p className="text-neutral-500 text-sm">Account Number</p>
            <p className="text-lg font-semibold">
              {data?.account_number ?? "N/A"}
            </p>
          </div>
        </div>
      )}

      {/* ---------------------- */}
      {/* Edit Modal */}
      {/* ---------------------- */}
      {openEdit && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-xl p-6 space-y-5 shadow-lg animate-fade">

            <h3 className="text-lg font-semibold">Edit Bank Details</h3>

            <form
              onSubmit={handleSubmit((values) => mutation.mutate(values))}
              className="space-y-4"
            >
              {/* Bank Name */}
              <div>
                <label className="text-sm font-medium">Bank Name</label>
                <input
                  {...register("bank_name")}
                  className="w-full p-2 border rounded-lg"
                />
                {errors.bank_name && (
                  <p className="text-red-500 text-sm">
                    {errors.bank_name.message}
                  </p>
                )}
              </div>

              {/* Account Name */}
              <div>
                <label className="text-sm font-medium">Account Name</label>
                <input
                  {...register("account_name")}
                  className="w-full p-2 border rounded-lg"
                />
                {errors.account_name && (
                  <p className="text-red-500 text-sm">
                    {errors.account_name.message}
                  </p>
                )}
              </div>

              {/* Account Number */}
              <div>
                <label className="text-sm font-medium">Account Number</label>
                <input
                  {...register("account_number")}
                  className="w-full p-2 border rounded-lg"
                />
                {errors.account_number && (
                  <p className="text-red-500 text-sm">
                    {errors.account_number.message}
                  </p>
                )}
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setOpenEdit(false)}
                  className="px-4 py-2 bg-neutral-200 rounded-lg"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={mutation.isPending}
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/80 flex items-center gap-2"
                >
                  {mutation.isPending && (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  )}
                  Save Changes
                </button>
              </div>
            </form>

          </div>
        </div>
      )}
    </div>
  );
}
