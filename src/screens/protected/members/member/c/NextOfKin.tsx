"use client";

import React, { useState } from "react";
import { User, Plus, Pencil } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const NextOfKin = () => {
  const [openForm, setOpenForm] = useState(false);
  const [kin, setKin] = useState<any>(null);

  const [formData, setFormData] = useState({
    full_name: "",
    relationship: "",
    phone: "",
    address: "",
  });

  const handleSave = () => {
    if (!formData.full_name || !formData.relationship || !formData.phone) {
      alert("Please fill all required fields");
      return;
    }

    setKin(formData);
    setOpenForm(false);
  };

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOpenEdit = () => {
    setOpenForm(true);
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Next of Kin</h2>

        <Button onClick={() => setOpenForm(true)}>
          <Plus className="w-4 h-4 mr-2" />
          {kin ? "Edit Next of Kin" : "Add Next of Kin"}
        </Button>
      </div>

      {/* DISPLAY CARD */}
      {!kin ? (
        <Card className="p-16 text-center bg-gradient-to-br from-neutral-50 to-neutral-100">
          <User className="w-20 h-20 text-neutral-400 mx-auto mb-6" />
          <h3 className="text-2xl font-bold text-neutral-700">Next Of Kin</h3>
          <p className="text-neutral-600 mt-2">
            This member has no next of kin information available.
          </p>
        </Card>
      ) : (
        <Card className="p-8 bg-white shadow-md rounded-xl space-y-4">

          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold">Next of Kin Details</h3>
            <Button size="sm" variant="outline" onClick={handleOpenEdit}>
              <Pencil className="w-4 h-4 mr-2" />
              Edit
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

            <div>
              <p className="text-sm text-neutral-500">Full Name</p>
              <p className="text-lg font-semibold">{kin.full_name}</p>
            </div>

            <div>
              <p className="text-sm text-neutral-500">Relationship</p>
              <p className="text-lg font-semibold">{kin.relationship}</p>
            </div>

            <div>
              <p className="text-sm text-neutral-500">Phone Number</p>
              <p className="text-lg font-semibold">{kin.phone}</p>
            </div>

            <div>
              <p className="text-sm text-neutral-500">Address</p>
              <p className="text-lg font-semibold">{kin.address}</p>
            </div>
          </div>
        </Card>
      )}

      {/* ------------------------- */}
      {/* ADD / EDIT MODAL FORM */}
      {/* ------------------------- */}
      {openForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg p-6 rounded-xl shadow-xl space-y-5">

            <h2 className="text-xl font-bold">
              {kin ? "Edit Next of Kin" : "Add Next of Kin"}
            </h2>

            <div className="grid grid-cols-1 gap-4">

              {/* Full Name */}
              <div>
                <label className="text-sm font-medium">Full Name</label>
                <input
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg"
                />
              </div>

              {/* Relationship */}
              <div>
                <label className="text-sm font-medium">Relationship</label>
                <input
                  name="relationship"
                  value={formData.relationship}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="text-sm font-medium">Phone Number</label>
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg"
                />
              </div>

              {/* Address */}
              <div>
                <label className="text-sm font-medium">Address</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg min-h-[80px]"
                />
              </div>

            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 pt-2">
              <Button variant="outline" onClick={() => setOpenForm(false)}>
                Cancel
              </Button>

              <Button onClick={handleSave}>
                Done
              </Button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default NextOfKin;
