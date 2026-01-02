"use client";

import { Card, CardContent } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";

interface SummaryCardProps {
  title: string;
  value: string;
  change: string;
  icon: LucideIcon;
  color: string; // e.g. "text-blue-600"
}

export function SummaryCard({
  title,
  value,
  change,
  icon: Icon,
  color,
}: SummaryCardProps) {
  const isPositive = change.startsWith("+");

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6 flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <h3 className="mt-2 text-2xl font-bold">{value}</h3>
          <p
            className={`mt-1 text-sm font-medium ${
              isPositive ? "text-green-600" : "text-red-600"
            }`}
          >
            {change} vs last month
          </p>
        </div>

        {/* Icon only — no background container */}
        <Icon className={`h-7 w-7 ${color}`} />
      </CardContent>
    </Card>
  );
}
