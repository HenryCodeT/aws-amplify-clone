import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const fieldDescriptionVariants = cva(
  "text-small text-font-secondary transition-colors duration-short",
  {
    variants: {
      inputSize: {
        small: "text-xs",
        default: "text-small",
        large: "text-medium",
      },
    },
    defaultVariants: {
      inputSize: "default",
    },
  }
);

const FieldDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement> &
    VariantProps<typeof fieldDescriptionVariants>
>(({ className, inputSize, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn(fieldDescriptionVariants({ inputSize, className }))}
      {...props}
    />
  );
});

FieldDescription.displayName = "FieldDescription";

export { FieldDescription, fieldDescriptionVariants };
