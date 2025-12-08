// src/types/member.types.ts
export type Member = {
  id: number;
  tenant_id: number;
  first_name: string;
  last_name: string;
  phone: string;
  email?: string | null;
  bvn?: string | null;
  nin?: string | null;
  bvn_verified_at?: string | null;
  nin_verified_at?: string | null;
  balance: number; // in kobo or naira — your choice (we use kobo internally)
  // status: "active" | "inactive" | "suspended";
   updated_at: string;

   
  membership_id: string; 
  other_name?: string; 
  total_savings: number;
  status: string;
  bvn_verified: boolean;
  nin_verified: boolean;
  created_at: string;
  meta?: {
    member_type?: "regular" | "vip" | "premium" | "founder";
  };


};

export type MemberWithFullName = Member & {
  full_name: string;
};

 