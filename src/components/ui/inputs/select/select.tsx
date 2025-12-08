import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const selectVariants = cva(
  "flex h-10 w-full items-center justify-between rounded-medium border-medium border-border-primary bg-bg-primary px-medium py-small text-medium text-font-primary transition-colors duration-medium focus:outline-none focus:ring-2 focus:ring-primary-80 focus:ring-offset-2 disabled:cursor-not-allowed disabled:border-border-disabled disabled:bg-bg-disabled disabled:text-font-disabled disabled:opacity-60",
  {
    variants: {
      size: {
        small: "h-8 px-small py-xs text-small",
        default: "h-10 px-medium py-small text-medium",
        large: "h-12 px-large py-medium text-large",
      },
      hasError: {
        true: "border-border-error focus:ring-red-60",
        false: "",
      },
    },
    defaultVariants: {
      size: "default",
      hasError: false,
    },
  }
);

export interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "size">,
    VariantProps<typeof selectVariants> {
  hasError?: boolean;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, size, hasError = false, children, ...props }, ref) => {
    return (
      <select
        className={cn(selectVariants({ size, hasError, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </select>
    );
  }
);
Select.displayName = "Select";

export { Select, selectVariants };
