import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const fieldLabelVariants = cva(
  "text-medium font-medium text-font-primary transition-colors duration-short peer-disabled:cursor-not-allowed peer-disabled:opacity-60",
  {
    variants: {
      inputSize: {
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
      inputSize: "default",
      hasError: false,
      visuallyHidden: false,
    },
  }
);

const FieldLabel = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement> &
    VariantProps<typeof fieldLabelVariants>
>(
  (
    {
      className,
      inputSize,
      hasError = false,
      visuallyHidden = false,
      ...props
    },
    ref
  ) => {
    return (
      <label
        ref={ref}
        className={cn(
          fieldLabelVariants({ inputSize, hasError, visuallyHidden, className })
        )}
        {...props}
      />
    );
  }
);

FieldLabel.displayName = "FieldLabel";

export { FieldLabel, fieldLabelVariants };
