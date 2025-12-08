export type BillingCycle = "monthly" | "quarterly" | "yearly";

export type PlanFeature = {
  key: string;
  label: string;
};

export type Plan = {
  id: number;
  name: string;
  description?: string;
  slug: string;

  price_monthly: string;
  price_quarterly: string;
  price_yearly: string;

  highlighted?: boolean;
  custom?: boolean;
  badge?: string;

  // NEW
  features: string[];
};

 