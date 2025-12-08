import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const inputVariants = cva(
  "flex w-full rounded-medium border-medium border-border-primary bg-bg-primary px-medium py-small text-medium text-font-primary transition-colors duration-medium file:border-0 file:bg-transparent file:text-medium file:font-medium placeholder:text-font-disabled focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-80 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:border-border-disabled disabled:bg-bg-disabled disabled:text-font-disabled disabled:opacity-60",
  {
    variants: {
      size: {
        small: "h-8 px-small py-xs text-small",
        default: "h-10 px-medium py-small text-medium",
        large: "h-12 px-large py-medium text-large",
      },
      hasError: {
        true: "border-border-error focus-visible:ring-red-60",
        false: "",
      },
    },
    defaultVariants: {
      size: "default",
      hasError: false,
    },
  }
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
  hasError?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, size, hasError = false, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(inputVariants({ size, hasError, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input, inputVariants };
