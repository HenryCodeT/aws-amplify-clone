import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const labelVariants = cva(
  "text-medium font-medium text-font-primary transition-colors duration-short peer-disabled:cursor-not-allowed peer-disabled:opacity-60",
  {
    variants: {
      size: {
        small: "text-small",
        default: "text-medium",
        large: "text-large",
      },
      hasError: {
        true: "text-font-error",
        false: "",
      },
      visuallyHidden: {
        true: "absolute w-px h-px p-0 -m-px overflow-hidden whitespace-nowrap border-0",
        false: "",
      },
    },
    defaultVariants: {
      size: "default",
      hasError: false,
      visuallyHidden: false,
    },
  }
);

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement>,
    VariantProps<typeof labelVariants> {
  hasError?: boolean;
  visuallyHidden?: boolean;
}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, size, hasError = false, visuallyHidden = false, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn(labelVariants({ size, hasError, visuallyHidden, className }))}
        {...props}
      />
    );
  }
);

Label.displayName = "Label";

export { Label, labelVariants };
