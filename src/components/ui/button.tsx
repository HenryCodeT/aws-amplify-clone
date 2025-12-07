import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-medium font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-primary-80 text-font-inverse hover:bg-primary-90 active:bg-primary-100 shadow-soft",
        secondary:
          "bg-secondary-80 text-font-inverse hover:bg-secondary-90 active:bg-secondary-100 shadow-soft",
        destructive:
          "bg-red-80 text-font-inverse hover:bg-red-90 active:bg-red-100 shadow-soft",
        success:
          "bg-green-80 text-font-inverse hover:bg-green-90 active:bg-green-100 shadow-soft",
        outline:
          "border-2 border-border-primary bg-bg-primary text-font-primary hover:bg-bg-secondary active:bg-bg-tertiary",
        ghost:
          "text-font-primary hover:bg-bg-secondary active:bg-bg-tertiary",
        link:
          "text-font-interactive underline-offset-4 hover:underline hover:text-font-hover",
      },
      size: {
        small: "h-9 px-small py-xs text-small",
        medium: "h-11 px-medium py-small text-medium",
        large: "h-14 px-large py-medium text-large",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "medium",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
