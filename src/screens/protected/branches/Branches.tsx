// src/pages/Branches.tsx
"use client";

import { useState } from "react";
import { Plus, Edit2, Trash2, Loader2, MapPin, Phone, User, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { toast } from "sonner";
import type { Branch } from "@/types/branches.types";
import BranchesTableSkeleton from "@/screens/Components/BranchLoader";
import { BRANCH_API } from "@/constants/api";
import React from "react";

// Your exact type — now used everywhere


const StatusBadge = ({ status }: { status: "active" | "inactive" }) => (
  <Badge
    variant={status === "active" ? "default" : "secondary"}
    className={status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}
  >
    {status === "active" ? "Active" : "Inactive"}
  </Badge>
);

const initialFormState = {
  name: "",
  code: "",
  manager_name: "",
  phone: "",
  email: "",
  address: "",
  city: "",
  state: "",
  status: "active" as const,
};

export default function BranchesManagement() {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBranch, setEditingBranch] = useState<Branch | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  // Fetch branches
  const { data, isLoading, error } = useQuery({
    queryKey: ["branches"],
    queryFn: async () => {
      const res = await apiClient.get(BRANCH_API.LIST);
      return res.data; // Full payload: { branches: [], quota: {}, ... }
    },
  });

  const branches = data?.branches ?? [];
  const quota = data?.quota;
  const canCreateBranch = data?.can_create_branch ?? true;
  const currentTenant = data?.current_tenant;


  // Create branch
  const createMutation = useMutation({
    mutationFn: (data: typeof initialFormState) => apiClient.post(BRANCH_API.CREATE, data),
    onSuccess: () => {
      toast.success("Branch created successfully!");
      queryClient.invalidateQueries({ queryKey: ["branches"] });
      setIsModalOpen(false);
    },
    onError: () => toast.error("Failed to create branch", { description: "Your quota may have been exceeded, please upgrade your plan" }),
  });

  // Update branch
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Branch> }) =>
      apiClient.put(BRANCH_API.UPDATE(id), data),
    onSuccess: () => {
      toast.success("Branch updated!");
      queryClient.invalidateQueries({ queryKey: ["branches"] });
      setIsModalOpen(false);
      setEditingBranch(null);
    },
  });

  // Delete branch
  const deleteMutation = useMutation({
    mutationFn: (id: number) => apiClient.delete(BRANCH_API.DELETE(id)),
    onSuccess: () => {
      toast.success("Branch deleted");
      queryClient.invalidateQueries({ queryKey: ["branches"] });
      setDeleteConfirm(null);
    },
  });

  const handleSave = (formData: typeof initialFormState) => {
    if (editingBranch) {
      updateMutation.mutate({ id: editingBranch.id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const openAddModal = () => {
    setEditingBranch(null);
    setIsModalOpen(true);
  };

  const openEditModal = (branch: Branch) => {
    setEditingBranch(branch);
    setIsModalOpen(true);
  };

  if (isLoading) {
    return <BranchesTableSkeleton />
  }

  if (error) {
    return (
      <div className="p-8 text-center text-red-600">
        Failed to load branches. Please try again.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-3 px-4 lg:px-8">
      <div className="  mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Branches</h1>
            <p className="text-gray-600 mt-1">Manage your cooperative branches</p>
          </div>
          <Button onClick={openAddModal} disabled={!canCreateBranch} className="bg-black hover:bg-gray-800">
            <Plus className="w-4 h-4 mr-2" />
            Add Branch
          </Button>
        </div>

        {/* Branches Table */}
        <Card className="border-none shadow-sm">
          {branches.length === 0 ? (

            <div className="p-16 text-center">
              <Building2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No branches yet</h3>
              <p className="text-gray-600 mb-6">Create your first branch to get started</p>
              <Button
                onClick={openAddModal}
                disabled={!canCreateBranch}
              >
                {canCreateBranch ? "Add Your First Branch" : "Upgrade Plan to Add Branch"}
              </Button>

              {!canCreateBranch && quota && (
                <p className="text-sm text-amber-600 mt-4">
                  You've used {quota.used} of {quota.limit} branches.
                  <a href="/upgrade" className="underline font-medium">Upgrade plan</a>
                </p>
              )}
            </div>



            // <div className="p-16 text-center">
            //   <Building2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            //   <h3 className="text-xl font-semibold text-gray-900 mb-2">No branches yet</h3>
            //   <p className="text-gray-600 mb-6">Create your first branch to get started</p>
            //   <Button onClick={openAddModal}>Add Your First Branch</Button>
            // </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Branch</TableHead>
                  <TableHead>Manager</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Members</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {branches.map((branch: Branch) => (
                  <TableRow key={branch.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium ">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <Building2 className="w-5 h-5 text-blue-700" />
                        </div>
                        <div>
                          <div className="font-semibold">{branch.name}</div>
                          {branch.code && <div className="text-xs text-gray-500">{branch.code}</div>}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {branch.manager_name ? (
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-gray-500" />
                          {branch.manager_name}
                        </div>
                      ) : (
                        "—"
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {branch.phone && (
                          <div className="flex items-center gap-2">
                            <Phone className="w-3 h-3" />
                            {branch.phone}
                          </div>
                        )}
                        {branch.email && <div className="text-gray-500">{branch.email}</div>}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="w-4 h-4 text-gray-500" />
                        {branch.city}, {branch.state}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{branch.member_count}</Badge>
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={branch.status} />
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">
                      {new Date(branch.created_at).toLocaleDateString("en-NG", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => openEditModal(branch)}
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setDeleteConfirm(branch.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </Card>

        {/* Add/Edit Modal */}
        <BranchModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingBranch(null);
          }}
          onSave={handleSave}
          initialData={editingBranch || initialFormState}
          isLoading={createMutation.isPending || updateMutation.isPending}
          isEditing={!!editingBranch}
        />

        {/* Delete Confirmation */}
        <Dialog open={!!deleteConfirm} onOpenChange={() => setDeleteConfirm(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Branch</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete the branch.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDeleteConfirm(null)}>
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={() => deleteConfirm && deleteMutation.mutate(deleteConfirm)}
                disabled={deleteMutation.isPending}
              >
                {deleteMutation.isPending ? "Deleting..." : "Delete"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

// Reusable Modal Component
const BranchModal = ({
  isOpen,
  onClose,
  onSave,
  initialData,
  isLoading,
  isEditing,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  initialData: any;
  isLoading: boolean;
  isEditing: boolean;
}) => {
  const [formData, setFormData] = useState(initialData);

  React.useEffect(() => {
    if (isOpen) setFormData(initialData);
  }, [isOpen, initialData]);

  const handleSubmit = () => {
    onSave(formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit Branch" : "Add New Branch"}</DialogTitle>
          <DialogDescription>
            {isEditing ? "Update branch information" : "Create a new branch for your cooperative"}
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4 py-4">
          <div className="space-y-2">
            <Label>Branch Name</Label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Lekki Branch"
            />
          </div>
          <div className="space-y-2">
            <Label>Branch Code (Optional)</Label>
            <Input
              value={formData.code || ""}
              onChange={(e) => setFormData({ ...formData, code: e.target.value })}
              placeholder="LEK-001"
            />
          </div>
          <div className="space-y-2">
            <Label>Manager Name</Label>
            <Input
              value={formData.manager_name || ""}
              onChange={(e) => setFormData({ ...formData, manager_name: e.target.value })}
              placeholder="Chukwu Okonkwo"
            />
          </div>
          <div className="space-y-2">
            <Label>Phone</Label>
            <Input
              value={formData.phone || ""}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+234 801 234 5678"
            />
          </div>
          <div className="space-y-2">
            <Label>Email (Optional)</Label>
            <Input
              type="email"
              value={formData.email || ""}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label>Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value) => setFormData({ ...formData, status: value as "active" | "inactive" })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2 col-span-2">
            <Label>Address</Label>
            <Input
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              placeholder="123 Victoria Island, Lagos"
            />
          </div>
          <div className="space-y-2">
            <Label>City</Label>
            <Input
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              placeholder="Lagos"
            />
          </div>
          <div className="space-y-2">
            <Label>State</Label>
            <Input
              value={formData.state}
              onChange={(e) => setFormData({ ...formData, state: e.target.value })}
              placeholder="Lagos State"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              isEditing ? "Update Branch" : "Create Branch"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};