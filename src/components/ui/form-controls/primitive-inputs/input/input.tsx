import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const inputVariants = cva(
  "flex w-full rounded-medium border-medium border-border-primary bg-bg-primary px-medium py-small text-medium text-font-primary transition-colors duration-medium file:border-0 file:bg-transparent file:text-medium file:font-medium placeholder:text-font-disabled focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-80 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:border-border-disabled disabled:bg-bg-disabled disabled:text-font-disabled disabled:opacity-60 aria-invalid:border-border-error aria-invalid:focus-visible:ring-red-60",
  {
    variants: {
      inputSize: {
        small: "h-8 px-small py-xs text-small",
        default: "h-10 px-medium py-small text-medium",
        large: "h-12 px-large py-medium text-large",
      },
    },
    defaultVariants: {
      inputSize: "default",
    },
  }
);

const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> &
    VariantProps<typeof inputVariants>
>(({ className, type, inputSize, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(inputVariants({ inputSize, className }))}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

export { Input, inputVariants };
