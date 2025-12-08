import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const checkboxVariants = cva(
  "peer relative h-5 w-5 shrink-0 rounded-sm border-medium border-border-primary transition-all duration-short focus-visible:outline-none focus-visible:outline-medium focus-visible:outline-offset-medium focus-visible:outline-transparent focus-visible:ring-2 focus-visible:ring-primary-80 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:border-border-disabled disabled:opacity-60 data-[state=checked]:bg-primary-80 data-[state=checked]:border-transparent data-[state=checked]:text-font-inverse data-[state=indeterminate]:bg-primary-80 data-[state=indeterminate]:border-transparent data-[state=indeterminate]:text-font-inverse",
  {
    variants: {
      hasError: {
        true: "border-border-error focus-visible:ring-red-60",
        false: "",
      },
    },
    defaultVariants: {
      hasError: false,
    },
  }
);

// Check icon SVG
const CheckIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M13.3334 4L6.00002 11.3333L2.66669 8"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Minus icon SVG (for indeterminate state)
const MinusIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3.33331 8H12.6666"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export interface CheckboxProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>,
    VariantProps<typeof checkboxVariants> {
  hasError?: boolean;
}

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ className, hasError = false, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(checkboxVariants({ hasError, className }))}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn(
        "flex items-center justify-center text-current transition-all duration-short"
      )}
    >
      {props.checked === "indeterminate" ? <MinusIcon /> : <CheckIcon />}
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox, checkboxVariants };
