// src/components/Skeleton/BranchesTableSkeleton.tsx
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import { Table, TableRow, TableCell } from "@/components/ui/table";

export default function BranchesTableSkeleton() {
  return (
    <Card className="border-none shadow-none my-5">
      <div className="p-6">
        {/* Header Skeleton */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <Skeleton className="h-9 w-48 mb-2 animate-shimmer" />
            <Skeleton className="h-5 w-64 animate-shimmer" />
          </div>
          <Skeleton className="h-12 w-40 rounded-xl" />
        </div>

        {/* Table Skeleton */}
        <Table>
          <TableRow className="border-b">
            <TableCell colSpan={7} className="p-0">
              <div className="space-y-4 py-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="flex items-center gap-6 px-6 py-4">
                    {/* Branch Name + Icon */}
                    <div className="flex items-center gap-4 flex-1 animate-shimmer">
                      <Skeleton className="h-12 w-12 rounded-full" />
                      <div>
                        <Skeleton className="h-5 w-48 mb-2 animate-shimmer" />
                        <Skeleton className="h-4 w-24" />
                      </div>
                    </div>

                    {/* Manager */}
                    <div className="flex items-center gap-3 w-48">
                      <Skeleton className="h-8 w-8 rounded-full" />
                      <Skeleton className="h-5 w-32" />
                    </div>

                    {/* Contact */}
                    <div className="w-56">
                      <Skeleton className="h-5 w-40 mb-2" />
                      <Skeleton className="h-4 w-32" />
                    </div>

                    {/* Location */}
                    <div className="w-48">
                      <Skeleton className="h-5 w-40" />
                    </div>

                    {/* Members */}
                    <div className="w-24">
                      <Skeleton className="h-8 w-16 rounded-full" />
                    </div>

                    {/* Status */}
                    <div className="w-24">
                      <Skeleton className="h-8 w-20 rounded-full" />
                    </div>

                    {/* Created Date */}
                    <div className="w-32">
                      <Skeleton className="h-5 w-24" />
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 justify-end w-28">
                      <Skeleton className="h-9 w-9 rounded-lg" />
                      <Skeleton className="h-9 w-9 rounded-lg" />
                    </div>
                  </div>
                ))}
              </div>
            </TableCell>
          </TableRow>
        </Table>
      </div>
    </Card>
  );
}