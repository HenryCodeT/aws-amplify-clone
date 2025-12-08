import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { inputVariants, type InputProps } from "../input";
import { Label } from "../../atoms/label";
import { FieldDescription } from "../../atoms/field-description";
import { FieldError } from "../../atoms/field-error";

const passwordInputVariants = cva("relative flex w-full", {
  variants: {
    size: {
      small: "",
      default: "",
      large: "",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

const toggleButtonVariants = cva(
  "absolute right-0 top-0 h-full px-medium text-font-secondary transition-colors duration-short hover:text-font-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-80 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:text-font-disabled disabled:opacity-60",
  {
    variants: {
      size: {
        small: "px-small",
        default: "px-medium",
        large: "px-large",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

export interface PasswordInputProps
  extends Omit<InputProps, "type" | "size">,
    VariantProps<typeof passwordInputVariants> {
  showPasswordLabel?: string;
  hidePasswordLabel?: string;
  passwordIsHiddenLabel?: string;
  passwordIsShownLabel?: string;
  size?: "small" | "default" | "large";
}

/**
 * PasswordInput - Base password input with show/hide toggle
 * Use this component when you need just the input control without label/error wrapper
 */
const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  (
    {
      className,
      size = "default",
      hasError = false,
      disabled = false,
      showPasswordLabel = "Show password",
      hidePasswordLabel = "Hide password",
      passwordIsHiddenLabel = "Password is hidden",
      passwordIsShownLabel = "Password is shown",
      ...props
    },
    ref
  ) => {
    const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);

    const togglePasswordVisibility = () => {
      setIsPasswordVisible((prev) => !prev);
    };

    const buttonLabel = isPasswordVisible
      ? hidePasswordLabel
      : showPasswordLabel;
    const srLabel = isPasswordVisible
      ? passwordIsShownLabel
      : passwordIsHiddenLabel;

    return (
      <div className={cn(passwordInputVariants({ size, className }))}>
        <input
          ref={ref}
          type={isPasswordVisible ? "text" : "password"}
          className={cn(
            inputVariants({ size, hasError }),
            "pr-12" // Add padding for the toggle button
          )}
          disabled={disabled}
          aria-label={srLabel}
          {...props}
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          disabled={disabled}
          className={cn(toggleButtonVariants({ size }))}
          aria-label={buttonLabel}
          tabIndex={-1}
        >
          {isPasswordVisible ? (
            // Eye-off icon (password visible)
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
              <line x1="1" y1="1" x2="23" y2="23" />
            </svg>
          ) : (
            // Eye icon (password hidden)
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          )}
        </button>
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput";

// ============================================================================
// PasswordField - Complete field composition with label, description, and error
// ============================================================================

export interface PasswordFieldProps
  extends Omit<PasswordInputProps, "hasError"> {
  label?: string;
  labelHidden?: boolean;
  description?: string;
  errorMessage?: string;
  hasError?: boolean;
  containerClassName?: string;
}

/**
 * PasswordField - Complete password field with label, description, and error message
 * Use this component for complete form fields with proper accessibility
 */
const PasswordField = React.forwardRef<HTMLInputElement, PasswordFieldProps>(
  (
    {
      id,
      label,
      labelHidden = false,
      description,
      errorMessage,
      hasError = false,
      size = "default",
      containerClassName,
      className,
      ...props
    },
    ref
  ) => {
    const fieldId = React.useId();
    const generatedId = id || fieldId;
    const descriptionId = description ? `${generatedId}-description` : undefined;
    const errorId = hasError && errorMessage ? `${generatedId}-error` : undefined;

    const ariaDescribedBy = [descriptionId, errorId]
      .filter(Boolean)
      .join(" ") || undefined;

    return (
      <div className={cn("space-y-xs", containerClassName)}>
        {label && (
          <Label
            htmlFor={generatedId}
            visuallyHidden={labelHidden}
            hasError={hasError}
            size={size}
          >
            {label}
          </Label>
        )}

        {description && !labelHidden && (
          <FieldDescription id={descriptionId} size={size}>
            {description}
          </FieldDescription>
        )}

        <PasswordInput
          ref={ref}
          id={generatedId}
          hasError={hasError}
          size={size}
          aria-describedby={ariaDescribedBy}
          aria-invalid={hasError}
          className={className}
          {...props}
        />

        {hasError && errorMessage && (
          <FieldError id={errorId} size={size}>
            {errorMessage}
          </FieldError>
        )}
      </div>
    );
  }
);

PasswordField.displayName = "PasswordField";

export { PasswordInput, PasswordField, passwordInputVariants };
