export type MemberShareAccount = {
  id: number;
  member_id: number;
  shares_plan_id: number;
  savings_account_id: number | null;
  total_units: number;
  total_value: number;
  is_active: boolean;
  member: {
    id: number;
    first_name: string;
    last_name: string;
    member_number: string;
  };
  sharesPlan: {
    id: number;
    name: string;
  };
  savingsAccount?: {
    id: number;
    account_number: string;
  };
};