import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const dividerVariants = cva(
  "border-solid border-border-primary opacity-60 shrink-0",
  {
    variants: {
      orientation: {
        horizontal: "w-full border-t",
        vertical: "h-full border-l",
      },
      size: {
        small: "border-t-small",
        medium: "border-t-medium",
        large: "border-t-large",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
      size: "medium",
    },
  }
);

const dividerLabelVariants = cva(
  "text-font-tertiary text-small bg-bg-primary px-medium whitespace-nowrap",
  {
    variants: {
      orientation: {
        horizontal: "relative -top-[0.625rem]",
        vertical: "relative -left-[0.5rem]",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
    },
  }
);

export interface DividerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "aria-orientation">,
    VariantProps<typeof dividerVariants> {
  label?: string;
  labelPosition?: "left" | "center" | "right";
}

const Divider = React.forwardRef<HTMLDivElement, DividerProps>(
  (
    {
      className,
      orientation = "horizontal",
      size,
      label,
      labelPosition = "center",
      ...props
    },
    ref
  ) => {
    if (!label) {
      return (
        <div
          ref={ref}
          role="separator"
          aria-orientation={orientation ?? "horizontal"}
          className={cn(dividerVariants({ orientation, size, className }))}
          {...props}
        />
      );
    }

    const isHorizontal = orientation === "horizontal";
    const alignmentClass =
      labelPosition === "left"
        ? "justify-start"
        : labelPosition === "right"
        ? "justify-end"
        : "justify-center";

    return (
      <div
        ref={ref}
        role="separator"
        aria-orientation={orientation ?? "horizontal"}
        className={cn(
          "flex items-center",
          isHorizontal ? "flex-row" : "flex-col",
          alignmentClass,
          className
        )}
        {...props}
      >
        {labelPosition !== "left" && (
          <div
            className={cn(
              dividerVariants({ orientation, size }),
              isHorizontal ? "flex-1" : "flex-none h-full"
            )}
          />
        )}
        <span className={cn(dividerLabelVariants({ orientation }))}>
          {label}
        </span>
        {labelPosition !== "right" && (
          <div
            className={cn(
              dividerVariants({ orientation, size }),
              isHorizontal ? "flex-1" : "flex-none h-full"
            )}
          />
        )}
      </div>
    );
  }
);
Divider.displayName = "Divider";

export { Divider, dividerVariants };
