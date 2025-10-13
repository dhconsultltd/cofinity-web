import React from "react";
import { Loader2 } from "lucide-react"; // optional icon (npm install lucide-react)
import clsx from "clsx"; // optional helper (npm install clsx)
/**
 * Button Component (shadcn/ui style)
 * Supports variants: default | outline | ghost | destructive | link
 * Supports sizes: sm | md | lg
 * Includes loading state and disabled styling
 */

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "destructive" | "link";
  size?: "md" | "sm" | "lg";
  isLoading?: boolean;
  className?: string;
}

export default function Button({
  children,
  variant = "default",
  size = "md",
  isLoading = false,
  className = "",
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

  const variants = {
    default: "bg-sky-600 text-white hover:bg-sky-700",
    outline: "border border-sky-500 text-sky-600 hover:bg-sky-50",
    ghost: "text-sky-600 hover:bg-sky-50",
    destructive: "bg-red-600 text-white hover:bg-red-700",
    link: "text-sky-600 underline-offset-4 hover:underline",
  };

  const sizes = {
    sm: "h-8 px-3 text-sm",
    md: "h-10 px-4 text-sm",
    lg: "h-12 px-6 text-base",
  };

  return (
    <button
      className={clsx(baseStyles, variants[variant], sizes[size], className)}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading && (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
      )}
      {children}
    </button>
  );
}
