import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const fieldDescriptionVariants = cva(
  "text-small text-font-secondary transition-colors duration-short",
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

export interface FieldDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof fieldDescriptionVariants> {}

const FieldDescription = React.forwardRef<
  HTMLParagraphElement,
  FieldDescriptionProps
>(({ className, size, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn(fieldDescriptionVariants({ size, className }))}
      {...props}
    />
  );
});

FieldDescription.displayName = "FieldDescription";

export { FieldDescription, fieldDescriptionVariants };
