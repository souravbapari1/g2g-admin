"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

const spinnerVariants =
  "w-10 h-10 border-4 border-t-4 border-gray-200 border-t-gray-600 rounded-full animate-spin";

interface LoadingSpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const LoadingSpinner = React.forwardRef<HTMLDivElement, LoadingSpinnerProps>(
  ({ className, ...rest }, ref) => {
    return (
      <div ref={ref} className={cn(spinnerVariants, className)} {...rest} />
    );
  }
);

// Explicitly setting displayName is necessary when using forwardRef.
LoadingSpinner.displayName = "LoadingSpinner";

export { LoadingSpinner };
