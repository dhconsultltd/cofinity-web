 export type Branchs = { 
    id: number,
    name: string; 
    manager: string; 
    phone: string;
    address: string; 
    status: string; 
    createAt: string; 
 }


 export type Branch = {
  id: number;
  name: string;
  code?: string;
  manager_name?: string | null;
  phone?: string | null;
  email?: string | null;
  address: string;
  city: string;
  state: string;
  status: "active" | "inactive";
  member_count: number;
  created_at: string; // ISO date string
};


 export type Branches = {
      branches: Branch[];
 }
 
 