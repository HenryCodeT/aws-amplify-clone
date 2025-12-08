import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const fieldErrorVariants = cva(
  "text-small text-font-error font-medium transition-colors duration-short",
  {
    variants: {
      size: {
        small: "text-xs",
        default: "text-small",
        large: "text-medium",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

export interface FieldErrorProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof fieldErrorVariants> {}

const FieldError = React.forwardRef<HTMLParagraphElement, FieldErrorProps>(
  ({ className, size, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={cn(fieldErrorVariants({ size, className }))}
        {...props}
      />
    );
  }
);

FieldError.displayName = "FieldError";

export { FieldError, fieldErrorVariants };
