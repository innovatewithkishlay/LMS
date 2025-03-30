import * as React from "react";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-0.5 text-xs font-semibold transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-blue-500 text-white shadow hover:bg-blue-600",
        secondary:
          "border-transparent bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600",
        destructive:
          "border-transparent bg-red-500 text-white shadow hover:bg-red-600",
        outline:
          "border border-gray-300 text-gray-900 dark:border-gray-700 dark:text-gray-100",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function Badge({ className, variant, ...props }) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
