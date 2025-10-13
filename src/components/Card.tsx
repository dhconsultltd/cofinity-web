import React from "react";
import { cn } from "../lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  footer?: React.ReactNode;
}

export function Card({
  title,
  description,
  footer,
  className,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition",
        className
      )}
      {...props}
    >
      {title && <h3 className="text-lg font-semibold mb-1">{title}</h3>}
      {description && (
        <p className="text-sm text-gray-500 mb-4">{description}</p>
      )}
      {children}
      {footer && <div className="mt-4 border-t pt-3">{footer}</div>}
    </div>
  );
}
