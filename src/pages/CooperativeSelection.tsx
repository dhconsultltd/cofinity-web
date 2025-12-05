import React, { useState } from "react";
import { Building2, PlusCircle, CheckCircle2, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import type { Tenant } from "@/types/tenant.types";
import { toast } from 'sonner';





const CooperativeSelection: React.FC = () => {
  const [selected, setSelected] = useState<"existing" | "new" | null>(null);
  const [selectedTenant, setSelectedTenant] = useState<Tenant>(); 
  const navigate = useNavigate();


  //
  const {tenants} = useAuth(); 
   

  const handleContinue = () => {
    if (selected === "existing") {

      if (selectedTenant?.plan_id == null ){
        navigate("/choose-plan", {state: {tenant: selectedTenant}});
        return;
      }


      if(selectedTenant.status == 'suspened' ){

        toast.error('Cooperative is Blocked', {description: 'Your cooperative has an issue please contact support'})
      }




      // navigate("/dashboard");  



      
    } else if (selected === "new") {
      navigate("/create-cooperative"); // redirect to create cooperative
    } else {
      alert("Please select an option first.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-10">
      <div className="bg-white shadow-md rounded-2xl p-8 w-full max-w-md border border-gray-100">
        {/* Title */}
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-2">
          Choose Your Cooperative
        </h2>
        <p className="text-center text-gray-500 text-sm mb-6">
          Select an existing cooperative or create a new one to continue.
        </p>

        {/* Existing Cooperative Card */}
        {tenants?.map((tenant) => (
        <div
          onClick={() => { setSelected("existing"),  setSelectedTenant(tenant)}}
          className={`border rounded-lg p-4 mb-4 cursor-pointer transition-all ${
            selected === "existing"
              ? "border-indigo-600 bg-indigo-50"
              : "border-gray-200 hover:border-gray-300"
          }`}
        >

            
            <div key={tenant.id}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Building2
                    size={22}
                    className={`${
                      selected === "existing" ? "text-indigo-600" : "text-gray-500"
                    }`}
                  />
                  <div>
                    <h3 className="font-medium text-gray-800">{tenant.name}</h3>
                    <p className="text-xs text-gray-500">Registered: {tenant.coop_initials}-{tenant.id}</p>
                    <p className="text-xs text-gray-500">Status: {tenant.status.charAt(0).toUpperCase() + tenant.status.slice(1)}</p>
                  </div>
                </div>
                {selected === "existing" && (
                  <CheckCircle2 className="text-indigo-600" size={20} />
                )}
              </div>
            </div>

          
           
        </div>
          ))}

        {/* Create New Cooperative */}
        <div
          onClick={() => setSelected("new")}
          className={`border rounded-lg p-4 mb-6 cursor-pointer transition-all ${
            selected === "new"
              ? "border-teal-600 bg-teal-50"
              : "border-gray-200 hover:border-gray-300"
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <PlusCircle
                size={22}
                className={`${
                  selected === "new" ? "text-teal-600" : "text-gray-500"
                }`}
              />
              <div>
                <h3 className="font-medium text-gray-800">
                  Create New Cooperative
                </h3>
                <p className="text-xs text-gray-500">
                  Set up a new cooperative organization.
                </p>
              </div>
            </div>
            {selected === "new" && (
              <CheckCircle2 className="text-teal-600" size={20} />
            )}
          </div>
        </div>

        {/* Continue Button */}
        <button
          onClick={handleContinue}
          className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
        >
          Continue <ArrowRight size={18} />
        </button>

        {/* Logged In Info */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Logged in as{" "}
          <span className="font-medium text-gray-700">admin@cofinity.com</span>
        </p>
      </div>
    </div>
  );
};

export default CooperativeSelection;
